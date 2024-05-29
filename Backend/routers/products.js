const {Product} = require('../models/product');
const { User } = require('../models/user');
const express = require('express');
const {Category} = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');


const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if(isValid){
            uploadError = null
        }

        cb(uploadError, 'public/uploads')
    },
    filename: function(req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage})

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

// Endpoint for getting most popular products
router.get('/popular', async (req, res) => {
    try {
        // Find products with rating greater than 50, sorted by rating descending
        const popularProducts = await Product.find({ rating: { $gt: 50 } }).sort({ rating: -1 }).limit(8);
        res.json(popularProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//get product
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

router.get(`/search`, async (req, res) => {
    try {
        let filter = {};

        // Check if there's a search query in the request
        if (req.query.q) {
            // Use regex to perform a case-insensitive search for products containing the search query in their name
            filter = {
                name: { $regex: req.query.q, $options: 'i' }
            };
        }

        const productList = await Product.find(filter).populate('category');

        if (!productList || productList.length === 0) {
            return res.status(404).json({ success: false, message: "No products found" });
        }

        res.status(200).json({ success: true, data: productList });
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});




























router.get(`/:id`, async(req, res) =>{
    
    const product = await Product.findById(req.params.id).populate('category');

    if (!product){
        res.status(500).json({success: false})
    }
    res.send(product);
}) 

//endpoint for post a new product
router.post(`/`, uploadOptions.single('image'), async (req, res) =>{
    
   

    const file = req.file;
    if(!file){
        return res.status(400).send('No image in the request')
    }

    const fileName = req.file.filename
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })

    product = await product.save();

    if(!product){
        return res.status(500).send('The product cannot be saved!')
    }
        res.send(product);
})

//Update Product
router.put('/:id', async (req, res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product Id')
    }
    

    const product= await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        {new: true}
    )

    if(!product){
        return res.status(500).send('The product cannot be updated!')
    }
    res.send(product);
})

router.delete('/:id', (req, res)=>{
    Product.findByIdAndDelete(req.params.id).then(product =>{
        if(product){
            return res.status(200).json({success: true , message: 'Deleted'})
        } else {
            return res.status(404).json({success: false , message: 'Canceled'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})





router.get(`/get/count`, async(req, res) =>{
    const productCount = await Product.countDocuments()

    if (!productCount){
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    });
}) 

// Endpoint to like a product
router.post('/:id/like', async (req, res) => {
    const userId = req.body.userId;
  
    if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(userId)) {
      return res.status(400).send('Invalid Product Id or User Id');
    }
  
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    // Add user to likes array if not already liked
    if (!product.likes.includes(userId)) {
      product.likes.push(userId);
      product.unlikes.pull(userId); // Remove user from unlikes if exists
    } else {
      product.likes.pull(userId); // If user already liked, remove like
    }
  
    await product.save();
    res.send(product);
  });
  
  // Endpoint to unlike a product
  router.post('/:id/unlike', async (req, res) => {
    const userId = req.body.userId;
  
    if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(userId)) {
      return res.status(400).send('Invalid Product Id or User Id');
    }
  
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
  
    // Add user to unlikes array if not already unliked
    if (!product.unlikes.includes(userId)) {
      product.unlikes.push(userId);
      product.likes.pull(userId); // Remove user from likes if exists
    } else {
      product.unlikes.pull(userId); // If user already unliked, remove unlike
    }
  
    await product.save();
    res.send(product);
  });


module.exports = router;