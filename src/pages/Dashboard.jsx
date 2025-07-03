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

const Dashboard = () => {
	const STATUS = {
		READY_TO_SHIP: 'Ready To Ship',
		DELIVERED: 'Delivered',
		SHIPPED: 'Shipped',
		NOT_PAID: 'Not Paid',
		CANCELED: 'Canceled',
	}

	const [product, setProdcut] = useState([])
	const [category, setCategory] = useState([])
	const [orderProduct, setOrder] = useState(0)
	const [delivered, setDevlivered] = useState([])
	const [cancelproduct, setProductCancel] = useState([])
	const [shippedOrder, setShipped] = useState([])
	const { user } = useAuthContext()

	const [readytoship, setReadyToShip] = useState([])
	const [notpaid, setnotpaid] = useState([])

	const chartData = [
		{ name: 'Total Orders', value: orderProduct },
		{ name: 'Delivered', value: delivered },
		{ name: 'Shipped', value: shippedOrder },
		{ name: 'Ready to Ship', value: readytoship },
		{ name: 'Not Paid', value: notpaid },
		{ name: 'Canceled', value: cancelproduct },
	]
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5C8D', '#AF19FF']

	useEffect(
		() => async () => {
			try {
				const [productR, categoryR, orderR] = await Promise.all([
					AuthApiClient.get('/products/'),
					AuthApiClient.get('/category/'),
					AuthApiClient.get('/orders/'),
				])

				setProdcut(productR.data.count)
				setCategory(categoryR.data.results)
				setOrder(orderR.data.count)

				const deliverOder = orderR.data.results.filter(
					(order) => order.status === STATUS.DELIVERED,
				)
				setDevlivered(deliverOder.length)

				const cancelorder = orderR.data.results.filter(
					(order) => order.status === STATUS.CANCELED,
				)
				setProductCancel(cancelorder.length)

				const shippedorder = orderR.data.results.filter(
					(order) => order.status === STATUS.SHIPPED,
				)
				setShipped(shippedorder.length)

				//ready to ship
				const readytoship = orderR.data.results.filter(
					(order) => order.status === STATUS.READY_TO_SHIP,
				)

				setReadyToShip(readytoship.length)

				// not paid
				const notpaidOrders = orderR.data.results.filter(
					(order) => order.status === STATUS.NOT_PAID,
				)
				setnotpaid(notpaidOrders.length)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
		},
		[
			STATUS.DELIVERED,
			STATUS.CANCELED,
			STATUS.SHIPPED,
			STATUS.READY_TO_SHIP,
			STATUS.NOT_PAID,
		],
	)
	useEffect(
		() => async () => {
			try {
				const res = await AuthApiClient.get('/category/')
				setCategory(res.data.results)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
		},
		[],
	)

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

				{/* <Link to="orders">
					<StatCard
						icon={'https://i.ibb.co/KjjrC3L4/img-icons8.png'}
						title="Total Order"
						value={orderProduct}
					/>
				</Link>

				{user?.is_staff && (
					<>
						<StatCard
							icon={'https://i.ibb.co/CK243RYj/img-icons8.png'}
							title="Total Product"
							value={product}
						/>
						<StatCard
							icon={'https://i.ibb.co/k6zwNRQB/img-icons8.png'}
							title="Total Category"
							value={category.length}
						/>
						<StatCard
							icon={'https://i.ibb.co/k6XJd69Z/shipped.png'}
							title="Total Delivered"
							value={delivered}
						/>
						<StatCard
							icon={'https://i.ibb.co/8DhYv2wV/cancel.png'}
							title="Cancel Order"
							value={cancelproduct}
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
					</>
				)} */}
			</div>

			<Order />
		</div>
	)
}

export default Dashboard
