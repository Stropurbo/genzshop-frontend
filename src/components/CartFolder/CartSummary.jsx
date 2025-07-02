import React, { useState } from 'react'
import AuthApiClient from '../../services/auth-api-client'

const CartSummary = ({ totalPrice, itemCount, cartId }) => {
	const tax = parseFloat(totalPrice) * 0.1
	const shipping = itemCount === 0 || parseFloat(totalPrice) > 100 ? 0 : 10
	const oderTotal = parseFloat(totalPrice) + shipping + tax
	const [loading, setLoading] = useState(false)

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phone: '',
		address: '',
		postalCode: '',
	})

	const handleChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const deleteCart = () => {
		localStorage.removeItem('cartId')
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!formData.name || !formData.email || !formData.phone || !formData.address) {
			alert('Please fill out all required fields.')
			return
		}
		setLoading(true)
		try {
			const res = await AuthApiClient.post('/orders/', {
				cart_id: cartId,
				customer_info: formData,
			})

			if (res.status === 201) {
				alert('Order Created Successfully')
				deleteCart()
				window.location.reload()
			}
		} catch (error) {
			console.log('Order create error:', error.response?.data || error.message)
		} finally {
			setLoading(false)
		}
	}

	// const createOrder = async () => {
	// 	setLoading(true)
	// 	try {
	// 		const res = await AuthApiClient.post('/orders/', { cart_id: cartId })

	// 		if (res.status === 201) {
	// 			alert('Order Created Successfull')
	// 			deleteCart()
	// 			window.location.reload()
	// 		}
	// 	} catch (error) {
	// 		console.log('Order create error:', error.response?.data || error.message)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	return (
		<section>
			<div>
				<form
					onSubmit={handleSubmit}
					className="space-y-4 max-w-md mx-auto p-4"
				>
					<div className="flex gap-2">
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="input input-bordered w-full text-center"
							placeholder="Full name"
						/>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="input input-bordered w-full text-center"
							placeholder="E-mail"
						/>
					</div>

					<div className="flex gap-2">
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
							className="input input-bordered w-full text-center"
							placeholder="Phone number"
						/>
						<input
							name="address"
							value={formData.address}
							onChange={handleChange}
							required
							className="input textarea-bordered w-full text-center"
							placeholder="Address"
						></input>
					</div>

					<div className="card bg-base-100 shadow-xl">
						<div className="card-body">
							<h2 className="text-xl text-gray-600 mb-4 font-bold">
								Order Summary
							</h2>

							<div className="space-y-2">
								<div className="flex justify-between">
									<span className="text-gray-500">
										Subtotal {itemCount} items
									</span>
									<span> ${totalPrice.toFixed(2)} </span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-500">Delivery Fee</span>
									<span> {shipping === 0 ? 'Free' : `$${shipping}`} </span>
								</div>

								<div className="flex justify-between">
									<span className="text-gray-500">Estimated Tax</span>
									<span> ${tax.toFixed(2)} </span>
								</div>

								<div className="border-t border-gray-200 pt-2 mt-2">
									<div className="flex justify-between font-medium">
										<span>Order Total</span>
										<span> ${oderTotal.toFixed(2)} </span>
									</div>
								</div>
							</div>

							<div className="card-actions justify-end mt-4">
								<button
									type="submit"
									className="btn btn-warning text-black w-full mt-4"
									disabled={itemCount === 0 || loading}
									// onClick={createOrder}
								>
									{loading ? (
										<span className="loading loading-spinner loading-sm"></span>
									) : (
										'Proceed to Checkout'
									)}
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
		</section>
	)
}

export default CartSummary
