const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://peter:goodgym123-@cluster0-shard-00-00-reo2v.mongodb.net:27017,cluster0-shard-00-01-reo2v.mongodb.net:27017,cluster0-shard-00-02-reo2v.mongodb.net:27017/admin?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
MongoClient.connect(uri, (err, db) => {
  if (err) { console.log(err); }
  console.log('We are connected');
  db.close();
});
