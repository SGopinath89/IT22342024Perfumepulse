const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();
const Service = require('../Services/GenericService')
const name = "Category"
const mongoose = require('mongoose')

//Get a Category
router.get('/', (req,res) => {
    Service.getAll(res, Category, name).catch((error) => {
        res.status(500).send(error+ " Server Error")
    })  
})

//Get a Category By Id
router.get('/:id',(req,res)=>{
    Service.getById(req,res,Category,name).catch((error) => {
        res.status(500).send(error+" Server Error")
   })
})

//Post new Category
router.post('/', async (req, res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    category = await category.save();

    if(!category){
        return res.status(404).send('The category cannot be created!')
    }
    return res.send(category);
})

//Update a Category
router.put('/:id', async (req, res)=>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.name,
            color: req.body.color,
        },
        {new: true}
    )

    if(!category){
        return res.status(404).send('The category cannot be created!')
    }
    res.send(category);
})

//Delete a Category
router.delete('/:id',(req,res)=>{
    Service.deleteById(req,res,Category,name).catch((error) => {
        res.status(500).send(error+" Server Error")
    })
})

module.exports = router;