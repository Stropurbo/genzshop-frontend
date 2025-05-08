import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import AuthApiClient from '../services/auth-api-client'  

const CheckoutForm = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		address: '',
		phone: '',
	})
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const handleChange = (eee) => {
		setFormData({
			...formData,
			[eee.target.name]: eee.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault() 
		setLoading(true)

		const cartId = localStorage.getItem('cartId')
		if (!cartId) {
			alert('No cart found. Please add items to your cart.')
			setLoading(false)
			return
		}

		const payload = {
			cart_id: cartId,
			full_name: formData.fullName,
			address: formData.address,
			phone: formData.phone,
		}

		try {
			const res = await AuthApiClient.post('/orders/', payload)
			if (res.status === 201) {
				alert('Order placed successfully!')
				localStorage.removeItem('cartId')

				const orderId = res.data.id 
			
				navigate(`/dashboard/orders/${orderId}`, {
					state: {
						userData: formData,
					},
				})
			}
		} catch (error) {
			console.error(error)
			alert('Order failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

		

	return (
		<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg mt-10">
			<h2 className="text-2xl font-bold mb-4 text-center">Shipping Information</h2>

			<form
				onSubmit={handleSubmit}
				className="space-y-4"
			>
				<input
					type="text"
					name="fullName"
					value={formData.fullName}
					onChange={handleChange}
					required
					placeholder="Full Name"
					className="input input-bordered w-full"
				/>

				<input
					type="text"
					name="address"
					value={formData.address}
					onChange={handleChange}
					required
					placeholder="Shipping Address"
					className="input input-bordered w-full"
				/>

				<input
					type="tel"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					required
					placeholder="Phone Number"
					className="input input-bordered w-full"
				/>

				<button
					type="submit"
					className="btn btn-success w-full"
					disabled={loading}
				>
					{loading ? (
						<span className="loading loading-spinner loading-sm"></span>
					) : (
						'Proceed to Checkout'
					)}
				</button>
			</form>
		</div>
	)
}

export default CheckoutForm
