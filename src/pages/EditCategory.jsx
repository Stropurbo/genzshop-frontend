import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthApiClient from '../services/auth-api-client'
import { useNavigate, useParams } from 'react-router'

const EditCategory = () => {
	const { id } = useParams()
	const { handleSubmit, register, reset } = useForm()
	const [isloading, setloading] = useState(false)
	const [category, setcategory] = useState(null)
	const [image, setImage] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCategory = async () => {
			setloading(true)
			try {
				const res = await AuthApiClient.get(`/category/${id}/`)
				setcategory(res.data)

				reset({
					name: res.data.name,
					description: res.data.description,
				})
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
			setloading(false)
		}
		fetchCategory()
	}, [id, reset])

	const handleImageChange = (e) => {
		setImage(Array.from(e.target.files))
	}

	const onSubmit = async (data) => {
		const formdata = new FormData()

		for (let key in data) {
			formdata.append(key, data[key])
		}

		if (image && image.length > 0) {
			image.forEach((img) => formdata.append('image', img))
		}

		try {
			await AuthApiClient.put(`/category/${id}/`, formdata)
			alert('Product Update Successfull')
			navigate('/dashboard')
		} catch (error) {
			console.log(error)
		}
	}

	if (!category) return <p className="text-center mt-10">Loading...</p>

	return (
		<div className="p-5 flex justify-center">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="">
					<h1 className="flex justify-center font-bold text-2xl text-yellow-500">Update Category</h1>

					{category.image && (
						<div className="mt-4 flex justify-center">
							<img
								src={category.image}
								alt="Category"
								className="w-full h-20 md:w-20 rounded"
							/>
						</div>
					)}

					<h3 className="text-lg font-medium mb-2 pt-5">Upload Category Images</h3>
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

					<label className="block text-sm font-medium">Category Description</label>
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
					{isloading ? 'Adding...' : 'Update Category'}
				</button>
			</form>
		</div>
	)
}
export default EditCategory
