import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthApiClient from '../services/auth-api-client'

const AddCategory = () => {
	const { register, handleSubmit, reset } = useForm()
	const [category, setcategory] = useState([])
	const [isloading, setloading] = useState(false)
	const [images, setImages] = useState([])

	useEffect(
		() => async () => {
			setloading(true)
			try {
				const res = await AuthApiClient.get('/category/')
				setcategory(res.data.results)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
			setloading(false)
		},
		[],
	)

	const handleImageChange = (event) => {
		const files = Array.from(event.target.files)
		setImages(files)
	}

	const handleCategoryAdd = async (data) => {
		setloading(true)
		if (!images.length) {
			alert('Please Select image')
			setloading(false)
			return
		}
		
		try {
			const formdata = new FormData()
			formdata.append('name', data.name)
			formdata.append('description', data.description)
			formdata.append('image', images[0])

			await AuthApiClient.post('/category/', formdata)
			alert('Category with image Added Success.')
			reset()
			setImages([])

		} catch (errors) {
			console.log('Product add error:', errors.response?.data || errors.message)
		} finally {
			setloading(false)
		}
	}

	return (
		<div>
			{category ? (
				<form
					onSubmit={handleSubmit(handleCategoryAdd)}
					action=""
				>
					<div className="">
						<h3 className="text-lg font-medium mb-2">Upload Category Images</h3>
						<input
							type="file"
							accept="image/*"
							className="file-input file-input-bordered"
							onChange={handleImageChange}
						/>

						<label className="block text-sm font-medium">Category Name</label>
						<input
							{...register('name', { required: true })}
							className="input input-bordered p-2 m-2"
							placeholder="Category Name"
						/>

						<label className="block text-sm font-medium">
							Category Description
						</label>
						<input
							{...register('description')}
							className="input input-bordered p-2 m-2"
							placeholder="Category Name"
						/>
					</div>

					<button
						type="submit"
						className="btn btn-warning ml-2 "
						disabled={isloading}
					>
						{isloading ? 'Adding...' : 'Add Category'}
					</button>
				</form>
			) : null}
		</div>
	)
}

export default AddCategory
