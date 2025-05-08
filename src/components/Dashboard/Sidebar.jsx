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
import { Link } from 'react-router'
import useAuthContext from '../../hooks/useAuthContext'

const Sidebar = () => {
	const { user } = useAuthContext()

	const customerMenu = [
		{ to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
		{ to: '/dashboard/cart', icon: FiShoppingBag, label: 'Cart' },
		{ to: '/dashboard/orders', icon: FiShoppingCart, label: 'Order' },
		// { to: "/reviews", icon: FiStar, label: "Reviews" },
	]

	const adminMenu = [
		{ to: '/dashboard', icon: FiBarChart2, label: 'Dashboard' },
		{ to: '/dashboard/admin/products', icon: FiPackage, label: 'Products' },
		{ to: '/dashboard/products/add', icon: FiPlusCircle, label: 'Add Product' },
		{ to: '/dashboard/admin/categroy', icon: FiTag, label: 'Category' },
		{ to: '/dashboard/add/categroy', icon: FiPlusCircle, label: 'Add Category' },
		{ to: '/dashboard/cart', icon: FiShoppingBag, label: 'Cart' },
		{ to: '/dashboard/orders', icon: FiShoppingCart, label: 'Order' },
		{ to: '/dashboard/admin/review', icon: FiStar, label: 'Reviews' },
		{ to: '/dashboard/admin/users', icon: FiUsers, label: 'Users' },
	]

	const menuItems = user.is_staff ? adminMenu : customerMenu

	return (
		<div className="drawer-side z-10">
			<label
				htmlFor="drawer-toggle"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<aside className="menu bg-base-200 w-64 min-h-full p-4 text-base-content">
				{/* Sidebar header */}
				<div className="flex items-center gap-2 mb-6 px-2">
					<FiShoppingCart className="h-6 w-6" />
					<a
						href="/"
						className="text-xl font-bold"
					>
						GenZ
					</a>
				</div>

				{/* Sidebar menu */}
				<ul className="menu menu-md gap-2">
					{menuItems.map((item, index) => (
						<li key={index}>
							<Link to={item.to}>
								<item.icon className="h-4 w-4" />
								<span>{item.label}</span>
							</Link>
						</li>
					))}
				</ul>

				{/* Sidebar footer */}
				<div className="mt-auto pt-6 text-xs text-base-content/70">
					© 2025 SciMart Admin
				</div>
			</aside>
		</div>
	)
}

export default Sidebar
