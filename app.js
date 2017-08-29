const express = require('express');
const path = require('path');
const mustache = require('mustache-express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoURL = 'mongodb://localhost:27017/newdb';

//need to change this to work with db
// const data = require('./data.js');

const app = express();


app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));




app.use('/employed', function (req, res) {
 MongoClient.connect(mongoURL, function (err, db) {
  const robots = db.collection('robots');
  robots.find({job:{$not:{$in:[null]}}}).toArray(function (err, docs) {
   res.render("employed", {robots: docs});
 });
 });
});

app.use('/unemployed', function (req, res) {
 MongoClient.connect(mongoURL, function (err, db) {
  const robots = db.collection('robots');
  robots.find({job:null}).toArray(function (err, docs) {
   res.render("unemployed", {robots: docs});
 });
 });
});

//so silly, having to put this at the bottom - stupid javascript
app.use('/', function (req, res) {
 MongoClient.connect(mongoURL, function (err, db) {
  const robots = db.collection('robots');
  robots.find({}).toArray(function (err, docs) {
   res.render("index", {robots: docs});
 });
 });
});




app.listen(3000, function () {
  console.log('Successfully started express application!');
});
