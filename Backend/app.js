const express = require('express');
const app = express();


const mongoose = require('mongoose');

require('dotenv/config');






//middleware
app.use(express.json());























//database
mongoose.connect(process.env.CONNECTION_STRING, {
   
    dbName: 'eshop'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
    console.log(err);
})











const port =5000;

//Server
app.listen(port, ()=>{
   
    console.log(`Server is running now http://localhost:${port}`)
})
