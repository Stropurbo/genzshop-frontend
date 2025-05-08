import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/Home'
import AllProduct from '../components/products/AllProduct'
import Shop from '../pages/Shop'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from '../components/PrivateRoute'
import ActivateAccount from '../components/Registration/ActivateAccount'
import DashboardLayout from '../layout/DashboardLayout'
import Profile from '../pages/profile'
import ForgetPassPage from '../pages/ForgetPassPage'
import ResetPasswordConfirmPage from '../pages/ResetPasswordConfirmPage'
import ResendActivation from '../pages/ResendActivation'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import OrderPage from '../pages/OrderPage'
import PaymentSuccess from '../pages/PaymentSuccess'
import AddProduct from '../pages/AddProduct'
import AdminProduct from '../pages/AdminProduct'
import ShowCategory from '../pages/ShowCategory'
import AddCategory from '../pages/AddCategory'
import Reviews from '../pages/Reviews'
import UserList from '../pages/UserList'

const AppRoutes = () => {
	return (
		<div className="overflow-hidden">
			<Routes>
				<Route element={<MainLayout />}>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="all-product"
						element={<AllProduct />}
					/>
					<Route
						path="shop"
						element={<Shop />}
					/>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="register"
						element={<Register />}
					/>
					<Route
						path="activate/:uid/:token"
						element={<ActivateAccount />}
					/>
					<Route
						path="forget-password"
						element={<ForgetPassPage />}
					/>
					<Route
						path="/password/reset/confirm/:uid/:token"
						element={<ResetPasswordConfirmPage />}
					/>
					<Route
						path="resend-activation"
						element={<ResendActivation />}
					/>
					<Route
						path="shop/:id"
						element={<ProductDetail />}
					/>
					<Route
						path="profile/"
						element={<Profile />}
					/>
				</Route>

				{/* private routes */}
				<Route
					path="dashboard"
					element={
						<PrivateRoute>
							<DashboardLayout />
						</PrivateRoute>
					}
				>
					<Route
						index
						element={<Dashboard />}
					/>

					<Route
						path="profile"
						element={<Profile />}
					/>
					<Route
						path="activate/:uid/:token"
						element={<ActivateAccount />}
					/>
					<Route
						path="cart"
						element={<Cart />}
					/>
					<Route
						path="orders"
						element={<OrderPage />}
					/>
					<Route
						path="payment/success"
						element={<PaymentSuccess />}
					/>

					<Route
						path="products/add"
						element={<AddProduct />}
					/>

					<Route
						path="admin/products"
						element={<AdminProduct />}
					/>
					<Route
						path="admin/categroy"
						element={<ShowCategory />}
					/>
					<Route
						path="add/categroy"
						element={<AddCategory />}
					/>

					<Route
						path="admin/review"
						element={<Reviews />}
					/>
					<Route
						path="admin/users"
						element={<UserList />}
					/>
				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
