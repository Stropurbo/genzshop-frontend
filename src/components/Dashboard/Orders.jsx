import React, { useEffect, useState } from 'react'
import AuthApiClient from '../../services/auth-api-client'

const Orders = () => {
	const [order, setOrder] = useState([])

	useEffect(() => {
		AuthApiClient.get('/orders/').then((res) => setOrder(res.data.results))
	}, [])
	return (
		<div className="mt-6 card">
			<div className="card-body bg-white shadow-sm">
				<h3 className="text-2xl font-bold bg-gradient-to-br from-yellow-700 to-green-500 bg-clip-text text-transparent">
					Recent Orders
				</h3>

				<div className="overflow-x-auto">
					<table className="table table-zebr">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Customer</th>
								<th>Status</th>
								<th>Date</th>
								<th>Amount</th>
							</tr>
						</thead>

						<tbody>
							{order.map((order) => (
								<tr key={order.id}>
									<td>#{order.id}</td>
									<td>{order.user?.first_name || 'N/A'}</td>
									<td>
										<div
											className={`badge text-sm transition-all duration-300 hover:font-bold hover:transition-y-6  ${
												order.status === 'Delivered'
													? 'bg-green-500'
													: order.status === 'Shipped'
													? 'bg-fuchsia-500'
													: order.status === 'Not Paid'
													? 'bg-red-500 text-white'
													: order.status === 'Ready To Ship'
													? 'bg-yellow-200'
													: order.status === 'Canceled'
													? 'bg-fuchsia-200'
													: 'bg-neutral-100'
											}`}
										>
											{order.status}
										</div>
									</td>

									<td>{new Date(order.created_at).toLocaleDateString()}</td>
									<td>${order.total_price?.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default Orders
