import { ShoppingCart } from 'lucide-react'
import default_image from '../../assets/default_product.jpg'
import { Link, Navigate, useNavigate } from 'react-router'
import useCartContext from '../../hooks/useCartContext'
import useAuthContext from '../../hooks/useAuthContext'
import toast from 'react-hot-toast'

const ProductItem = ({ product }) => {
	const { AddCartItem } = useCartContext()
	const { user } = useAuthContext()
	const navigate = useNavigate()

	const addToCart = async (e) => {
		e.stopPropagation() 
		e.preventDefault()
		if (!user) {			
			navigate('/login')
			return
		}
		try {
			await AddCartItem(product.id, 1)
			toast.success('✅ Product added to cart!')
		} catch (error) {
			console.error(error)
			toast.error('❌ Failed to add to cart.')
		}
	}

	return (
		<div className="card bg-white w-full max-w-[260px] min-h-[420px]  shadow border border-gray-200 hover:shadow-lg transition-all duration-300">
			<Link to={`/shop/${product.id}`}>
				<figure className="px-4 pt-6 h-[180px] flex items-center justify-center">
					<img
						src={
							product.images.length > 0 ? product.images[0].image : default_image
						}
						alt={product.name}
						className="h-full w-full object-center rounded-lg transform transition-transform duration-300 hover:scale-105"
					/>
				</figure>
			</Link>

			<div className="card-body items-center text-center p-4">
				<h2 className="text-xl font-bold line-clamp-1">{product.name}</h2>
				<p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
				<p className="text-black font-bold text-lg mt-2">${product.price}</p>
				<div className="flex justify-center p-2 text-black bg-yellow-50 rounded-lg w-full font-bold text-sm hover:bg-gray-50">
					<div className="px-2">
						<ShoppingCart />
					</div>
					<button onClick={addToCart}>Buy Now</button>
				</div>

				<Link
					to={`/shop/${product.id}`}
					className="card-actions mt-3 opacity-100 "
				>
					<button className="btn btn-sm btn-outline btn-warning">View Details</button>
				</Link>
			</div>
		</div>
	)
}

export default ProductItem
