import { useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthApiClient from '../services/auth-api-client'

const AddBlog = () => {
    
	const {reset, register, handleSubmit } = useForm()
	const [isloading, setloading] = useState(false)
	const [image, setImages] = useState([])

	const handleImageChange = (event) => {
		const files = Array.from(event.target.files)		
		setImages(files)
	}

	const handleBlogAdd = async (data) => {
		setloading(true)
		try {
			const formdata = new FormData()
			formdata.append('name', data.name)
			formdata.append('description', data.description)
			formdata.append('image', image[0])

			const res = await AuthApiClient.post('/blogs/', formdata)
			console.log(res.data.results)

			alert('Blog Post Success')
			reset()
			setImages([])
		} catch (error) {
			console.error('Full error:', error)
			alert('Blog Post Failed')
		} finally {
			setloading(false)
		}
	}

	if (isloading)
		return (
			<div className="flex justify-center items-center py-7">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		)
	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">Add Blog</h2>

			<form
				onSubmit={handleSubmit(handleBlogAdd)}
				className="space-y-4"
			>
				<div>
					<label className="block text-sm font-medium">Blog Name</label>
					<input
						{...register('name', { required: true })}
						className="input input-bordered w-full"
						placeholder="Blog Name"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium">Description</label>
					<textarea
						{...register('description', { required: true })}
						className="textarea textarea-bordered w-full h-auto"
						placeholder="Description"
						required
					></textarea>
				</div>

				<div>
					<h3 className="text-lg font-medium mb-2">Upload Blog Images</h3>
					<input
						type="file"
						accept="image/*"
						className="file-input file-input-bordered w-full"
						onChange={handleImageChange}
						required
					/>
				</div>

				<button
					type="submit"
					className="btn btn-primary w-full"
				>
					{isloading ? 'Adding...' : 'Add Blog'}
				</button>
			</form>
		</div>
	)
}
export default AddBlog
