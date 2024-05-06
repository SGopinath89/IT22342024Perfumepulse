const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const mongoose = require('mongoose');

require('dotenv/config');





//middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan('tiny'));





//Routes
/* const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);
 */















//database
mongoose.connect(process.env.CONNECTION_STRING, {
   
    dbName: 'perfumepulseDatabase'
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
