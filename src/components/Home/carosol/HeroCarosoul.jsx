import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import CarosolSlide from './CarosolSlide'
// import { useEffect, useState } from 'react'
// import apiClient from '../../../services/api-client'

const HeroCarosoul = () => {
	// const [product, setProduct] = useState([])

	// useEffect(() => {
	// 	apiClient
	// 		.get('/products')
	// 		.then((res) => setProduct(res.data.results))
	// 		.catch((error) => console.log(error))
	// }, [])

	// const slides = product.map((product) => ({
	// 	title: product.name,
	// 	subtitle: product.description,
	// 	image: product.images[0 ].image,
	// 	id: product.id
	// }))

	const title = 'Premium Shopping'
	const subtitle = 'Experience the best sound quality with our new range of headphones.'
	const image = 'https://i.ibb.co/yFWgf67d/image-removebg-preview.png'
	// const productId =

	return (
		<>
			{/* <Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={false}
				navigation={false}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				{slides.length > 0 ? (
					slides.map((item, index) => (

						<SwiperSlide key={index}>
							<CarosolSlide
								title={item.title}
								subtitle={item.subtitle}
								image={item.image}
								productId={item.id}
							/>
							
						</SwiperSlide>
					))
				) : (
					<SwiperSlide>
						<div className="text-center py-20 font-semibold text-gray-500">
							Loading Banner...
						</div>
					</SwiperSlide>
				)}
			</Swiper> */}

			<div className="w-full mt-6">
				<div
					className="w-full rounded-lg bg-cover bg-center"
					style={{
						backgroundImage: `url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg')`,
					}}
				>
					<div className="flex flex-col-reverse lg:flex-row justify-between items-center max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-8 lg:py-16 gap-6">
						{/* Left text content */}
						<div className="w-full lg:w-1/2 text-center lg:text-left">
							<h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-white font-bold mb-4">
								{title}
							</h1>
							<p className="text-base sm:text-lg md:text-xl text-white mb-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
								{subtitle}
							</p>
							<a
								href="/shop"
								className="btn bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-lg transition"
							>
								Shop
							</a>
						</div>

						{/* Right image */}
						<div className="w-full lg:w-1/2 flex justify-center">
							<img
								src={image}
								alt="product"
								className="w-full max-w-[250px] sm:max-w-[300px] md:max-w-[400px] xl:max-w-[500px] object-contain"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default HeroCarosoul
