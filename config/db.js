const mongoose = require('mongoose');
const url = 'mongodb+srv://bohibaofficial:bohiba2023@cluster0.y8btdhu.mongodb.net/bohiba?retryWrites=true&w=majority//';

const db = mongoose.createConnection(url).on('open', ()=> {
  console.log("MongoDB connected");
}).on('error', ()=> {
  console.log("Server error");
});


module.exports = db;