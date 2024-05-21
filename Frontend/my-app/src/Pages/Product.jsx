import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum'

import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import ProductSelection from '../Components/RelatedProducts/RelatedProducts';
import '../Pages/CSS/Product.css'
