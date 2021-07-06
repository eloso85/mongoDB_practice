const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

//Mongo Api
const {MongoClient} = require("mongodb");
//const uri = ;

app.use(cors());
app.use(express.json());

app.post('/users/create', async(req, res)=>{
    const user = req.body;
    const client = new MongoClient(uri);
    await client.connect();
    await client
    .db('mydb')
    .collection('users')
    .insertOne({
        id: parseInt(user.id),
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        avatar: user.avatar
    });
    await client.close();
    res.status(200).send({
        "status":"ok",
        "message":"User with ID = " +user.id+"is created",
        "user": user
    });
});

app.get('/users', async(req,res)=>{
    const id = parseInt(req.params.id);
    const client = new MongoClient(uri);
    await client.connect();
    const users = await client.db('mydb').collection('users').find({}).toArray();
    await client.close();
    res.status(200).send(users);
});

app.get('/', (req, res)=>{
    res.send('Hello World')
});

app.get('/users/:id', async(req, res) =>{
    const id = parseInt(req.params.id);
    console.log(id)
    const client = new MongoClient(uri);
    await client.connect();
    const user = await client.db('mydb').collection('users').findOne({"id": id});
    await client.close();
    res.status(200).send({
        "status":"ok",
        "user":user
    })
});
app.put('/users/update', async(req, res) => {
    const user = req.body;
    const id = parseInt(user.id);
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('mydb').collection('users').updateOne({'id': id}, {"$set": {
      id: parseInt(user.id),
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      avatar: user.avatar
    }});
    await client.close();
    res.status(200).send({
      "status": "ok",
      "message": "User with ID = "+id+" is updated",
      "user": user
    });
  })
// app.put('/users/update', async(req, res)=>{
//     const user = req.body;
//     const id = parseInt(user.id);
//     const client = new MongoClient(uri);
//     await client.connect();
//     await client.db('mydb').collection('users').updateOne({'id': id}, {"$set":{
//         id: parseInt(user.id),
//         fname: user.fname,
//         lname: user.lname,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar
//     }});
//     await client.close();
//     res.status(200).send({
//         "status": "ok",
//         "message": "User with ID = " +id+" is updated",
//         "user":user
//     })
// })

app.listen(port, ()=>{
    console.log(`Example app listening at https://localhost:${port}`)
});
