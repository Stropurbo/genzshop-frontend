import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import ErrorAlert from '../ErrorAlert'
import { Link } from 'react-router'
import apiClient from '../../services/api-client'

const Product = () => {
	const [product, setProduct] = useState([])
	const [isloading, setLoading] = useState(false)
	const [error, setError] = useState('')

	useEffect(() => {
		setLoading(true)
		apiClient
			.get('/products/')
			.then((res) => setProduct(res.data.results))
			.catch((error) => setError(error.message))
			.finally(() => setLoading(false))
	}, [])

	const fashionProduct = product.filter(
		(p) =>
			p.category == 9 ||
			p.category == 10 ||
			p.category == 11 ||
			p.category == 12 ||
			p.category == 13 ||
			p.category == 14 ||
			p.category == 15 ||
			p.category == 16,
	)

	return (
		<div className="w-full max-w-screen bg-white py-10 px-4 sm:px-6 lg:px-10 mx-auto">
			{' '}
			{/* Section: New Product */}
			<section className="mb-10">
				<div className="flex justify-between items-center mb-5">
					<h1 className="font-bold text-xl md:text-4xl">New Product</h1>
					<Link
						to="/all-product"
						className="text-blue-500 hover:underline"
					>
						Explore
					</Link>
				</div>

				{isloading && (
					<div className="flex justify-center items-center">
						<span className="loading loading-spinner loading-lg m-5"></span>
					</div>
				)}

				{error && <ErrorAlert errormessage={'Product Load Failed!'} />}

				{!isloading && !error && product.length > 0 && (
					<Swiper
						modules={[Autoplay, Pagination, Navigation]}
						spaceBetween={10}
						centeredSlides={false}
						autoplay={{ delay: 2500, disableOnInteraction: false }}
						pagination={false}
						navigation={false}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 2 },
							768: { slidesPerView: 3 },
							1024: { slidesPerView: 4 },
							1536: { slidesPerView: 5 },
						}}
					>
						{product.map((product) => (
							<SwiperSlide
								key={product.id}
								className="flex w-full justify-center"
							>
								<ProductItem product={product} />
							</SwiperSlide>
						))}
					</Swiper>
				)}

				{!isloading && !error && product.length === 0 && (
					<p className="text-center text-gray-500 font-bold">Product Not Available</p>
				)}
			</section>
			{/* Section: Top Selling */}
			<section>
				<div className="flex justify-between items-center mb-5">
					<h1 className="font-bold text-xl md:text-4xl mt-5">Top Selling</h1>
					<Link
						to="/all-product"
						className="text-blue-500 hover:underline"
					>
						Explore
					</Link>
				</div>

				{!isloading && !error && fashionProduct.length > 0 && (
					<Swiper
						modules={[Autoplay, Pagination, Navigation]}
						spaceBetween={10}
						centeredSlides={false}
						autoplay={{ delay: 2500, disableOnInteraction: false }}
						pagination={false}
						navigation={false}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 2 },
							768: { slidesPerView: 3 },
							1024: { slidesPerView: 4 },
							1536: { slidesPerView: 5 },
						}}
					>
						{fashionProduct.map((product) => (
							<SwiperSlide
								key={product.id}
								className="flex w-full justify-center"
							>
								<ProductItem product={product} />
							</SwiperSlide>
						))}	
					</Swiper>
				)}
			</section>
		</div>
	)
}

export default Product
