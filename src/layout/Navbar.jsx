import { Link, NavLink } from 'react-router'
import useAuthContext from '../hooks/useAuthContext'
import useCartContext from '../hooks/useCartContext'
import { BiHeart } from 'react-icons/bi'

const Navbar = () => {
	const { user, logoutUser } = useAuthContext()
	const { cart } = useCartContext()

	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{' '}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h7"
							/>{' '}
						</svg>
					</div>

					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						<li>
							<Link to="/all-product">Products</Link>
						</li>
					</ul>
				</div>
				<div className="flex gap-2">
					<Link to={'/shop'}>Shop</Link>
				</div>
			</div>
			<div className="navbar-center">
				<Link
					to="/"
					className="btn btn-ghost text-xl"
				>
					GenZ
				</Link>
			</div>

			<div className="navbar-end">
				{/* <button className="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{' '}
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>{' '}
					</svg>
				</button> */}

				<BiHeart className="h-5 w-5" cursor={PointerEvent}/>

				{user ? (
					<div className="flex">
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
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
										{' '}
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
										/>{' '}
									</svg>
									<span className="badge badge-sm indicator-item">
										{' '}
										{cart?.items?.length || 0}{' '}
									</span>
								</div>
							</div>

							<div
								tabIndex={0}
								className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
							>
								<div className="card-body">
									<span className="text-lg font-bold">
										{cart?.items?.length || 0} Items
									</span>
									<span className="text-primary">
										Subtotal: ${cart?.total_price || 0}
									</span>
									<div className="card-actions">
										<a href="/dashboard/cart">
											<button className="btn btn-primary btn-block">
												View cart
											</button>
										</a>
									</div>
								</div>
							</div>
						</div>

						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img
										alt="User avatar"
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
							>
								<li>
									<a href="profile"> Profile </a>
								</li>
								<li>
									<a href="dashboard"> Dashboard </a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a onClick={logoutUser}>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				) : (
					<div className="flex gap-2 ms-4">
						<Link
							to="/login"							
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="size-6"
							>
								<path
									fillRule="evenodd"
									d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
									clipRule="evenodd"
								/>
							</svg>
						</Link>
						{/* <Link to='/register' className="btn btn-primary">Register</Link> */}
					</div>
				)}
			</div>
		</div>
	)
}

export default Navbar
