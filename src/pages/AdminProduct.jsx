import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'

const AdminProduct = () => {
	const [product, setProdcut] = useState([])
	const [isloading, setloading] = useState(false)

	useEffect(() => {
		const fetchAllProducts = async () => {
			let url = '/products/'
			let allProducts = []

			while (url) {
				try {
					const res = await AuthApiClient.get(url)
					allProducts = [...allProducts, ...res.data.results]
					url = res.data.next 
				} catch (error) {
					console.error('Failed to fetch products:', error)
					break
				}
			}

			setProdcut(allProducts)
		}

		fetchAllProducts()
	}, [])
	


	const deleteProduct = async (id) => {
		setloading(true)
		try {
			await AuthApiClient.delete(`/products/${id}/`)
			alert('Product delete successfull')
			setProdcut((data) => data.filter((product) => product.id !== id))
		} catch (error) {
			console.error('Failed to delete product:', error)
			alert('Failed to delete the product.')
		} finally {
			setloading(false)
		}
	}

	return (
		<div className="min-h-screen p-4 overflow-auto">
			<div className="overflow-x-auto">
				<table className="table table-xs">
					<thead className="p-2">
						<tr>
							<th>NO.</th>
							<th>Product Name</th>
							<th>Category</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					{product.length === 0 ? (
						<p className="flex justify-center items-center">
							<span className="loading loading-spinner loading-lg"></span>
						</p>
					) : (
						product.map((product, index) => (
							<tbody key={product.id}>
								<tr>
									<th>{index + 1}</th>
									<td>{product.name}</td>
									<td>{product.category_details.name}</td>
									<td>{product.price}</td>
									<td>
										<button
											onClick={() => deleteProduct(product.id)}
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
export default AdminProduct
