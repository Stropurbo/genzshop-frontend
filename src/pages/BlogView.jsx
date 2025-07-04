import { useEffect, useState } from 'react'
import defaultImage from '../assets/default_product.jpg'
import apiClient from '../services/api-client'
import { Link, useParams } from 'react-router'

const BlogView = () => {
	const [myblog, setblog] = useState([])
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		apiClient.get(`/blogs/${id}`).then((res) => {
			setblog(res.data)
			console.log(res.data)
			setLoading(false)
		})
	}, [id])

	if (loading)
		return (
			<div className="flex justify-center items-center py-7">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		)
	if (!myblog) return <div>Blog Not Found...</div>

	return (
		<div className="max-w-5xl mx-auto px-4 py-10">
			<div className="bg-white border-gray-200 rounded-xl overflow-hidden">
				{/* Blog Image */}
				<img
					src={myblog.image || defaultImage}
					alt={myblog.name}
					className="w-full h-[400px] object-center rounded-lg"
				/>

				{/* Blog Content */}
				<div className="pt-5">
					{/* Date */}
					<div className="flex justify-between items-center">
						<p className="text-sm text-gray-500 mb-2">
							{new Date(myblog.created_at).toLocaleDateString('en-GB', {
								month: 'long',
								day: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								hour12: true,
							})}
						</p>
						<Link
							to="/all-news"
							className="text-gray-500"
						>
							Blog List
						</Link>
					</div>

					{/* Title */}
					<h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-6">
						{myblog.name}
					</h1>

					{/* Description */}
					<div className="prose prose-lg max-w-none text-gray-800">
						{myblog.description ? (
							myblog.description
								.split('\n')
								.map((line, i) =>
									line.trim() ? (
										<p key={i}>{line}</p>
									) : (
										<br key={`br-${i}`} />
									),
								)
						) : (
							<p>No description available.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BlogView
