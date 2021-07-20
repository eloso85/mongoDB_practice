const express = require('express')
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

//connecting to Data base
//db name create db
mongoose.connect(process.env.DATABASE_URL,{dbName:"myapp",useNewUrlParser: true})
const db = mongoose.connection;

db.on('error', (error)=> console.error(error))
db.once('open', ()=> console.log('connected to database'))

app.use(express.static('public'))
app.use(express.json());

const userRoute = require('./routes/users')
app.use('/users', userRoute)

app.listen(3005, ()=> console.log('server started'));