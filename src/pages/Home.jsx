import React from 'react';
import HeroCarosoul from '../components/Home/carosol/HeroCarosoul';
import Features from '../components/Features';
import Product from '../components/products/Product';
import DiscountSection from '../../src/components/Home/discount/DiscountSection'
import Category from '../components/Home/category/Category';
import LatestNews from './LatestNews';
import ThreeCaro from './ThreeCaro';
import { Toaster } from 'react-hot-toast';

const Home = () => {
    return (
		<div>
			<Toaster position="top-right" />
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