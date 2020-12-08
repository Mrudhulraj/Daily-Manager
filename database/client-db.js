var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/client_db";

MongoClient.connect(url,{useUnifiedTopology: true},function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
