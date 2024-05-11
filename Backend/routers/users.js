const {User}=require('../models/user');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

//Get Users
router.get('/',async(req,res)=>{
    const userList=await User.find().select('name phone email');

    if(!userList){
        res.status(500).json({sucess:false})
    }

    res.send(userList);

})

//Get  user by ID
router.get('/:id',async(req,res)=>{
    const user=await User.findById(req.params.id).select('-passwordHash');

    if(!user){
        res.status(500).json({success:false,message:'The user with the given ID was not found.'})
    }
    res.status(200).send(user);
})

//Post User
router.post('/',async (req,res)=>{
    let user=new User({
        name:req.body.name,
        email:req.body.email,
        passwordHash:bcrypt.hashSync(req.body.password,10),
        phone:req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment:req.body.street,
        zip:req.body.zip,
        city:req.body.city,
        country:req.body.country,
    })

    user = await user.save();

    if(!user){
        return res.status(404).send('The user cannot be created')
    }


    return res.status(200).send(user);


})


//update user details
router.put('/:id',async(req,res)=>{
    const userExist=await User.findById(req.params.id);
    let newPassword
    if(req.body.password){
        newPassword=bcrypt.hashSync(req.body.password,10)
    }else{
        newPassword=userExist.passwordHash;
    }

    const user=await User.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            email:req.body.email,
            passwordHash:newPassword,
            phone:req.body.phone,
            isAdmin:req.body.isAdmin,
            street:req.body.street,
            apartment:req.body.apartment,
            zip:req.body.zip,
            city:req.body.city,
            country:req.body.country,
        },
        {new:true}
    )
    if(!user)
    return res.status(400).send('The user cannot be created')

    res.send(user);

})









