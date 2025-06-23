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

			<div className="flex mt-8  h-[500px] ">
				<div className="h-full">
					<div
						className="w-full h-full bg-cover flex-col md:flex-row justify-center items-center px-4 md:px-8"
						style={{
							backgroundImage: `url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?t=st=1746590644~exp=1746594244~hmac=07d1beb6f3eccfde8ab6e22957157ebf18de318786040f20d49b0a8925c6fc1d&w=826')`,
						}}
					>
						<div
							className="flex flex-col md:flex-row justify-between max-w-6xl w-full gap-6
             		items-center text-center md:text-left h-full py-8"
						>
							{/* left content */}
							<div className="w-full md:w-1/2 text-center md:text-left mt-8 md:m-0">
								<h1 className="text-2xl md:text-3xl text-white line-clamp-1 font-bold">
									{' '}
									{title}{' '}
								</h1>
								<p className="text-lg text-white line-clamp-2 mb-5">
									{' '}
									{subtitle}{' '}
								</p>
								<a
									href={`/shop/`}
									// href={`/shop/${productId}`}
									className="btn px-2 py-2 md:px-7 md:py-3 rounded-lg"
								>
									Shop
								</a>
							</div>

							{/* right image */}
							<div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
								<img
									className="w-full md:h-64 bg-contain max-w-xs sm:max-w-sm md:max-w-md"
									src={image}
									alt="product image"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
export default HeroCarosoul
