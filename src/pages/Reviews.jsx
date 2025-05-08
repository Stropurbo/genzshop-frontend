import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'

const Reviews = () => {
	const [product, setProduct] = useState([])
	const [isloading, setloading] = useState(false)

	useEffect(() => {
		const fetchProductReviews = async () => {
			setloading(true)
			try {
				const res = await AuthApiClient.get(`/products/`)
				const productList = res.data.results

				const onlyReviewProduct = await Promise.all(
					productList.map(async (product) => {
						try {
							const reviewRes = await AuthApiClient.get(
								`/products/${product.id}/review`,
							)
							return { ...product, reviews: reviewRes.data.results }
						} catch {
							return { ...product, reviews: [] }
						}
					}),
				)

				setProduct(onlyReviewProduct)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			} finally {
				setloading(false)
			}
		}

		fetchProductReviews()
	}, [])


	if (isloading) return <p className="text-center">Loading...</p>

	return (
		<div className="max-w-4xl mx-auto">
			{product.map((product) => (
				<div
					key={product.id}
					className="mb-2 p-4 rounded-lg shadow"
				>
					<h2 className="text-xl font-bold mb-2">{product.name}</h2>
					{product.reviews.length === 0 ? (
						<p className="text-gray-500">No reviews</p>
					) : (
						<ul>
							{product.reviews.map((review) => (
								<li
									key={review.id}
									className="mb-2 flex justify-between items-center"
								>
									<span>{review.comment}</span>
									
								</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	)
}

export default Reviews
