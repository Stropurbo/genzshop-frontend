import React from 'react';
import HeroCarosoul from '../components/Home/carosol/HeroCarosoul';
import Features from '../components/Features';
import Product from '../components/products/Product';
import DiscountSection from '../../src/components/Home/discount/DiscountSection'
import Category from '../components/Home/category/Category';
import LatestNews from './LatestNews';
import ThreeCaro from './ThreeCaro';

const Home = () => {
    return (
		<div>
			<ThreeCaro />
			{/* <HeroCarosoul /> */}
			<Category />
			<Product />
			<DiscountSection />
			<Features />
            <LatestNews />
		</div>
	)
};

export default Home;