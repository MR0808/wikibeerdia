import crypto from 'crypto';

import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { MailService } from '@sendgrid/mail';

import User from '../models/user.js';
import Token from '../models/token.js';

export const getLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        loginError: false,
        oldInput: {
            email: '',
            remember: true
        },
        validationErrors: []
    });
};

export async function postLogin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const remember = req.body.remember;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/login', {
            path: '/login',
            pageTitle: 'Login',
            loginError: false,
            oldInput: {
                email: email,
                remember: remember
            },
            validationErrors: errors.array()
        });
    }
    try {
        const user = await User.findOne({
            $or: [{ email: email }, { username: email }]
        });
        if (!user) {
            return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                loginError: true,
                oldInput: {
                    email: email,
                    remember: remember
                },
                validationErrors: []
            });
        }
        const doMatch = await bcrypt.compare(password, user.password);
        if (!doMatch) {
            return res.status(422).render('auth/login', {
                path: '/login',
                pageTitle: 'Login',
                loginError: true,
                oldInput: {
                    email: email,
                    remember: remember
                },
                validationErrors: []
            });
        } else {
            if (remember) {
                const hour = 3600000;
                req.session.cookie.maxAge = 14 * 24 * hour; //2 weeks
            } else {
                req.session.cookie.expires = false;
            }
            req.session.user = user;
            await req.session.save();
            if (user.otp_enabled) {
                res.redirect('/otp');
            } else {
                req.session.isLoggedIn = true;
                await req.session.save();
                res.redirect('/');
            }
        }
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export const getOtpValidation = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/otp', {
        path: '/otp',
        pageTitle: 'Two-Factor Authentication',
        validationErrors: [],
        otpError: false
    });
};

export const getSignup = (req, res, next) => {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        oldInput: {
            email: '',
            username: ''
        },
        validationErrors: []
    });
};

export async function postSignup(req, res, next) {
    const body = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (body.email === '@') body.email = '';
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: 'Signup',
            oldInput: {
                username: body.username,
                email: body.email
            },
            validationErrors: errors.array()
        });
    }
    try {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const user = new User({
            username: body.username,
            email: body.email,
            password: hashedPassword,
            passwordLastUpdated: new Date()
        });
        const newUser = await user.save();
        const token = new Token({
            _userId: newUser._id,
            token: crypto.randomBytes(16).toString('hex')
        });
        await token.save();
        const mail = new MailService();
        mail.setApiKey(process.env.SENDGRID_KEY);
        const message = {
            to: body.email,
            subject: 'Verify your email',
            from: {
                name: 'Mark @ Wikibeerdia',
                email: 'mark@wikibeerdia.com'
            },
            html: `Hello,<br>Please verify your account by clicking the link: <a href="http://${req.headers.host}/confirmation/${token.token}">http://${req.headers.host}/confirmation/${token.token}</a>`
        };
        await mail.send(message);
        res.render('auth/signup-finished', {
            path: '/confirmation',
            pageTitle: 'Check your email'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function getConfirmation(req, res, next) {
    if (req.session.isLoggedIn && req.session.user.isVerified) {
        return res.redirect('/');
    }
    try {
        const token = await Token.findOne({ token: req.params.token });
        if (!token) {
            return res.status(400).render('auth/confirmation', {
                path: '/confirmation',
                pageTitle: 'Email Verification',
                error: true,
                message:
                    'We were unable to find a valid token. your token may have expired'
            });
        }
        const user = await User.findOne({ _id: token._userId });
        if (!user) {
            return res.status(400).render('auth/confirmation', {
                path: '/confirmation',
                pageTitle: 'Email Verification',
                error: true,
                message: 'We were unable to find a user for this token.'
            });
        }
        if (user.isVerified) {
            return res.status(400).render('auth/confirmation', {
                path: '/confirmation',
                pageTitle: 'Email Verification',
                error: false,
                message: 'This user has already been verified'
            });
        }
        user.isVerified = true;
        const newUser = await user.save();
        if (req.session.isLoggedIn) {
            req.session.user = newUser;
        }
        await Token.findByIdAndDelete(token._id);
        return res.status(400).render('auth/confirmation', {
            path: '/confirmation',
            pageTitle: 'Email Verification',
            error: false,
            message: 'Thank you for verifying your account.'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postResendToken(req, res, next) {}

export async function postLogout(req, res, next) {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
}

export async function getReset(req, res, next) {
    if (req.session.isLoggedIn) {
        return res.redirect('/');
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        oldInput: {
            email: ''
        },
        validationErrors: []
    });
}

export async function postReset(req, res, next) {
    const email = req.body.email;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (email === '@') email = '';
        return res.status(422).render('auth/reset', {
            path: '/reset',
            pageTitle: 'Reset Password',
            oldInput: {
                email: email
            },
            validationErrors: errors.array()
        });
    }
    try {
        const token = crypto.randomBytes(16).toString('hex');
        const user = await User.findOne({ email: email });
        if (user) {
            user.passwordResetToken = token;
            user.passwordResetExpires = Date.now() + 3600000;
            await user.save();
            const mail = new MailService();
            mail.setApiKey(process.env.SENDGRID_KEY);
            const message = {
                to: email,
                subject: 'Password reset',
                from: {
                    name: 'Mark @ Wikibeerdia',
                    email: 'mark@wikibeerdia.com'
                },
                html: `Hello,<br>Please verify your account by clicking the link: <a href="http://${req.headers.host}/reset/${token}">http://${req.headers.host}/reset/${token}</a>`
            };
            await mail.send(message);
            res.render('auth/reset-finished', {
                path: '/reset',
                pageTitle: 'Check your email'
            });
        }
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function getNewPassword(req, res, next) {
    const token = req.params.token;
    try {
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.redirect('/');
        }
        res.render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'Reset Password',
            userId: user._id.toString(),
            passwordToken: token,
            validationErrors: []
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postNewPassword(req, res, next) {
    const errors = validationResult(req);
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const token = req.body.passwordToken;
    if (!errors.isEmpty()) {
        return res.status(422).render('auth/new-password', {
            path: '/new-password',
            pageTitle: 'Reset Password',
            validationErrors: errors.array(),
            userId: userId,
            passwordToken: token
        });
    }
    try {
        let resetUser = await User.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
            _id: userId
        });
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        resetUser.passwordLastUpdated = new Date();
        await resetUser.save();
        res.render('auth/new-finished', {
            path: '/new-finished',
            pageTitle: 'Reset Password'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postCheckUsername(req, res, next) {
    try {
        const count = await User.findOne({
            username: req.body.username
        }).countDocuments();
        let data;
        if (count === 0) {
            data = { result: 'success' };
        } else {
            data = { result: 'error' };
        }
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}
