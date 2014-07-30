var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

exports.mongoose = mongoose;
exports.Schema = Schema;

var username = "medecisionSampleApp",
    password = "password",
    address = "pa-d-gpaff01/medecisionSample";

connect();
function connect() {
    var url = 'mongodb://' + username + ':' + password + "@" + address;

    console.log("Connecting to 'member' collection: " + url );

    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}