import React from 'react';
import HeroCarosoul from '../components/Home/carosol/HeroCarosoul';
import Features from '../components/Features';
import Product from '../components/products/Product';
import DiscountSection from '../../src/components/Home/discount/DiscountSection'
import Category from '../components/Home/category/Category';

const Home = () => {
    return (
        <div>
           <HeroCarosoul />
           <Features />    
           <Category />     
           <Product />
           {/* <DiscountSection /> */}
        </div>
    );
};

export default Home;