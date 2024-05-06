const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res)=>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList);
})


router.get('/:id', async (req, res)=>{
    const order = await Order.findById(req.params.id)
    .populate('user', 'name')
    .populate({ 
        path: 'orderItems', populate: {
        path: 'product', populate: 'category'}
    });

    if(!order){
        res.status(500).json({success: false})
    }
    res.send(order);
})

module.exports = router;