//databse configuration
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOURL);

const conn = mongoose.connection;

conn.on('connected', () => { console.log('DB connected');})
conn.on('error', () => console.log('DB connection failed'));

module.exports = conn;
