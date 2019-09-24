const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongo = require('mongodb');
const url = process.env.MONGODB_URI || 'mongodb://localhost/todoappmk';
const MongoClient = mongo.MongoClient;

const ObjectId = require('mongodb').ObjectId;
const path = require('path')

let port = process.env.PORT || 3000;
const c = console.log;
const dotenv = require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, 'public')));

app.get('/',( req,res ) => {
	res.sendFile(__dirname + '/index.html');
})


app.get('/tasks/update/:id',( req,res ) =>{
	res.sendFile(__dirname + '/update.html');
}) 


let mongod = ( funct ) => {
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, ( err,db ) => {
		let dbo = db.db('heroku_s4lzwcfx');
		let tasks = dbo.collection('todolist');
		funct(err,db,tasks);
	})
}

app.get('/main', ( req,res ) => {
	mongod((err,db,tasks) => {
		tasks.find({}).toArray((error,result)=>{
			res.send(JSON.stringify(result));
		})
	})
})


app.post('/newTask/', ( req, res ) => {
	let todo = req.body;
	console.log('Adding Todo: ' + JSON.stringify(todo));
	mongod((err,db,tasks) => {
		tasks.insertOne(todo)
	})
	res.redirect('/');
})


app.put('/tasks/update/', ( req,res ) => {
	console.log(req.body.info,req.body.id)
	let o_id = new ObjectId(req.body.id)
	mongod((err,db,tasks) => {
		tasks.updateOne({_id: o_id}, { $set: { info: req.body.info } });
	})
	res.end();
})

app.delete('/deleteTask/:id', (req,res) => {
	let id = new ObjectId(req.params.id);
	console.log('Deleting todo: ' + id);
	mongod((err,db,tasks) => {
		tasks.deleteOne({_id: id},(err,result)=>{
			console.log(err);
		});
	})
	res.end();
})

app.get('*',(req,res) => res.send('404 not found'));

app.listen(port, () => console.log(`app listening on port ${port}!`))