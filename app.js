import path from 'path';
import * as url from 'url';

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import { default as connectMongoDBSession } from 'connect-mongodb-session';
import helmet from 'helmet';
// import { csrfSync } from 'csrf-sync';

import * as errorController from './controllers/error.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const MongoDBStore = connectMongoDBSession(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vuiwnxj.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

// const { csrfSynchronisedProtection } = csrfSync({
//     getTokenFromRequest: (req) => {
//         if (
//             req.is('multipart') ||
//             req.is('application/x-www-form-urlencoded')
//         ) {
//             return req.body['CSRFToken'];
//         }
//         return req.headers['x-csrf-token'];
//     }
// });

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            'default-src': ["'self'"],
            'script-src': [
                "'self'",
                "'unsafe-inline'",
                'js.stripe.com',
                'cdn.jsdelivr.net',
                "'unsafe-hashes'",
                'cdnjs.cloudflare.com'
            ],
            'style-src': [
                "'self'",
                "'unsafe-inline'",
                'fonts.googleapis.com',
                'kit-pro.fontawesome.com'
            ],
            'frame-src': ["'self'", 'js.stripe.com'],
            'font-src': [
                "'self'",
                'fonts.googleapis.com',
                'fonts.gstatic.com',
                'kit-pro.fontawesome.com'
            ]
        }
    })
);

import mainRoutes from './routes/main.js';
import authRoutes from './routes/auth.js';
import configRoutes from './routes/config.js';
import locationRoutes from './routes/location.js';
import breweryRoutes from './routes/brewery.js';
import accountRoutes from './routes/account.js';
import otpRoutes from './routes/otp.js';
import adminRoutes from './routes/admin.js';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        store: store
    })
);

// app.use(csrfSynchronisedProtection);

app.use((req, res, next) => {
    // ['log', 'warn'].forEach(function (method) {
    //     var old = console[method];
    //     console[method] = function () {
    //         var stack = new Error().stack.split(/\n/);
    //         // Chrome includes a single "Error" line, FF doesn't.
    //         if (stack[0].indexOf('Error') === 0) {
    //             stack = stack.slice(1);
    //         }
    //         var args = [].slice.apply(arguments).concat([stack[1].trim()]);
    //         return old.apply(console, args);
    //     };
    // });
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken(true);
    res.locals.csrfToken = true;
    res.locals.userLoggedIn = req.session.user;
    const user = req.session.user;
    if (typeof user !== 'undefined') {
        res.locals.isVerified = user.isVerified;
    } else {
        res.locals.isVerified = true;
    }
    next();
});

app.use(mainRoutes);
app.use(authRoutes);
app.use('/config', configRoutes);
app.use('/location', locationRoutes);
app.use('/breweries', breweryRoutes);
app.use('/account', accountRoutes);
app.use('/otp', otpRoutes);
app.use('/admin', adminRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500');
});

try {
    await mongoose.connect(MONGODB_URI);
    app.listen(process.env.PORT || 3000);
} catch (err) {
    console.log(err);
}
