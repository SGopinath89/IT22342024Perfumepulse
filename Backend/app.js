const express = require('express');
const app = express();


const mongoose = require('mongoose');

require('dotenv/config');






//middleware
app.use(express.json());



































const port =5000;

//Server
app.listen(port, ()=>{
   
    console.log(`Server is running now http://localhost:${port}`)
})
