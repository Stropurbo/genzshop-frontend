import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import { useNavigate } from 'react-router'

const ShowCategory = () => {
	const [category, setcategory] = useState([])
	const [isloading, setloading] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await AuthApiClient.get('/category/')
				setcategory(res.data.results)
			} catch (error) {
				console.error('Failed to fetch categories:', error)
			}
		}

		fetchCategories()
	}, [])

	const EditCategory = (id) => {
		navigate(`/edit-category/${id}`)
	}

	const deleteProduct = async (id) => {
		setloading(true)
		try {
			await AuthApiClient.delete(`/category/${id}/`)
			setcategory((data) => data.filter((category) => category.id !== id))
			alert('Product delete successfull')
		} catch (error) {
			console.error(error)
			alert('Failed to delete the product.')
		} finally {
			setloading(false)
		}
	}

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table table-xs">
					<thead className="p-2">
						<tr>
							<th>NO.</th>
							<th>Category</th>
							<th>ID</th>
							<th>Action</th>
						</tr>
					</thead>
					{category.length === 0 ? (
						<div className="fixed inset-0 flex items-center justify-center bg-white/60 z-50">
							<span className="loading loading-spinner loading-lg text-yellow-500"></span>
						</div>
					) : (
						category.map((cat, index) => (
							<tbody key={cat.id}>
								<tr>
									<th>{index + 1}</th>
									<td>{cat.name}</td>
									<td>{cat.id}</td>
									<td>
										<button
											onClick={() => EditCategory(cat.id)}
											className="btn btn-warning text-black m-1"
										>
											Edit
										</button>
										<button
											onClick={() => deleteProduct(cat.id)}
											className="btn btn-error text-white m-1"
											disabled={isloading}
										>
											Delete
										</button>
									</td>
								</tr>
							</tbody>
						))
					)}
				</table>
			</div>
		</div>
	)
}

export default ShowCategory
