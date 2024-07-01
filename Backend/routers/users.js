const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload = require('../helpers/upload');


//Get users
router.get('/', (req,res) => {
    Service.getAll(res, User, name).catch((error) => {
        res.status(500).send(error+ " Server Error")
    })  
})

//Get user by ID
router.get('/:id',(req,res)=>{
    Service.getById(req,res,User,name).catch((error) => {
        res.status(500).send(error+" Server Error")
   })
})


//Delete an User
router.delete('/:id',(req,res)=>{
    Service.deleteById(req,res,User,name).catch((error) => {
        res.status(500).send(error+" Server Error")
    })
})

module.exports = router;