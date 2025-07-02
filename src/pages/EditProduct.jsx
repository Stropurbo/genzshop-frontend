import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import AuthApiClient from '../services/auth-api-client'
import { useForm } from 'react-hook-form'

const EditProduct = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [image, setImage] = useState(null)
	const [product, setProduct] = useState(null)
	const [category, setCategory] = useState(null)
	const [loading, setLoading] = useState(false)
	const [previewImages, setPreviewImages] = useState([])

	const { register, handleSubmit, reset } = useForm()

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files)
		setImage(files)

		const previews = files.map((file) => URL.createObjectURL(file))
		setPreviewImages(previews)
	}

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await AuthApiClient.get(`/products/${id}/`)
				setProduct(res.data)

				const cat = await AuthApiClient.get('/category')
				setCategory(cat.data.results)
				
				reset({
					name: res.data.name,
					description: res.data.description,
					price: res.data.price,
					discount: res.data.discount,
					stock: res.data.stock,
					category: res.data.category,
				})
			} catch (error) {
				console.log(error)
			}
		}
		fetchProduct()
	}, [id, reset])

	const onSubmit = async (data) => {
		setLoading(true)
		const formData = new FormData()

		formData.append('name', data.name)
		formData.append('description', data.description)
		formData.append('price', parseFloat(data.price))
		formData.append('stock', parseInt(data.stock))
		formData.append('category', parseInt(data.category))
		const discountValue = parseFloat(data.discount)

		if (!isNaN(discountValue)) {
			formData.append('discount', discountValue)
		}

		if (image && image.length > 0) {
			image.forEach((img) => formData.append('images', img))
		}

		try {
			await AuthApiClient.put(`/products/${id}/`, formData)
			alert('Product Update Successfull')
			navigate('/dashboard')
		} catch (error) {
			console.error('❌ Error Response:', error.response?.data)
			alert('Update failed. Check console for details.')
		} finally {
			setLoading(false)
		}
	}

	if (!product) return <p className="text-center mt-10">Loading...</p>

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
			<h2 className="text-2xl font-semibold mb-4">Edit Product</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="space-y-4"
			>
				{/* Existing image */}
				{product.images.length > 0 && (
					<div className="grid grid-cols-2 gap-4">
						{product.images.map((img) => (
							<img
								key={img.id}
								src={img.image}
								alt="Product"
								className="w-full h-32 object-contain rounded border border-yellow-500"
							/>
						))}
					</div>
				)}

				{/* upload new images         */}
				<input
					type="file"
					multiple
					accept="image/*"
					className="file-input file-input-bordered w-full"
					onChange={handleImageChange}
				/>

				{previewImages.length > 0 && (
					<div className="grid grid-cols-2 gap-4 mt-4">
						{previewImages.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={`Preview ${index}`}
								className="w-full h-32 object-contain rounded border border-yellow-500"
							/>
						))}
					</div>
				)}

				<div>
					<label className="block text-sm font-medium">Product Name</label>
					<input
						{...register('name', { required: true })}
						className="input input-bordered w-full"
						placeholder="Product Name"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium">Description</label>
					<textarea
						{...register('description', { required: true })}
						className="textarea textarea-bordered w-full"
						placeholder="Description"
					></textarea>
				</div>

				<div>
					<label className="block text-sm font-medium">Price</label>
					<input
						type="number"
						{...register('price', {
							required: 'This Field is required',
							validate: (value) => {
								const parsedValue = parseFloat(value)
								return !isNaN(parsedValue) || 'Please enter a valid number!'
							},
						})}
						className="input input-bordered w-full"
						placeholder="Price"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium">Discount</label>
					<input
						type="number"
						{...register('discount')}
						className="input input-bordered w-full"
						placeholder="Discount Price"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium">Stock Quantity</label>
					<input
						type="number"
						{...register('stock', { required: true })}
						className="input input-bordered w-full"
						placeholder="Stock"
					/>
				</div>

				{/* Dropdown for categories */}
				<div>
					<label className="block text-sm font-medium">Category</label>
					<select
						{...register('category', { required: true })}
						defaultValue={product.category}
						className="select select-bordered w-full"
					>
						<option value="">Select a category</option>
						{category &&
							category.map((cat) => (
								<option
									key={cat.id}
									value={cat.id}
								>
									{cat.name}
								</option>
							))}
					</select>
				</div>

				<button
					type="submit"
					className="btn btn-primary w-full"
					disabled={loading}
				>
					{loading ? 'Updating...' : 'Update Product'}
				</button>
			</form>
		</div>
	)
}
export default EditProduct
