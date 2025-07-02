import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import { useParams, Link } from 'react-router'
import defaultImage from '../assets/default_product.jpg'

const SuggestProduct = () => {
	const { id } = useParams()
	const [suggested, setSuggested] = useState([])
	const [loading, setLoading] = useState(false)
	// const [categoryName, setCategoryName] = useState('')

	useEffect(() => {
		const fetchSuggestedProducts = async () => {
			setLoading(true)
			try {
				const productRes = await apiClient.get(`/products/${id}`)
				const product = productRes.data
				const categoryId = product?.category_details?.id

				if (categoryId) {
					// setCategoryName(product.category_details.name)

					const res = await apiClient.get(`/products/?category=${categoryId}`)
					const filtered = res.data.results.filter((p) => p.id !== product.id)
					setSuggested(filtered.slice(0, 4))
				}
			} catch (err) {
				console.error('Failed to fetch suggested products:', err)
			} finally {
				setLoading(false)
			}
		}

		fetchSuggestedProducts()
	}, [id])

    

	return (
		<div className="mt-12">
			<h2 className="text-xl font-bold mb-4">You may also like</h2>
			{/* {categoryName || 'this category'} */}
			{loading && (
				<div className="flex justify-center items-center py-8">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			)}

			{!loading && suggested.length > 0 && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
					{suggested.map((item) => (
						<Link
							to={`/shop/${item.id}`}
							key={item.id}
							className="card shadow-md p-4 rounded hover:shadow-lg hover:border border-yellow-500"
						>
							<img
								src={item.images?.[0]?.image || defaultImage}
								alt={item.name}
								className="w-full h-40 object-center mb-2"
							/>
							<h3 className="text-md font-semibold line-clamp-1">{item.name}</h3>
							<p className="text-sm text-orange-500">${item.price}</p>
							
						</Link>
					))}
				</div>
			)}
			
		</div>
	)
}

export default SuggestProduct
