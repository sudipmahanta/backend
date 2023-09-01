const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const db = mongoose.createConnection(url).on('open', ()=> {
  console.log("MongoDB connected");
}).on('error', ()=> {
  console.log("Server error");
});

module.exports = db;