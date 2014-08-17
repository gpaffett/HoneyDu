var express = require('express'),
    todos = require('../model/todo'),
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

//Find All ToDos
router.get('/', function (req, res) {

    logger.info('user ' + req.user.email + ' is calling /api/restricted');

    var field = req.query.field,
        value = req.query.value;

    if (field && value) {
        logger.info('Finding all to dos by Field: ' + field + ' and Value: ' + value);
        todos.find(field, value, function (err, results) {
            if (err) {
                throw err;
            }
            res.send(results);
        })
    } else {
        logger.info('Finding all todos');
        todos.findAll(function (err, results) {
            if (err) {
                throw err;
            }
            res.send(results);
        })
    }
});

router.get('/assignedTo/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');

    var id = req.params.id;

    logger.info('Finding all To Dos Assigned To: ' + id);

    todos.findByAssignedTo(req.params.id, function (err, results) {
        if (err) {
            throw err;
        }
        res.send(results);
    })
});

router.get('/createdBy/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');

    var id = req.params.id;

    logger.info('Finding all To Dos Created By: ' + id);
    todos.findByCreatedBy(id, function (err, results) {
        if (err) {
            throw err;
        }
        res.send(results);
    })
});

//Find To Do by ID
router.get('/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Getting by ID');
    var id = req.params.id;

    todos.findById(id, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//Add To Do
router.post('/', function (req, res) {
    logger.info('user ' + req.email + ' is calling /api/restricted');
    logger.info('Adding todo');
    var todo = req.body;

    todos.add(todo, function (err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//Update To Do
router.put('/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Updating todo');

    var todoId = req.params.id;
    var todo = req.body;

    todos.update(todoId, todo, function (err, result) {
        if (err) {
            throw err;
        }
        res.send({'updateCount': result});
    });
});

//Delete To Do
router.delete('/:id', function (req, res) {
    logger.info('user ' + req.user.email + ' is calling /api/restricted');
    logger.info('Removing todo');
    var todoId = req.params.id;

    todos.remove(todoId, function (err, result) {
        if (err) {
            throw err;
        }

        res.send({'deleteCount': result});

    });
});

module.exports = router;