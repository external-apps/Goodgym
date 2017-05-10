const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://peter:goodgym123-@cluster0-shard-00-00-reo2v.mongodb.net:27017,cluster0-shard-00-01-reo2v.mongodb.net:27017,cluster0-shard-00-02-reo2v.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

// create a schema
let GoodGymSchema = new Schema({
  run: String
});

// the schema is useless so far
// we need to create a model using it
let GoodGymDB = mongoose.model('GoodGymDB', GoodGymSchema);

module.exports = GoodGymDB;
