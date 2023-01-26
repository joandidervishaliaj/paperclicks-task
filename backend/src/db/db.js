const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;

function connect() {
    return new Promise((resolve, reject) => {
        if(process.env.NODE_ENV === 'test') {
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage()
            .then(() => {
                mongoose.connect(process.env.DB_URI,
                    {
                      auth: {
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                      },
                      useNewUrlParser: true,
                      useCreateIndex: true
                    })
                    .then((res, err) => {
                        if(err) {
                            return reject(err);
                        }
                        resolve();
                    })
            })
        } else {
            mongoose.connect(process.env.DB_URI);

            const db = mongoose.connection;
            db.on('connected', function () {
                console.log('MongoDB connected!');
            });
            db.on('connecting', function () {
                console.log('connecting to MongoDB...');
            });
            db.on('error', function (error) {
                console.error('Error in MongoDB connection: ' + error);
                mongoose.disconnect();
            });
            db.on('disconnected', function () {
                console.log('MongoDB disconnected!');
                mongoose.connect(process.env.DB_URI, { server: { auto_reconnect: true } });
            });
            db.once('open', function () {
                console.log('MongoDB connection opened!');
            });
            db.on('reconnected', function() {
                console.log('MongoDB reconnected!')
            });
        }
    });
}

function close() {
    return mongoose.disconnect();
}

module.exports = {
    connect,
    close
}