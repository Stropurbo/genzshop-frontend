import { useEffect, useMemo, useState } from 'react'
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

	const deleteReview = async (productId, reviewId) => {
		try {
			await AuthApiClient.delete(`/products/${productId}/review/${reviewId}/`)
			setProduct((prev) =>
				prev.map((p) =>
					p.id === productId
						? { ...p, reviews: p.reviews.filter((r) => r.id !== reviewId) }
						: p,
				),
			)
		} catch (error) {
			console.log(error)
		}
	}

	const totalReviewCount = useMemo(() => {
		return product.reduce((total, p) => total + p.reviews.length, 0)
	}, [product])

	if (isloading) return <p className="text-center">Loading...</p>

	return (
		<div className="max-w-4xl mx-auto px-4 py-6">
			<h1 className="text-3xl font-bold mb-6 text-center">Product Reviews</h1>

			<p className="text-center text-gray-600 mb-6">
				Total Reviews:{' '}
				<span className="font-semibold text-indigo-600">{totalReviewCount}</span>
			</p>

			{product
				.filter((p) => p.reviews.length > 0)
				.map((product) => (
					<div
						key={product.id}
						className="mb-6 p-6 rounded-lg shadow-md border bg-white"
					>
						<div className="flex justify-between">
							<h2 className="text-2xl font-semibold mb-4 text-gray-800">
								{product.name}
							</h2>
						</div>

						{product.reviews.length === 0 ? (
							<p className="text-gray-500 italic">No reviews available</p>
						) : (
							<ul className="space-y-4">
								{product.reviews.map((review) => (
									<li
										key={review.id}
										className="p-4 bg-gray-50 rounded-md shadow-sm flex justify-between items-center"
									>
										<div>
											<p className="text-gray-700">{review.comment}</p>
											<p className="text-gray-600 text-sm">
												{review.ratings}★
											</p>
										</div>
										<button
											onClick={() => deleteReview(product.id, review.id)}
											className="bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1 rounded"
										>
											Delete
										</button>
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
