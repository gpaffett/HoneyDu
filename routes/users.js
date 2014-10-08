var express = require('express'),
    user = require('../model/user'),
    winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ]
});

var router = express.Router();

//Find To Do by ID
router.get('/:id', function (req, res) {
    //logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Getting by ID');
    var id = req.params.id;

    user.findById(id, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//Add User
router.post('/', function (req, res) {
    // logger.info('user ' + req.email + ' is calling /api/restricted');
    logger.info('Adding user');
    var userData = req.body;
    logger.info(userData + " Something");

    user.add(userData, function (err, result) {
        if (err) {
            res.send(err);
            //throw err;
        }
        res.send(result);
    });
});

//Update User
router.put('/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Updating user');

    var todoId = req.params.id;
    var todo = req.body;

    user.update(todoId, todo, function (err, result) {
        if (err) {
            throw err;
        }
        res.send({'updateCount': result});
    });
});

//Delete To Do
router.delete('/:id', function (req, res) {
    //logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Removing user');
    var todoId = req.params.id;

    user.remove(todoId, function (err, result) {
        if (err) {
            throw err;
        }

        res.send({'deleteCount': result});

    });
});

module.exports = router;