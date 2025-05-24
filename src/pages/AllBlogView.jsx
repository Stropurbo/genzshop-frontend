import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import default_image from '../assets/default_product.jpg'
import { Link } from 'react-router'

const AllBlogView = () => {
	const [myblog, setBlog] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		apiClient
			.get('/blogs')
			.then((res) => setBlog(res.data.results))
			.finally(() => setLoading(false))
	}, [])

	{
		loading && <div>Loading</div>
	}

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 py-10'>
			{myblog.map((news) => (
				<a
					href={`/blog/${news.id}`}
					className="card bg-base-100 w-96 shadow-sm py-2 border border-gray-200 group"
				>
					<figure>
						<img
							src={news.image || default_image}
							alt={news.name}
							className="rounded-xl h-56 w-72 mt-5 transform transition-transform duration-300 ease-in-out group-hover:scale-105"
						/>
					</figure>
					<div className="card-body">
						<p className='text-gray-500'>
							{new Date(news.created_at).toLocaleDateString('en-GB', {
								month: 'long',
								day: '2-digit',
								year: 'numeric',
							})}
						</p>

						<h2 className="card-title line-clamp-1 text-start p-2">{news.name}</h2>
						<p className="line-clamp-2 text-start mb-2 ml-2">{news.description}</p>
						<div className="card-actions justify-start">
							<button className="btn btn-warning text-black p-2 ml-2">
								Read More
							</button>
						</div>
					</div>
				</a>
			))}
		</div>
	)
}
export default AllBlogView
