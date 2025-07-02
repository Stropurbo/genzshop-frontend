import { useEffect, useState } from 'react'
import useAuthContext from '../../hooks/useAuthContext'
import OrderTable from './OrderTable'
import AuthApiClient from '../../services/auth-api-client'
import { format } from 'date-fns'

const OrderCart = ({ order, onCancel }) => {
	const { user } = useAuthContext()
	const [status, setStatus] = useState(order.status)
	const [loading, setLoading] = useState(false)
  const [customerInfo, setCustomerInfo] = useState(null)

  useEffect(() => {
		if (order?.user) {
			const fetchUser = async () => {
				try {
					const res = await AuthApiClient.get(`/admin/user/${order.user}/`)
					setCustomerInfo(res.data)    
				} catch (error) {
					console.error('User fetch error:', error)
				}
			}
			fetchUser()
		}
  }, [order])

  console.log('customerInfo:', customerInfo)


	const handleStatusChange = async (event) => {
		const newStatus = event.target.value
		try {
			const response = await AuthApiClient.patch(`/orders/${order.id}/update_status/`, {
				status: newStatus,
			})
			console.log(response)
			if (response.status === 200) {
				setStatus(newStatus)
				alert(response.data.status)
			}
		} catch (error) {
			console.log(error)
		}
	}
  console.log(order)


	const handlePayment = async () => {
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
		<div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
			<div className="bg-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h2 className="text-lg font-bold">Order #{order.id}</h2>
					<p className="text-gray-600 text-sm">
						Placed on: {format(new Date(order.created_at), 'MMMM d, yyyy - h:mm a')}
					</p>{' '}
				</div>
				<div className="flex gap-2">
					{user.is_staff ? (
						<select
							value={status}
							onChange={handleStatusChange}
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
								order.status === 'Not Paid' ? 'bg-red-500' : 'bg-green-500'
							}`}
						>
							{order.status}
						</span>
					)}
					{order.status !== 'Deliverd' &&
						order.status !== 'Canceled' &&
						!user.is_staff && (
							<button
								onClick={() => onCancel(order.id)}
								className="text-blue-700 hover:underline"
							>
								Cancel
							</button>
						)}
				</div>
			</div>
			<div className="p-6">
				<div className="flex items-start justify-between text-lg p-2">
				
					<div className="font-medium text-lg">
						GenZ Shop <br />
						<span className="font-normal text-sm text-gray-700">
							Shop-4D-021 C1 & C2 (East Court), <br />
							Level-4, Block-D, <br />
							Jamuna Future Park, Dhaka
						</span>
					</div>

					
					<div className="text-right">
						<p className="text-orange-600 font-semibold">Order From</p>
						<div className="mt-1 flex flex-col items-end text-sm text-gray-600 space-y-1">
							{customerInfo ? (
								<>
									<div className="flex gap-1">
										<span>{customerInfo.first_name || 'N/A'}</span>
										<span>{customerInfo.last_name || ''}</span>
									</div>
									<span>{customerInfo.phone_number || 'N/A'}</span>
									<span>{customerInfo.email || 'N/A'}</span>
									<span>{customerInfo.address || 'N/A'}</span>
								</>
							) : (
								<span className="text-red-500">Customer Details not found</span>
							)}
						</div>
					</div>
				</div>

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
				{!user.is_staff && order.status === 'Not Paid' && (
					<button
						className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
						onClick={handlePayment}
						disabled={loading}
					>
						{loading ? 'Processing...' : 'Pay Now'}
					</button>
				)}
			</div>
		</div>
	)
}

export default OrderCart
