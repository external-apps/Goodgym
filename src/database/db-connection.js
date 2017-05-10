const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/goodgym');

// create a schema
let GoodGymSchema = new Schema({
  run: String
});

// the schema is useless so far
// we need to create a model using it
let GoodGymDB = mongoose.model('GoodGymDB', GoodGymSchema);

module.exports = GoodGymDB;
