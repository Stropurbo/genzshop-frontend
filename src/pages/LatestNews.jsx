import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import BlogItem from './BlogItem'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Link, useNavigate } from 'react-router'
import CategoryItem from '../components/Home/category/CategoryItem'

const LatestNews = () => {
	const [blog, setblog] = useState([])
	const [category, setCategory] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		apiClient
			.get('/blogs')
			.then((res) => setblog(res.data.results))
			.finally(() => setLoading(false))
	}, [])

	useEffect(() => {
		setLoading(true)
		apiClient
			.get('/category')
			.then((res) => setCategory(res.data.results))
			.finally(() => setLoading(false))
	}, [])

	const navigate = useNavigate()

	const handleClick = (cat) => {
		navigate(`/shop/category/${cat.id}`)
	}

	return (
		<div className="w-full px-10 mt-10 mb-10 justify-around items-center">
			<div className="flex justify-between items-center">
				<h1 className="text-2xl font-bold mb-10">
					Latest <span className="text-yellow-500">News</span>
				</h1>

				<Link to={'/all-news'}>Explore</Link>
			</div>
			{!loading && blog.length > 0 && (
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					spaceBetween={30}
					centeredSlides={false}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					slidesPerView={1}
					freeMode={true}
					pagination={false}
					navigation={false}
					breakpoints={{
						320: { slidesPerView: 1 },
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 4 },
						1280: { slidesPerView: 5 },
					}}
					className="py-5"
				>
					{blog.map((blog, index) => (
						<SwiperSlide
							key={blog.id}
							className="!w-auto"
						>
							<BlogItem
								index={index}
								blog={blog}
							/>
						</SwiperSlide>
					))}
				</Swiper>
			)}

			<div
				className="max-w-[calc(100%-5rem)] mt-10 mx-auto flex flex-col justify-center items-center h-[200px] bg-cover"
				style={{
					backgroundImage: `url('https://i.ibb.co/bgRyS6bC/Black-Orange-Modern-Indian-Food-Banner.png')`,
				}}
			>
				<h1 className="text-white text-2xl font-semibold">Subscribe For Join Us!</h1>
				<p className="text-white">Get in Touch and Get the Future Updates</p>
				<div className="join p-2">
					<div>
						<label className="input validator join-item">
							<svg
								className="h-[1em] opacity-50"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
							>
								<g
									strokeLinejoin="round"
									strokeLinecap="round"
									strokeWidth="2.5"
									fill="none"
									stroke="currentColor"
								>
									<rect
										width="20"
										height="16"
										x="2"
										y="4"
										rx="2"
									></rect>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
								</g>
							</svg>
							<input
								type="email"
								placeholder="mail@site.com"
								required
							/>
						</label>
						<div className="validator-hint hidden">Enter valid email address</div>
					</div>
					<button className="btn btn-warning join-item">Join</button>
				</div>
			</div>

			<div>
				<div className="w-full px-10 mt-10 justify-around items-center">
					{!loading && category.length > 0 && (
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
							allowTouchMove={true}
							breakpoints={{
								320: { slidesPerView: 1 },
								640: { slidesPerView: 2 },
								1024: { slidesPerView: 4 },
								1280: { slidesPerView: 5 },
							}}
							className="py-5"
						>
							{[...category, ...category].map((cat, index) => (
								<SwiperSlide
									key={index}
									className="!w-auto"
								>
									<a
										onClick={() => handleClick(cat)}
										className="w-full flex justify-center flex-col items-center md:w-40 h-28
												 px-2 m-2 bg-white border border-gray-200 rounded-lg p-5"
									>
										<img
											src={cat.image}
											alt={cat.name}
											className="rounded-xl h-16 w-16"
										/>
									</a>
								</SwiperSlide>
							))}
						</Swiper>
					)}
				</div>
			</div>
		</div>
	)
}
export default LatestNews
