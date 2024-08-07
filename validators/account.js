import { body } from 'express-validator';

import User from '../models/user.js';
import Country from '../models/country.js';
import State from '../models/state.js';

export const personalInfoName = [
    body('firstName').exists({ checkFalsy: true }),
    body('lastName').exists({ checkFalsy: true })
];

export const personalInfoGender = [body('gender').exists({ checkFalsy: true })];

export const personalInfoLocation = [
    body('country').exists({ checkFalsy: true }),
    body('state')
        .if(body('country').notEmpty())
        .custom(async (value, { req }) => {
            const states = await State.countDocuments({
                country: req.body.country
            });
            if (states > 0) {
                if (!value) {
                    throw new Error('No state selected');
                }
            }
            return true;
        })
];

export const personalInfoDob = [
    body('dateOfBirth')
        .exists({ checkFalsy: true })
        .isDate({ format: 'YYYY-MM-DD' })
        .custom((value) => {
            const dob = new Date(value);
            const year = dob.getFullYear();
            const today = new Date();
            const age = today.getFullYear() - year;
            if (age < 18) {
                throw new Error('User is under 18');
            } else {
                return true;
            }
        })
];

export const securityEmail = [
    body('email')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a valid email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom((value, { req }) => {
            return User.findOne({ email: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject(
                        'Email already exists, please try again'
                    );
                }
            });
        })
        .normalizeEmail()
];

export const securityUsername = [
    body('username')
        .exists({ checkFalsy: true })
        .withMessage('Please enter a username')
        .custom((value, { req }) => {
            return User.findOne({ username: value }).then((userDoc) => {
                if (userDoc) {
                    return Promise.reject(
                        'Username exists already, please try a different one'
                    );
                }
            });
        })
];

export const securityPassword = [
    body(
        'password',
        'The password must be at least 8 characters long, contain one uppercase, one lowercase, one number and a symbol'
    )
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })
        .trim(),
    body('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('You must type a confirmation password')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('The passwords do not match')
        .trim()
];
