import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import AuthApiClient from '../services/auth-api-client'
import { useNavigate } from 'react-router'

const ViewBlog = () => {
	const [blog, setblog] = useState([])
	const [isloading, setloading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchBlogs = async () => {
			setloading(true)
			try {
				const res = await apiClient.get('/blogs')
				setblog(res.data.results)
				console.log(res.data)
			} catch (error) {
				console.log(error)
			} finally {
				setloading(false)
			}
		}
		fetchBlogs()
	}, [])

	const deleteBlog = async (id) => {
		if (!window.confirm('You want to delete this blog?')) return
		setloading(true)
		try {
			await AuthApiClient.delete(`/blogs/${id}/`)
			alert('Product delete successfull')
			setblog((data) => data.filter((blog) => blog.id !== id))
		} catch (error) {
			console.error(error)
			alert('Failed to delete the product.')
		} finally {
			setloading(false)
		}
	}

	const handleEdit = (id) => {
		navigate(`/edit-blog/${id}`)
	}

	return (
		<div className="min-h-screen p-4 overflow-auto">
			<div className="overflow-x-auto">
				{isloading ? (
					<div className="flex justify-center items-center p-4">
						<span className="loading loading-spinner loading-lg"></span>
					</div>
				) : (
					<table className="table table-xs">
						<thead className="p-2">
							<tr>
								<th>NO.</th>
								<th>Blog Name</th>
							</tr>
						</thead>
						<tbody>
							{blog.map((blogs, index) => (
								<tr key={blogs.id}>
									<th className="text-lg">{index + 1}</th>
									<td className="text-lg">{blogs.name}</td>
									<td className="flex gap-2">
										<button
											onClick={() => handleEdit(blogs.id)}
											className="btn btn-warning text-black"
										>
											Edit
										</button>
										<button
											onClick={() => deleteBlog(blogs.id)}
											className="btn btn-error text-white"
											disabled={isloading}
										>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	)
}
export default ViewBlog
