import React, { useState } from 'react';

import Sample from '../Components/Sample/Sample';
import NewCollections from '../Components/NewCollection/NewCollection';
import Popular from '../Components/Popular/Popular';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

import axios from 'axios';
import FindUs from '../Components/FindUs/FindUs';
import { SearchBar } from '../Components/SearchBar/SearchBar';


//sample
//new Collection

const Shop = () => {
 

  

  return (
    <div>

      <Sample />
      <NewCollections />
      <Popular />
      <NewsLetter />
      <FindUs/>
      
    </div>
  );
};

export default Shop;