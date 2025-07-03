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
		<div className="w-full max-w-screen px-4 sm:px-6 md:px-10 mt-10 mb-10 space-y-10">
			<div className="flex flex-col sm:flex-row justify-between items-center gap-3">
				<h1 className="text-2xl font-bold text-center sm:text-left">
					Latest News
				</h1>
				<Link
					to="/all-news"
					className="text-sm sm:text-base text-blue-600 hover:underline"
				>
					Explore
				</Link>
			</div>

			{!loading && blog.length > 0 && (
				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					spaceBetween={10}
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
						640: { slidesPerView: 2 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
						1536: { slidesPerView: 5 },
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

			{/* Subscribe Section */}
			<div
				className="w-full mx-auto flex flex-col justify-center items-center bg-cover bg-center text-center px-4 py-10 rounded-xl"
				style={{
					backgroundImage: `url('https://i.ibb.co/bgRyS6bC/Black-Orange-Modern-Indian-Food-Banner.png')`,
				}}
			>
				<h1 className="text-white text-xl sm:text-2xl font-semibold mb-1">
					Subscribe For Join Us!
				</h1>
				<p className="text-white text-sm sm:text-base mb-4">
					Get in Touch and Get the Future Updates
				</p>

				<div className="join flex flex-col sm:flex-row items-center gap-3">
					<label className="input validator join-item flex items-center gap-2 px-3 py-2 rounded-md bg-white text-black">
						<svg
							className="h-5 w-5 opacity-50"
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
							className="bg-transparent outline-none w-full"
							required
						/>
					</label>
					<button className="btn btn-warning join-item w-full sm:w-auto">Join</button>
				</div>
			</div>

			{/* Category Swiper */}
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
						320: { slidesPerView: 2 },
						640: { slidesPerView: 3 },
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
								className="flex flex-col items-center justify-center px-2 m-2 bg-white border border-gray-200 rounded-lg p-4 w-28 sm:w-32 md:w-36"
							>
								<img
									src={cat.image}
									alt={cat.name}
									className="rounded-xl h-14 w-14 object-contain"
								/>
								<p className="mt-2 text-sm font-medium text-center">
									{cat.name}
								</p>
							</a>
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	)
}
export default LatestNews
