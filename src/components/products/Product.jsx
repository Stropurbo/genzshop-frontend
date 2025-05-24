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
		<div>
			<div className="mx-auto px-10 bg-white">
				<div className="flex justify-between m-5 items-center">
					<h1 className="font-bold text-xl md:text-4xl">
						New <span className="text-yellow-800">Product</span>
					</h1>
					<Link to="/all-product">Explore</Link>
				</div>

				{isloading && (
					<div className="flex justify-center items-center">
						<span className="loading loading-spinner loading-lg text-center m-5 "></span>
					</div>
				)}

				{error && <ErrorAlert errormessage={'Product Load Failed!'} />}

				{!isloading && !error && product.length > 0 && (
					<Swiper
						modules={[Autoplay, Pagination, Navigation]}
						spaceBetween={30}
						centeredSlides={false}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						pagination={false}
						navigation={false}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
					>
						{product.map((product) => (
							<SwiperSlide
								key={product.id}
								className="flex justify-center"
							>
								<ProductItem product={product} />
							</SwiperSlide>
						))}
					</Swiper>
				)}

				{!isloading && !error && product.length === 0 && (
					<p className="text-center text-gray-500 font-bold ">
						Product Not Available
					</p>
				)}
			</div>

			<div className="mx-auto px-10 bg-white">
				<div className="flex justify-between px-5 md:px-5 items-center">
					<h1 className="font-bold text-xl md:text-4xl mt-5">
						Top <span className="text-yellow-800">Selling</span>
					</h1>
					<Link to="/all-product">Explore</Link>
				</div>
				<div className="mt-5 mb-5">
					{!isloading && !error && fashionProduct.length > 0 && (
						<Swiper
							modules={[Autoplay, Pagination, Navigation]}
							spaceBetween={30}
							centeredSlides={false}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							pagination={false}
							navigation={false}
							slidesPerView={1}
							breakpoints={{
								640: { slidesPerView: 2 },
								1024: { slidesPerView: 3 },
							}}
						>
							{fashionProduct.map((product) => (
								<SwiperSlide
									key={product.id}
									className="flex"
								>
									<ProductItem product={product} />
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>		

		</div>
	)
}

export default Product
