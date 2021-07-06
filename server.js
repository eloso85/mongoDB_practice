const express = require('express')
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

//connecting to Data base

mongoose.connect(process.env.DATABASE_URL,{ useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to database'))

app.listen(3000, ()=> console.log('server started'));