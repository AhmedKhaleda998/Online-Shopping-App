const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://ahmedkhaleda:abcd1234@cluster.1w2hiwu.mongodb.net/shop?retryWrites=true&w=majority'
    )
        .then(client => {
            console.log('Connected');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log("Error connecting to database: " + err);
            throw err
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Datebase Found';
}

module.exports = {
    mongoConnect,
    getDb
};