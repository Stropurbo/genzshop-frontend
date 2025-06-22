import {
	FiBarChart2,
	FiPackage,
	FiPlusCircle,
	FiShoppingBag,
	FiShoppingCart,
	FiStar,
	FiTag,
	FiUsers,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router'
import useAuthContext from '../../hooks/useAuthContext'
import { BiLogOut } from 'react-icons/bi'
import { Newspaper, Podcast } from 'lucide-react'
import { BsPeople } from 'react-icons/bs'

const Sidebar = () => {
	const { user, logoutUser: userLogout } = useAuthContext()
	const navigate = useNavigate()

	const logoutUser = () => {
		userLogout()
		navigate('/')
	}

	const customerMenu = [
		{ to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
		{ to: '/dashboard/cart', icon: FiShoppingBag, label: 'Cart' },
		{ to: '/dashboard/orders', icon: FiShoppingCart, label: 'Order' },
	]

	const adminMenu = [
		{
			to: '/dashboard',
			icon: FiBarChart2,
			label: 'Dashboard',
			hover: 'group-hover:text-red-500',
		},
		{ to: '/dashboard/admin/products', icon: FiPackage, label: 'Products' },
		{ to: '/dashboard/products/add', icon: FiPlusCircle, label: 'Add Product' },
		{ to: '/dashboard/admin/categroy', icon: FiTag, label: 'Category' },
		{ to: '/dashboard/add/categroy', icon: FiPlusCircle, label: 'Add Category' },
		{ to: '/dashboard/cart', icon: FiShoppingBag, label: 'Cart' },
		{ to: '/dashboard/orders', icon: FiShoppingCart, label: 'Order' },
		{ to: '/dashboard/admin/review', icon: FiStar, label: 'Reviews' },
		{ to: '/dashboard/admin/users', icon: FiUsers, label: 'Users' },
		{ to: '/dashboard/blog/view', icon: Podcast, label: 'View Blog' },
		{ to: '/dashboard/blog/add', icon: Newspaper, label: 'Add Blog' },
		{ to: '/dashboard/subscriber', icon: BsPeople, label: 'Subscriber' },
	]

	const menuItems = user.is_staff ? adminMenu : customerMenu

	return (
		<div className="drawer-side h-screen z-10 bg-white shadow-sm">
			<label
				htmlFor="drawer-toggle"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<aside className="menu bg-white w-50 h-full p-4 text-base-content">
				<div className="flex items-center gap-2 mb-6 px-2">
					{/* <FiShoppingCart className="h-6 w-6" /> */}
					<a
						href="/"
						className="text-xl font-bold"
					>
						GenZ
					</a>
				</div>	

				<ul className="menu menu-md gap-2">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link
								to={item.to}
								className="group flex items-center gap-2 p-2 rounded-md transition-all duration-300 hover:bg-white hover:shadow-md hover:font-bold  hover:transition-y-6 "
							>
								<item.icon
									className={`h-4 w-4 text-black transition-colors duration-300 group-hover:text-indigo-600 ${
										item.hover || ''
									}`}
								/>
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				<div className="mt-auto pt-6 text-xs text-base-content">
					<div className="flex gap-3 text-xl text-black items-center h-4 ms-3 mb-3">
						<BiLogOut className="h-4 w-4" />
						<a
							onClick={logoutUser}
							className="cursor-pointer"
						>
							<span>Logout</span>
						</a>
					</div>
					<p className="ms-4"> © 2025 GenZ Shop</p>
				</div>
			</aside>
		</div>
	)
}

export default Sidebar
