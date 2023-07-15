const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');

const app = express();

const PORT = 5200;
const MongodbURI = 'mongodb+srv://ahmedkhaleda:abcd1234@cluster.1w2hiwu.mongodb.net/shop?retryWrites=true&w=majority';

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('64b14ee6f50bb5342d84e5cb')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect(MongodbURI).then((result) => {
    User.findOne().then((user) => {
        if (!user) {
            const user = new User({
                name: 'Ahmed',
                email: 'ahmed@gmail.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(PORT, console.log(`Running on port ${PORT}`));
}).catch((err) => {
    console.log(err);
});