"use strict";

var db = require('../util/db'),
    winston = require('winston'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
});

var UserSchema = new db.Schema({
    username: { type: String, required: true, index: { unique: true }},
    password: { type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    created:  {type: Date, default: Date.now()},
    lastModified: Date
});

UserSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// expose enum on the model, and provide an internal convenience reference
var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};

var User = db.mongoose.model('Users', UserSchema);

exports.add = function(user, callback) {
    logger.info('Adding User: ' + JSON.stringify(user));
    var userInstance = new User(user);

    userInstance.save(function (err){
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, userInstance);
        }
    });
};

exports.findAll = function(callback) {
    logger.info('Retrieving all Users');

    Users.find(function(err, users){
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, users);
        }
    });

};

exports.findById = function(id, callback) {
    logger.info('Searching for User: ' + id);

    User.findById(id, function (err, result) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, result);
        }
    });

};

exports.update = function (id, user, callback) {
    logger.log('info', 'Updating User: ' + id );
    logger.log('debug', JSON.stringify(user));

    User.update( {_id: id}, user, function(err, result){
        if(err) {
            logger.log('error', err);
            callback(err);
        } else {
            logger.log('info', JSON.stringify(result) + ' document(s) updated');
            callback(null, result);
        }
    });

};

exports.remove = function (id, callback) {
    logger.log('info', 'Deleting User: ' + id );

    User.remove({_id: id}, function(err, result){
        if(err) {
            logger.log('error', err);
            callback(err);
        } else {
            logger.log('info', result + ' document(s) deleted');
            callback(null, result);
        }
    });
};

exports.validate = function (username, password, callback) {
    User.findOne({ "username": username }, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword(password, function(err, isMatch) {
            if (err) throw err;

            if (isMatch) {
                return callback(null, user);
            }

            return callback(null, null, reasons.PASSWORD_INCORRECT);

        });

    });
};