import React, { useEffect, useState } from 'react'
import apiClient from '../../../services/api-client'
import CategoryItem from './CategoryItem'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'



const Category = () => {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		apiClient
			.get('/category')
			.then((res) => setCategories(res.data.results))			
			.finally(() => setLoading(false))
			
	}, [])

	return (
		<div>
			<div className="w-full px-10 mt-23 justify-around items-center">
				{!loading && categories.length > 0 && (
					<Swiper
						modules={[Autoplay, Pagination, Navigation]}
						spaceBetween={10}
						centeredSlides={false}
						autoplay={{
							delay: 0,
							disableOnInteraction: false,
						}}
						speed={6000}
						freeMode={true}
						pagination={false}
						navigation={false}
						loop={false}						
						breakpoints={{
							320: { slidesPerView: 1 },
							640: { slidesPerView: 2 },
							1024: { slidesPerView: 4 },
							1280: { slidesPerView: 5 },
						}}
						className="py-5"
					>
						{[...categories, ...categories].map((category, index) => (						
							<SwiperSlide
								key={category.id}
								className="!w-auto"
							>
								<CategoryItem
									index={index}
									category={category}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				)}
			</div>
		</div>
	)
}

export default Category
