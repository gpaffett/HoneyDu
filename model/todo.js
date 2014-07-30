var db = require('../util/db'),
    winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

var ToDoSchema = new db.Schema({
    createdBy: String,
    assignedTo: String,
    content: String,
    dueBy: Date,
    visibility: String,
    lastModified: Date
});

var ToDo = db.mongoose.model('ToDo', ToDoSchema);

exports.add = function(todo, callback) {
    logger.info('Adding To Do: ' + JSON.stringify(todo));
    var todo = new ToDo(todo);

    todo.save(function (err){
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, todo);
        }
    });
};

exports.findAll = function(callback) {
    logger.info('Retrieving all To Dos');

    ToDo.find(function(err, todos){
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, todos);
        }
    });

}

exports.findByCreatedBy = function(id, callback) {
    logger.info('Searching for To Dos by Created By Id: ' + id);

    ToDo.find({createdBy: id}, function (err, member) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, member);
        }
    });

};

exports.findByAssignedTo = function(id, callback) {
    logger.info('Searching for To Dos by Assigned To Id: ' + id);

    ToDo.findOne({assignedTo: id}, function (err, member) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, member);
        }
    });

};

exports.findById = function(id, callback) {
    logger.info('Searching for To Do: ' + id);

    ToDo.findOne({_id: id}, function (err, result) {
        if (err) {
            logger.error(err);
            callback(err);
        } else {
            callback(null, result);
        }
    });

};

exports.update = function (id, todo, callback) {
    logger.log('info', 'Updating To Do: ' + id );
    logger.log('debug', JSON.stringify(todo));

    ToDo.update( {_id: id}, todo, function(err, result){
        if(err) {
            logger.log('error', err);
            callback(err);
        } else {
            logger.log('info', JSON.stringify(result) + ' document(s) updated');
            callback(null, result);
        }
    });

};

exports.delete = function (id, callback) {
    logger.log('info', 'Deleting To Do: ' + id );

    ToDo.remove({_id: id}, function(err, result){
        if(err) {
            logger.log('error', err);
            callback(err);
        } else {
            logger.log('info', result + ' document(s) deleted');
            callback(null, result);
        }
    });
};