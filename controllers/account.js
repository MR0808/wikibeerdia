import crypto from 'crypto';

import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import { MailService } from '@sendgrid/mail';
import mongoose from 'mongoose';
import { DateTime } from 'luxon';

import User from '../models/user.js';
import Token from '../models/token.js';
import Country from '../models/country.js';
import State from '../models/state.js';
import deleteFile from '../util/file.js';

export async function getAccount(req, res, next) {
    res.render('account/account-main', {
        pageTitle: 'Account Settings',
        path: '/account',
        blackHeading: true,
        user: req.session.user
    });
}

export async function getPersonalInfo(req, res, next) {
    try {
        const user = await User.findById(req.session.user)
            .populate({ path: 'country', select: 'name' })
            .populate({ path: 'state', select: 'name' });
        const countries = await Country.find().sort('name').select('name');
        let states = '';
        if (!user.country) {
            user.country = '';
        } else {
            states = await State.find({ country: user.country })
                .sort('name')
                .select('name');
        }
        let dobLabel = '';
        let dobFormat = '';
        if (user.dateOfBirth) {
            const dob = DateTime.fromJSDate(user.dateOfBirth);
            dobLabel = dob.toLocaleString(DateTime.DATE_FULL);
            dobFormat = dob.toFormat('yyyy-LL-dd');
        }
        res.render('account/personal-info', {
            pageTitle: 'Personal Info',
            path: '/account/personal-info',
            blackHeading: true,
            user: user,
            countries: countries,
            states: states,
            dob: dobLabel,
            dobFormat: dobFormat
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoName(req, res, next) {
    let errors = [];
    let data;
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoGender(req, res, next) {
    let errors = [];
    let data;
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.gender = req.body.gender;
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoLocation(req, res, next) {
    let errors = [];
    let data;
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.country = mongoose.Types.ObjectId.createFromHexString(
            req.body.country
        );
        if (req.body.state) {
            user.state = mongoose.Types.ObjectId.createFromHexString(
                req.body.state
            );
        }
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoDob(req, res, next) {
    let errors = [];
    let data;
    let dob = new Date(req.body.dateOfBirth);
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.dateOfBirth = dob;
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoProfile(req, res, next) {
    let data;
    let profileUrl = '';
    const profile = req.files.profilePicture;
    let profileError = false;
    if (!profile) {
        profileError = true;
    } else {
        profileUrl = profile[0].path.replaceAll('\\', '/');
    }
    if (profileError) {
        data = { result: 'error' };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.profilePicture = profileUrl;
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postPersonalInfoRemoveProfile(req, res, next) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.session.user },
            { $unset: { profilePicture: 1 } },
            { new: true }
        );
        req.session.user = user;
        const data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function getSecurity(req, res, next) {
    try {
        const user = await User.findById(req.session.user);
        res.render('account/security', {
            pageTitle: 'Login and Security',
            path: '/account/security',
            blackHeading: true,
            user: user
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postSecurityEmail(req, res, next) {
    let errors = [];
    let data;
    let email = req.body.email;
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        const emailOld = user.email;
        user.email = email;
        user.emailOld = emailOld;
        user.isVerified = false;
        req.session.user = await user.save();
        const token = new Token({
            _userId: user._id,
            token: crypto.randomBytes(16).toString('hex')
        });
        await token.save();
        const mail = new MailService();
        mail.setApiKey(process.env.SENDGRID_KEY);
        const message = {
            to: email,
            subject: 'Verify your email',
            from: {
                name: 'Mark @ Wikibeerdia',
                email: 'mark@wikibeerdia.com'
            },
            html: `Hello,<br>Please verify your account by clicking the link: <a href="http://${req.headers.host}/confirmation/${token.token}">http://${req.headers.host}/confirmation/${token.token}</a>`
        };
        await mail.send(message);

        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postSecurityResendEmail(req, res, next) {
    try {
        const user = await User.findById(req.session.user);
        const email = user.email;
        user.isVerified = false;
        req.session.user = await user.save();
        const token = await Token.findOne({ _userId: user._id });
        const mail = new MailService();
        mail.setApiKey(process.env.SENDGRID_KEY);
        const message = {
            to: email,
            subject: 'Verify your email',
            from: {
                name: 'Mark @ Wikibeerdia',
                email: 'mark@wikibeerdia.com'
            },
            html: `Hello,<br>Please verify your account by clicking the link: <a href="http://${req.headers.host}/confirmation/${token.token}">http://${req.headers.host}/confirmation/${token.token}</a>`
        };
        await mail.send(message);
        const data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

export async function postSecurityUsername(req, res, next) {
    let errors = [];
    let data;
    let username = req.body.username;
    errors = validationResult(req);
    if (!errors.isEmpty()) {
        data = { result: 'error', errors: errors.array() };
        return res.status(200).json({ data: data });
    }
    try {
        const user = await User.findById(req.session.user);
        user.username = username;
        req.session.user = await user.save();
        data = { result: 'success' };
        return res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
}

// export async function postSecurityEnable2FA(req, res, next) {
//     try {
//         const user = await User.findById(req.session.user);
//         const base32_secret = generateBase32Secret();
//         req.session.user = await User.updateOne(
//             { _id: user },
//             { secrets2fa: base32_secret }
//         );
//         let totp = new OTPAuth.TOTP({
//             issuer: 'wikibeerdia.com',
//             label: 'Wikibeerdia',
//             algorithm: 'SHA1',
//             digits: 6,
//             secret: base32_secret
//         });
//         let otpauth_url = totp.toString();
//         QRCode.toDataURL(otpauth_url, (err) => {
//             if (err) {
//                 return res.status(500).json({
//                     status: 'fail',
//                     message: 'Error while generating QR Code'
//                 });
//             }
//             res.json({
//                 status: 'success',
//                 data: {
//                     qrCodeUrl: qrUrl,
//                     secret: base32_secret
//                 }
//             });
//         });
//     } catch (err) {
//         console.log(err);
//         const error = new Error(err);
//         error.httpStatusCode = 500;
//         return next(error);
//     }
// }

// export async function postSecurityVerify2FA(req, res, next) {
//     const token = req.body.token;
//     const user = await User.findById(req.session.user);
//     if (!user) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'User does not exist'
//         });
//     }
//     // verify the token
//     const totp = new OTPAuth.TOTP({
//         issuer: 'codeninjainsights.com',
//         label: 'codeninjainsights',
//         algorithm: 'SHA1',
//         digits: 6,
//         secret: user.secrets2fa
//     });
//     const delta = totp.validate({ token });

//     if (delta === null) {
//         return res.status(401).json({
//             status: 'fail',
//             message: 'Authentication failed'
//         });
//     }

//     // update the  user status
//     if (!user.enable2fa) {
//         await User.updateOne({ _id: user._id }, { enable2fa: true });
//     }

//     res.json({
//         status: 'success',
//         data: {
//             otp_valid: true
//         }
//     });
// }

// const generateBase32Secret = () => {
//     const buffer = crypto.randomBytes(15);
//     return encode(buffer).replace(/=/g, '').substring(0, 24);
// };
