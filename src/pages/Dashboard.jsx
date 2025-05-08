import StatCard from '../components/Dashboard/StatCard'
import { FiPackage } from 'react-icons/fi'
import Order from '../components/Dashboard/Orders'
import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import { Link } from 'react-router'

const Dashboard = () => {
	const [product, setProdcut] = useState([])
	const [category, setCategory] = useState([])
	const [orderProduct, setOrder] = useState([])

	useEffect(
		() => async () => {
			try {
				const [productR, categoryR, orderR] = await Promise.all([
					AuthApiClient.get('/products/'),
					AuthApiClient.get('/category/'),
					AuthApiClient.get('/orders/'),
				])

				setProdcut(productR.data.results)
				setCategory(categoryR.data.results)
				setOrder(orderR.data.count)
				console.log('Total Order from dashboard', orderR.data.count)
			} catch (error) {
				console.error('Failed to fetch products:', error)
			}
		},
		[],
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
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					icon={FiPackage}
					title="Total Product"
					value={product.length}
				/>
				<StatCard
					icon={FiPackage}
					title="Total Category"
					value={category.length}
				/>
				<Link to="orders">
					<StatCard
						icon={FiPackage}
						title="Total Order"
						value={orderProduct}
					/>
				</Link>
			</div>

			<Order />
		</div>
	)
}

export default Dashboard
