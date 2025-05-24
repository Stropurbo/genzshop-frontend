const ProductReview = ({ reviews }) => {
	return (
		<div className="mt-10">
			{reviews.length > 0 &&
				(() => {
					const totalRatings = reviews.reduce(
						(sum, review) => sum + review.ratings,
						0,
					)
					const avgRating = totalRatings / reviews.length
					const filledStars = '★'.repeat(Math.round(avgRating))
					const emptyStars = '☆'.repeat(5 - Math.round(avgRating))

					return (
						<div className="flex items-center mb-2">
							<span className="text-yellow-500 text-xl">{filledStars}</span>
							<span className="text-gray-400 text-sm">{emptyStars}</span>
							<span className="text-gray-600 text-sm ml-2">
								({reviews.length} Ratings)
							</span>
						</div>
					)
				})()}
		</div>
	)
}

export default ProductReview
