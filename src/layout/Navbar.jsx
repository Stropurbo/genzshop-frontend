import { Link } from 'react-router'
import useAuthContext from '../hooks/useAuthContext'
import useCartContext from '../hooks/useCartContext'
import { BiHeart } from 'react-icons/bi'
import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'
import debounce from 'lodash.debounce'
import { ChevronDown, X } from 'lucide-react'

const Navbar = () => {
	const { user, logoutUser } = useAuthContext()
	const { cart } = useCartContext()
	const [category, setCategory] = useState([])
	const [input, setInput] = useState('')
	const [results, setResults] = useState([])
	// const [isDrawerOpen, setDrawerOpen] = useState(false)

	useEffect(() => {
		apiClient.get('/category/').then((res) => setCategory(res.data.results))
	}, [])

	const fetchData = debounce((value) => {
		apiClient.get(`/products/?search=${value}`).then((res) => setResults(res.data.results))
	}, 300)

	const handleChange = (e) => {
		const value = e.target.value
		setInput(value)
		fetchData(value)
		setResults([])
	}

	return (
		<div className="navbar bg-yellow-100 shadow-sm px-5">
			<div className="navbar-start">
				<div className="dropdown">
					<label
						tabIndex={0}
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/shop">Products</Link>
						</li>
						<li tabIndex={0}>
							<details>
								<summary className="flex items-center gap-1 text-black cursor-pointer">
									Category
								</summary>
								<ul className="p-2">
									{category.map((cat) => (
										<li key={cat.id}>
											<Link to={`/shop/category/${cat.id}`}>
												{cat.name}
											</Link>
										</li>
									))}
								</ul>
							</details>
						</li>
					</ul>
				</div>

				<Link
					to="/"
					className="text-xl bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent font-bold p-2"
				>
					Gen <span className="text-3xl">Z</span>
				</Link>

				<div className="hidden lg:flex">
					<ul className="menu menu-horizontal px-1">
						<li>
							<Link to="/shop">Products</Link>
						</li>
						<li tabIndex={0}>
							<details>
								<summary className="flex items-center gap-1 text-black cursor-pointer">
									Category
								</summary>
								<ul className="p-2 w-50">
									{category.map((cat) => (
										<li key={cat.id}>
											<Link to={`/shop/category/${cat.id}`}>
												{cat.name}
											</Link>
										</li>
									))}
								</ul>
							</details>
						</li>
					</ul>
				</div>
				
			</div>

			{/* pc  */}

			<div className="navbar-end gap-2">
				{/* Search Bar */}
				<div className="relative w-36 md:w-48">
					<input
						type="search"
						className="input input-bordered w-full"
						placeholder="Search"
						value={input}
						onChange={handleChange}
					/>
					{results.length > 0 && (
						<ul className="absolute left-0 top-full z-10 mt-1 w-full bg-white border border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-md">
							{results.map((product) => (
								<li
									key={product.id}
									onClick={() => {
										setResults([])
										setInput('')
									}}
								>
									<Link
										to={`/shop/${product.id}`}
										className="block px-4 py-2 hover:bg-gray-100"
									>
										{product.name}
									</Link>
								</li>
							))}
						</ul>
					)}
				</div>

				{user ? (
					<div className="flex items-center gap-2">
						{/* Cart */}
						<div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle"
							>
								<div className="indicator">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<span className="badge badge-sm indicator-item">
										{cart?.items?.length || 0}
									</span>
								</div>
							</label>
							<div
								tabIndex={0}
								className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
							>
								<div className="card-body">
									<span className="text-lg font-bold">
										{cart?.items?.length || 0} Items
									</span>
									<span className="text-primary">
										Subtotal: ${cart?.total_price || 0}
									</span>
									<div className="card-actions">
										<Link to="/dashboard/cart">
											<button className="btn btn-primary btn-block">
												View cart
											</button>
										</Link>
									</div>
								</div>
							</div>
						</div>

						{/* Profile */}
						<div className="dropdown dropdown-end">
							<label
								tabIndex={0}
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="User avatar"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</label>
							<ul
								tabIndex={0}
								className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<Link to="/profile">Profile</Link>
								</li>
								<li>
									<Link to="/dashboard">Dashboard</Link>
								</li>
								<li>
									<a onClick={logoutUser}>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<Link
						to="/login"
						className="btn btn-sm btn-outline"
					>
						Login
					</Link>
				)}
			</div>
		</div>
	)
}

export default Navbar
