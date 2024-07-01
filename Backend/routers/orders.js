const {Order} = require('../models/order');
const express = require('express');
const router = express.Router();
const {OrderItem} = require('../models/order-item');
const Service = require('../Services/GenericService')
const name = "Order"
const mongoose = require('mongoose')

//Get Orders
router.get('/', async (req, res)=>{
    const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

    if(!orderList){
        res.status(500).json({success: false})
    }
    res.send(orderList);
})

//Get Orders alone with Product names
router.get('/getorders', async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('user', 'name')
        .populate({
          path: 'orderItems',
          populate: {
            path: 'product',
            select: 'name', // Select only the 'name' property
          },
        });
  
      if (!orders) {
        return res.status(404).json({ success: false, message: 'No orders found' });
      }
  
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error', error });
    }
  });

//Get Orders by ID
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

//Post a new Order
router.post('/', async (req, res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved = await orderItemsIds;
    
    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: req.body.totalWithDiscount,
        user: req.body.user,
    })

    order = await order.save();

    if(!order){
        return res.status(404).send('The order cannot be created!')
    }
    res.send(order);
})


//Update Existing Order
router.put('/:id', async (req, res)=>{
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        {new: true}
    )

    if(!order){
        return res.status(404).send('The category cannot be created!')
    }
    res.send(order);
})

//Delete an Order
router.delete('/:id', (req, res)=>{
    Order.findByIdAndDelete(req.params.id).then(async order =>{
        if(order){
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndDelete(orderItem)
            })
            return res.status(200).json({success: true, message: 'The order is deleted successfully!'})
        }
        else{
            return res.status(404).json({success: false, message: 'order not found!'})
        }
    }).catch(err=>{
        return res.status(500).json({success: false, error: err})
    })
})



//Get total Sales
router.get(`/get/totalsales`, async(req, res) =>{
    const totalSales = await Order.aggregate([
        { $group: {_id: null , totalsales : { $sum : '$totalPrice'}}}
    ])

    if (!totalSales){
        return res.status(400).send('The order sales cannot be generated')
    }
    res.send({
        totalSales: totalSales.pop().totalsales
    });
}) 

//Get total Orders count
router.get('/get/count',(req,res)=>{
    Service.getCount(res, Order,name).catch((error)=>{
        res.status(500).send(error+"Server Error")
    })
})

//Get Count of Orders of particular user
router.get(`/get/userorders/:userid`, async (req, res) =>{
    const userOrderList = await Order.find({user: req.params.userid}).populate({ 
        path: 'orderItems', populate: {
            path : 'product', populate: 'category'} 
        }).sort({'dateOrdered': -1});

    if(!userOrderList) {
        res.status(500).json({success: false})
    } 
    res.send(userOrderList);
})

module.exports = router;