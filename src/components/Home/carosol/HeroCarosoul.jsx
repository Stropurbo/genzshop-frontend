import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import CarosolSlide from './CarosolSlide'
import { useEffect, useState } from 'react'
import apiClient from '../../../services/api-client'

const HeroCarosoul = () => {
	const [product, setProduct] = useState([])

	useEffect(() => {
		apiClient
			.get('/products')
			.then((res) => setProduct(res.data.results))
			.catch((error) => console.log(error))
	}, [])

	const slides = product.map((product) => ({
		title: product.name,
		subtitle: product.description,
		image: product.images[0].image,
	}))

	return (
		<>
			<Swiper
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
			</Swiper>
		</>
	)
}
export default HeroCarosoul
