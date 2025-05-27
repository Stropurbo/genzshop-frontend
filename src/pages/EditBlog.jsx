import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import apiClient from '../services/api-client'
import defaultImage from '../assets/default_product.jpg'
import AuthApiClient from '../services/auth-api-client'

const EditBlog = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [image, setImage] = useState(null)
	const [blog, setBlog] = useState(null)

	const handleImageChange = (event) => {
		const file = event.target.files[0]
		setImage(file)
	}

	useEffect(() => {
		const fetchBlog = async () => {
			try {
				const res = await apiClient.get(`/blogs/${id}`)
				setBlog(res.data)
			} catch (error) {
				console.error(error)
			}
		}
		fetchBlog()
	}, [id])

	const handleChange = (e) => {
		const { name, value } = e.target
		setBlog((pre) => ({
			...pre,
			[name]: value,
		}))
	}

	const handleSubmitNews = async (e) => {
		e.preventDefault()
		console.log('Submit clicked')
		try {
			const formdata = new FormData()
			if (image) {
				formdata.append('image', image)
			}
			formdata.append('name', blog.name)
			formdata.append('description', blog.description)

			await AuthApiClient.put(`/blogs/${id}`, formdata)
			alert('News Update Success')
			navigate('/dashboard/')
		} catch (error) {
			console.log(error)
		}
	}

	if (!blog) return <p>Loading....</p>

	return (
		<div className="flex flex-col h-full p-4 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Edit Blog Post</h1>

			<form
				onSubmit={handleSubmitNews}
				encType="multipart/form-data"
			>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col items-center">
						<img
							src={blog.image || defaultImage}
							alt="Blog preview"
							className="h-48 w-full object-cover rounded-lg mb-4"
						/>

						<label className="w-full">
							<span className="block mb-2 font-medium">Change Image</span>
							<input
								type="file"
								accept="image/*"
								className="file-input file-input-bordered w-full"
								onChange={handleImageChange}
							/>
						</label>
					</div>

					<label className="block">
						<span className="block mb-2 font-medium">Title</span>
						<input
							name="name"
							value={blog?.name}
							onChange={handleChange}
							className="input input-bordered w-full"
						/>
					</label>

					<label className="block">
						<span className="block mb-2 font-medium">Content</span>
						<textarea
							name="description"
							value={blog?.description}
							className="textarea textarea-bordered w-full h-64"
							onChange={handleChange}
						/>
					</label>

					<button
						type="submit"
						className="btn btn-primary mt-4"
					>
						Update Blog
					</button>
				</div>
			</form>
		</div>
	)
}
export default EditBlog
