import { useParams } from 'react-router'
import ReviewForm from './ReviewForm'
import AuthApiClient from '../../services/auth-api-client'
import { useEffect, useState } from 'react'
import ReviewList from './ReviewList'
import apiClient from '../../services/api-client'
import useAuthContext from '../../hooks/useAuthContext'

const ReviewSection = () => {
	const { id } = useParams()
	const [userReview, setUserReview] = useState(false)
	const [reviews, setReviews] = useState([])
	const [isLoading, setLoading] = useState(true)
	const { user } = useAuthContext()
	const [editReview, setEditReview] = useState({ rating: 0, comment: '' })
	const [editId, setEditId] = useState(null)

	const fetchReview = async () => {
		setLoading(true)
		try {
			const res = await apiClient.get(`/products/${id}/review/`)
			setReviews(res.data.results)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const onSubmit = async (data) => {
		try {
			await AuthApiClient.post(`/products/${id}/review/`, data)
			fetchReview()
		} catch (error) {
			console.log(error)
		}
	}

	const checkUserPermission = async () => {
		try {
			const res = await AuthApiClient.get(`/has_order/${id}/`)
			setUserReview(true)
			setUserReview(res.data.hasOrder)
		} catch (error) {
			console.log(error)
		}
	}

	const handleUpdateReview = async (reviewId) => {
		try {
			await AuthApiClient.put(`/products/${id}/review/${reviewId}/`, editReview)
			setEditId(null)
			await fetchReview()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteReview = async (reviewId) => {
		try {
			await AuthApiClient.delete(`/products/${id}/review/${reviewId}/`)
			fetchReview()
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		checkUserPermission()
		fetchReview()
	}, [])

	return (
		<div className="space-y-8 mt-10 max-w-5xl mx-auto px-4">
			<div className="flex items-center justify-between">
				<h2 className="text-2xl font-bold">Customer Reviews</h2>
				<div className="badge badge-lg">
					{reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
				</div>
			</div>

			{userReview && (
				<div className="card bg-base-100 shadow-lg border border-base-200 rounded-xl overflow-hidden">
					<div className="card-body">
						<h3 className="card-title text-lg">Write a Review</h3>
						<ReviewForm onSubmit={onSubmit} />
					</div>
				</div>
			)}

			<div className="divider">
				
			</div>

			{isLoading ? (
				<div className="flex justify-center py-8">
					<span className="loading loading-spinner loading-lg text-primary"></span>
				</div>
			) : reviews.length === 0 ? (
				<div className="text-center py-8">
					<div className="text-5xl mb-4">📝</div>
					<h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
					<p className="text-base-content/70">Be the first to review this product!</p>
				</div>
			) : (
				<ReviewList
					reviews={reviews}
					user={user}
					editReview={editReview}
					setEditReview={setEditReview}
					editId={editId}
					setEditId={setEditId}
					handleUpdateReview={handleUpdateReview}
					handleDeleteReview={handleDeleteReview}
				/>
			)}
		</div>
	)
}

export default ReviewSection
