import StatCard from '../components/Dashboard/StatCard'
import { FiPackage } from 'react-icons/fi'
import Order from '../components/Dashboard/Orders'
import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'
import { Link } from 'react-router'
import { ShoppingBasket } from 'lucide-react'
import { BiSolidCategoryAlt } from 'react-icons/bi'
import { TbShoppingCartCopy } from 'react-icons/tb'


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
			<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 shadow-sm">
				<StatCard
					icon={'https://i.ibb.co/CK243RYj/img-icons8.png'}
					title="Total Product"
					value={product.length}
				/>
				<StatCard
					icon={'https://i.ibb.co/k6zwNRQB/img-icons8.png'}
					title="Total Category"
					value={category.length}
				/>
				<Link to="orders">
					<StatCard
						icon={'https://i.ibb.co/KjjrC3L4/img-icons8.png'}
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
