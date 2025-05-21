import { useNavigate } from 'react-router'
import defultImage from '../../../assets/default_product.jpg'

const CategoryItem = ({ category }) => {
	const navigate = useNavigate()
	const handleClick = () => {
		navigate(`/shop/category/${category.id}`)
	}

	return (
		<div
			onClick={handleClick}
			className="w-full flex justify-center flex-col items-center md:w-40 h-28 px-2 m-2 bg-gray-100 rounded-lg p-5"
		>
			<img
				src={category.image || defultImage}
				alt={category.name}
				className="rounded-xl h-10 w-10"
			/>

			<p className="font-bold text-sm">{category.name}</p>
			<div className="flex justify-center items-center text-gray-500 p-2 h-7 w-24 text-sm rounded-full bg-gray-100">
				{category.product_count} items
			</div>
		</div>
	)
}

export default CategoryItem
