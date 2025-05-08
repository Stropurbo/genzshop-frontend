import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import AuthApiClient from '../services/auth-api-client'

const AddCategory = () => {
	const { register, handleSubmit } = useForm()
	const [category, setcategory] = useState([])
	const [isloading, setloading] = useState(false)

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

	const handleCategoryAdd = async (data) => {
		setloading(true)
		try {			
			const res =  await AuthApiClient.post('/category/', data)			
			console.log(res)
			alert("Category Added Success.")
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
							{...register('description' )}
							className="input input-bordered p-2 m-2"
							placeholder="Category Name"
						/>
					</div>

					<button
						type="submit"
						className="btn btn-primary "
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
