import React from 'react'
import { Routes, Route } from 'react-router'
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
import Profile from '../pages/Profile'
import LatestNews from '../pages/LatestNews'
import BlogItem from '../pages/BlogItem'
import BlogView from '../pages/BlogView'
import AddBlog from '../pages/AddBlog'
import AllBlogView from '../pages/AllBlogView'
import ViewBlog from '../pages/ViewBlog'
import EditBlog from '../pages/EditBlog'
import SubscriberList from '../pages/SubscriberList'
import EditProduct from '../pages/EditProduct'
import EditCategory from '../pages/EditCategory'

const AppRoutes = () => {
	return (
		<div className="overflow-hidden">
			<Routes>
				{/* public route */}
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
						path="all-news"
						element={<AllBlogView />}
					/>

					<Route
						path="/shop"
						element={<AllProduct />}
					/>

					<Route
						path="shop/:id"
						element={<ProductDetail />}
					/>
					<Route
						path="/shop/category/:id"
						element={<AllProduct />}
					/>

					<Route
						path="/blogs"
						element={<LatestNews />}
					/>
					<Route
						path="blog/:id"
						element={<BlogView />}
					/>

					<Route
						path="/edit-blog/:id"
						element={<EditBlog />}
					/>

					<Route
						path="products/:id"
						element={<EditProduct />}
					/>
					<Route
						path="edit-category/:id"
						element={<EditCategory />}
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
						path="blog/add"
						element={<AddBlog />}
					/>

					<Route
						path="blog/view"
						element={<ViewBlog />}
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

					<Route
						path="subscriber"
						element={<SubscriberList />}
					/>
				</Route>
			</Routes>
		</div>
	)
}

export default AppRoutes
