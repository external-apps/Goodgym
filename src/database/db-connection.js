const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conn = mongoose.connection;

require('env2')(`${__dirname}/../../.env`);
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;
const database = process.env.DB_DATABASE;

const uri = `mongodb://${user}:${pass}@ds137141.mlab.com:37141/${database}`;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
};

mongoose.connect(uri, options);

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
  console.log('We are connected!');
});

const GoodGymSchema = new Schema({
  run: Object
});

const GoodGymDB = mongoose.model('GoodGymDB', GoodGymSchema);

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = {
  GoodGymDB,
  Admin
};
