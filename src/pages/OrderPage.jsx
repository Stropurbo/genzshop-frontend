import { useEffect, useState } from 'react'
import OrderCart from '../components/Order/OrderCart'
import AuthApiClient from '../services/auth-api-client'
import useAuthContext from '../hooks/useAuthContext'
import { useLocation } from 'react-router'

const OrderPage = () => {
	const [orders, setOrders] = useState([])
	const { user } = useAuthContext()
	const [loading, setLoading] = useState(false)
	const [userData, setUserData] = useState(null)
	const location = useLocation()

	useEffect(() => {
		AuthApiClient.get('/orders/')
			.then((res) => {
				setOrders(res.data.results)
			})
			.catch((err) => console.error('Failed to fetch orders:', err))
	}, [])

	useEffect(() => {
		if (location.state && location.state.userData) {
			setUserData(location.state.userData)
		}

		AuthApiClient.get('/orders/')
			.then((res) => {
				setOrders(res.data.results)
			})
			.catch((err) => console.error('Failed to fetch orders:', err))
	}, [location])

	const handleCancelOrder = async (orderId) => {
		try {
			const response = await AuthApiClient.post(`/orders/${orderId}/cancel/`)
			if (response.status === 200) {
				setOrders((prevOrder) =>
					prevOrder.map((order) =>
						order.id === orderId ? { ...order, status: 'Canceled' } : order,
					),
				)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleStatusChange = async (event, orderId) => {
		const newStatus = event.target.value
		try {
			const response = await AuthApiClient.patch(`/orders/${orderId}/update_status/`, {
				status: newStatus,
			})
			if (response.status === 200) {
				setOrders((data) =>
					data.map((order) =>
						order.id === orderId ? { ...order, status: newStatus } : order,
					),
				)
				alert(response.data.status)
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handlePayment = async (order) => {
		setLoading(true)
		try {
			const response = await AuthApiClient.post('/payment/', {
				amount: order.total_price,
				orderId: order.id,
				numItem: order.items?.length,
			})

			if (response.data.payment_url) {
				setLoading(false)
				window.location.href = response.data.payment_url
			} else {
				alert('Payment failed')
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="container mx-auto py-5 px-5">
			<h1 className="text-2xl font-bold mb-4">Order Details</h1>
			{Array.isArray(orders) && orders.length > 0 ? (
				orders.map((order) => (
					<div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
						<div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<h2 className="text-lg font-bold">Order #{order.id}</h2>
								<p className="text-gray-600 text-sm">
									Placed on {order.created_at}
								</p>
							</div>
							<div className="flex gap-2">
								{user.is_staff ? (
									<select
										value={order.status}
										onChange={(e) => handleStatusChange(e, order.id)}
										className="px-3 py-1 rounded-full text-white text-sm font-medium bg-blue-500"
									>
										<option value="Not Paid">Not Paid</option>
										<option value="Ready To Ship">Ready To Ship</option>
										<option value="Shipped">Shipped</option>
										<option value="Delivered">Delivered</option>
										<option value="Canceled">Canceled</option>
									</select>
								) : (
									<span
										className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
											order.status === 'Not Paid'
												? 'bg-red-500'
												: 'bg-green-500'
										}`}
									>
										{order.status}
									</span>
								)}
								{order.status !== 'Delivered' &&
									order.status !== 'Canceled' &&
									!user.is_staff && (
										<button
											onClick={() => handleCancelOrder(order.id)}
											className="text-blue-700 hover:underline"
										>
											Cancel
										</button>
									)}
							</div>
						</div>
						<div className="p-6">
							<h3 className="font-medium text-lg mb-4">Order Items</h3>
							{/* Order Items Table  */}
							<OrderTable items={order.items} />
						</div>
						<div className="border-t p-6 flex flex-col items-end">
							<div className="space-y-2 w-full max-w-[200px]">
								<div className="flex justify-between">
									<span>Subtotal:</span>
									<span>${order.total_price.toFixed(2)}</span>
								</div>
								<div className="flex justify-between">
									<span>Shipping:</span>
									<span>$0.00</span>
								</div>
								<div className="flex justify-between font-bold border-t pt-2">
									<span>Total:</span>
									<span>${order.total_price.toFixed(2)}</span>
								</div>
							</div>

							{userData && (
								<div className="bg-white p-6 rounded-lg shadow-lg mb-8">
									<h2 className="font-semibold text-lg">
										Shipping Information
									</h2>
									<p>
										<strong>Full Name:</strong> {userData.fullName}
									</p>
									<p>
										<strong>Address:</strong> {userData.address}
									</p>
									<p>
										<strong>Phone:</strong> {userData.phone}
									</p>
								</div>
							)}
							{!user.is_staff && order.status === 'Not Paid' && (
								<button
									className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
									onClick={() => handlePayment(order)}
									disabled={loading}
								>
									{loading ? 'Processing...' : 'Pay Now'}
								</button>
							)}
						</div>
					</div>
				))
			) : (
				<p className="flex justify-center items-center">
					<span className="loading loading-spinner loading-lg"></span>
				</p>
			)}
		</div>
	)
}
export default OrderPage
