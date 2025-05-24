import { useEffect, useState } from 'react'
import defaultImage from '../assets/default_product.jpg'
import apiClient from '../services/api-client'
import { useParams } from 'react-router'

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
		<div className="card bg-base-100 w-full shadow-sm py-2 border border-gray-200">
			<figure>
				<img
					src={myblog.image || defaultImage}
					alt={myblog.name}
					className="rounded-xl h-96 mt-5"
				/>
			</figure>
			<div className="card-body">
				<p className="text-gray-500">
					{new Date(myblog.created_at).toLocaleDateString('en-GB', {
						month: 'long',
						day: '2-digit',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						hour12: true,						
					})}
				</p>
				<h2 className="card-title line-clamp-1 text-2xl text-start p-2">
					{myblog.name}
				</h2>
				<p className="text-start mb-2 ml-2">{myblog.description}</p>
			</div>
		</div>
	)
}

export default BlogView
