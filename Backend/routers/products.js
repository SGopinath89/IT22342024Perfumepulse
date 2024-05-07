const {Product} = require('../models/product');
const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');




























router.get('/allproducts', async (req, res)=>{
    let products =await Product.find({});
    console.log("All Products Fetched");
    res.json(products);
})

//creating end point for newCollection data
router.get('/newcollections', async (req, res)=>{
    let products =await Product.find({});
    let newCollection = products.slice(1).slice(-8)
    console.log("All Products Fetched");
    res.json(newCollection);
})














router.get(`/`, async(req, res) =>{
    //const productList = await Product.find().select('name image -_id'); //if you want whole data just remove ".select('name');"

    let filter = {};

     if(req.query.categories){
        filter = {category: req.query.categories.split(',')}
    } 

    const productList = await Product.find(filter).populate('category');

    if (!productList  || productList.length === 0){
        res.status(500).json({success: false})
    }
    res.send(productList);
}) 






























router.get(`/:id`, async(req, res) =>{
    
    const product = await Product.findById(req.params.id).populate('category');

    if (!product){
        res.status(500).json({success: false})
    }
    res.send(product);
}) 

module.exports = router;