const path = require('path');
const fs = require('fs');
const https = require('https');

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const randomstring = require('randomstring');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster.1w2hiwu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const csrfProtection = csrf();

// const privateKey = fs.readFileSync('server.key');
// const certificate = fs.readFileSync('server.cert');

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        callback(null, randomstring.generate(10) + '-' + file.originalname);
    }
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(helmet());
app.use(compression());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({
    storage: fileStorage,
    fileFilter: fileFilter
}).single('image'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use('/500', errorController.get500);
app.use(errorController.get404);
app.use((error, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    });
});

mongoose.connect(MONGODB_URI)
    .then(result => {
        // https
        //     .createServer({ key: privateKey, cert: certificate }, app)
        //     .listen(process.env.PORT || 5200, console.log(`Running`));
        app.listen(process.env.PORT || 5200, console.log(`Running`));
    })
    .catch(err => {
        console.log(err);
    });
