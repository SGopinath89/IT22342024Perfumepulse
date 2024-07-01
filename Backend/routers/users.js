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


//getCount
router.get('/get/count', (req,res) => {
    Service.getCount(res, User, name).catch((error) => {
        res.status(500).send(error+ " Server Error")
    })  
})

//Get user without password
router.get('/profile/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('-passwordHash');
  
      if (!user) {
        return res.status(404).json({ success: false, message: 'The user with the given ID was not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

//Post new User
router.post('/', upload.single('profilePhoto'), async (req, res)=>{
    const profilePhotoUrl = req.file ? req.file.path : '';

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        profilePhoto: profilePhotoUrl
    })

    user = await user.save();

    if(!user){
        return res.status(404).send('The user cannot be created!')
    }

    return res.status(200).send(user);
})

//Update user details
router.put('/:id', upload.single('profilePhoto'), async (req, res)=> {

    const userExist = await User.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const profilePhotoUrl = req.file ? req.file.path : userExist.profilePhoto;

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
            profilePhoto: profilePhotoUrl
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

//User Login
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const secret = process.env.SECRET;

    if (!user) {
        return res.status(400).send('The user not found');
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        try {
            const token = jwt.sign(
                {
                    userId: user.id,
                },
                secret,
                { expiresIn: '1d' }
            );
            res.status(200).json({ user: { _id: user._id, email: user.email, name: user.name, phone: user.phone, street: user.street, apartment: user.apartment, zip: user.zip, city: user.city, country: user.country}, token: token });
        } catch (error) {
            console.error('Error signing JWT token:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        return res.status(400).json({ error: 'Password is wrong' });
    }
});

// Admin login endpoint
router.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
  
    // Replace with your actual user validation logic
    if (email === 'admin@gmail.com' && password === 'admin123') {
      const token = jwt.sign({ email, isAdmin: true }, process.env.secret, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

//User Register
router.post('/register', upload.single('profilePhoto'), async (req,res)=>{
    const profilePhotoUrl = req.file ? req.file.path : '';

    let check = await User.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false, errors:"existing user found with same email address"});
    }

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        profilePhoto: profilePhotoUrl
    })
    user = await user.save();

    if (!user) {
        return res.status(400).json({ success: false, errors: "Failed to register user. Please check your input data." });
    }      

    res.status(201).json({ success: true, message: "User registered successfully", user });

})




module.exports = router;