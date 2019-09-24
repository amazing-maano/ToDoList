const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db('todoapp');
  dbo.createCollection("todolist", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});