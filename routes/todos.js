var express = require('express');
var todos = require('../model/todo');

winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

var router = express.Router();

//Find All ToDos
router.get('/', function(req, res) {
    todos.findAll( function (err, results) {
        if (err) {
            throw err;
        }
        res.send(results);
    })
});

//Find To Do by User ID
router.get('/:id', function(req, res){
    var assignedToId = req.params.id;

    todos.findByAssignedTo(assignedToId, function(err, result){
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//Add To Do
router.post('/', function(req, res) {
    var todo = req.body;

    todos.add(todo, function(err, result) {
        if (err) {
            throw err;
        }
        res.send(result);
    });
});

//Update To Do
router.put('/:id', function(req, res){
    var todoId = req.params.id;
    var todo = req.body;

    todos.update(todoId, todo, function(err, results){
        if (err) {
            throw err;
        }
        res.send(results);
    });
});

//Delete Member
router.delete('/:id', function(req, res){
    var todoId = req.params.id;

    todos.delete(todoId, function(err, result){
        if (err) {
            throw err;
        }

        if (result.value >= 1 ) {
            res.status(200);
            res.send();
        } else {
            res.status(410);
            res.send( {'status': '410',
                       'message': 'No records deleted'});
        }


    });
});

module.exports = router;