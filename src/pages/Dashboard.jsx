import StatCard from '../components/Dashboard/StatCard'
import Order from '../components/Dashboard/Orders'
import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import useAuthContext from '../hooks/useAuthContext'
import {
	PieChart,
	Pie,
	Cell,
	Tooltip,
	Legend,
	ResponsiveContainer,
	BarChart,
	Bar,
	XAxis,
	YAxis,
} from 'recharts'

const STATUS = {
	READY_TO_SHIP: 'Ready To Ship',
	DELIVERED: 'Delivered',
	SHIPPED: 'Shipped',
	NOT_PAID: 'Not Paid',
	CANCELED: 'Canceled',
}

const Dashboard = () => {	

	const [delivered, setDevlivered] = useState(0)
	const [cancelproduct, setProductCancel] = useState(0)
	const [shippedOrder, setShipped] = useState(0)
	const [readytoship, setReadyToShip] = useState(0)
	const [notpaid, setnotpaid] = useState(0)


	const [product, setProdcut] = useState([])
	const [category, setCategory] = useState([])
	const [orderProduct, setOrder] = useState(0)
	const { user } = useAuthContext()

	

	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsClient(true)
		}
	}, [])

	
	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				const [productRes, categoryRes, orderRes] = await Promise.all([
					AuthApiClient.get('/products/'),
					AuthApiClient.get('/category/'),
					AuthApiClient.get('/orders/'),
				])

				setProdcut(productRes.data.count)
				setCategory(categoryRes.data.results)
				setOrder(orderRes.data.count)

				const orders = orderRes.data.results

				setDevlivered(
					orders.filter((order) => order.status === STATUS.DELIVERED).length,
				)
				setProductCancel(
					orders.filter((order) => order.status === STATUS.CANCELED).length,
				)
				setShipped(orders.filter((order) => order.status === STATUS.SHIPPED).length)
				setReadyToShip(
					orders.filter((order) => order.status === STATUS.READY_TO_SHIP).length,
				)
				setnotpaid(orders.filter((order) => order.status === STATUS.NOT_PAID).length)
			} catch (error) {
				console.error('Failed to fetch dashboard data:', error)
			}
		}

		fetchDashboardData()
	}, [])


	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5C8D', '#AF19FF']

	const chartData = [
		{ name: 'Total Orders', value: orderProduct },
		{ name: 'Delivered', value: delivered },
		{ name: 'Shipped', value: shippedOrder },
		{ name: 'Ready to Ship', value: readytoship },
		{ name: 'Not Paid', value: notpaid },
		{ name: 'Canceled', value: cancelproduct },
	]

	


	return (
		<div>
			<div className="flex flex-wrap gap-4">
				<div className="my-8 w-full bg-white p-4 rounded shadow-md">
					{isClient && (
						<div className="flex flex-col md:flex-row justify-between gap-6">
							{/* Pie Chart */}
							<div className="w-full md:w-1/2">
								<ResponsiveContainer
									width="100%"
									height={300}
								>
									<PieChart>
										<Pie
											data={chartData}
											dataKey="value"
											nameKey="name"
											cx="50%"
											cy="50%"
											outerRadius={100}
											innerRadius={50}
											label
										>
											{chartData.map((entry, index) => (
												<Cell
													key={`cell-${index}`}
													fill={COLORS[index % COLORS.length]}
												/>
											))}
										</Pie>
										<Tooltip />
										<Legend />
									</PieChart>
								</ResponsiveContainer>
							</div>

							{/* Bar Chart */}
							<div className="w-full md:w-1/2">
								<ResponsiveContainer
									width="100%"
									height={300}
								>
									<BarChart data={chartData}>
										<XAxis dataKey="name" />
										<YAxis />
										<Tooltip />
										<Legend />
										<Bar
											dataKey="value"
											fill="#8884d8"
										/>
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					)}
				</div>

				<div className="flex flex-wrap gap-4 w-full max-w-screen mb-5">
					<StatCard
						icon={'https://i.ibb.co/KjjrC3L4/img-icons8.png'}
						title="Total Orders"
						value={orderProduct}
					/>

					{user?.is_staff && (
						<>
							<StatCard
								icon={'https://i.ibb.co/CK243RYj/img-icons8.png'}
								title="Total Products"
								value={product}
							/>
							<StatCard
								icon={'https://i.ibb.co/k6zwNRQB/img-icons8.png'}
								title="Total Categories"
								value={category.length}
							/>
							<StatCard
								icon={'https://i.ibb.co/k6XJd69Z/shipped.png'}
								title="Delivered"
								value={delivered}
							/>
							<StatCard
								icon={'https://i.ibb.co/GfkM1jk7/fast-delivery.png'}
								title="Shipped"
								value={shippedOrder}
							/>
							<StatCard
								icon={'https://i.ibb.co/8DvT05Rg/logistics.png'}
								title="Ready To Ship"
								value={readytoship}
							/>
							<StatCard
								icon={'https://i.ibb.co/KxkbKX1D/no-money.png'}
								title="Not Paid"
								value={notpaid}
							/>
							<StatCard
								icon={'https://i.ibb.co/8DhYv2wV/cancel.png'}
								title="Canceled Orders"
								value={cancelproduct}
							/>
						</>
					)}
				</div>
			</div>

			<Order />
		</div>
	)
}

export default Dashboard
