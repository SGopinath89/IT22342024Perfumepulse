import React from 'react';
import Sample from '../Components/Sample/Sample';
import NewCollections from '../Components/NewCollection/NewCollection';
import Popular from '../Components/Popular/Popular';
import NewsLetter from '../Components/NewsLetter/NewsLetter';
import FindUs from '../Components/FindUs/FindUs';

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