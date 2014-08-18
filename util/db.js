var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

exports.mongoose = mongoose;
exports.Schema = Schema;

var username = "honeyduapp",
    password = "n0ty0u",
    address = 'ds063449.mongolab.com:63449/datafoxx';

connect();
function connect() {
    var url = 'mongodb://' + username + ':' + password + "@" + address;

    console.log("Connecting to 'member' collection: " + url );

    mongoose.connect(url);
}

function disconnect() {
    mongoose.disconnect();
}