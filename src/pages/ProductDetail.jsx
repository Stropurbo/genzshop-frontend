import React, { useEffect, useState } from 'react'
import ProductImageGallery from '../components/productDetails/ProductImageGallery'
import AddtoCartButton from '../components/productDetails/AddtoCartButton'
import { Link, useParams } from 'react-router'
import apiClient from '../services/api-client'
import { FaArrowLeft } from 'react-icons/fa'
import defaultImage from '../assets/default_product.jpg'
import ReviewSection from '../components/Reviews/ReviewSection'
import ProductReview from './ProductReview'
import SuggestProduct from './SuggestProduct'

const ProductDetail = () => {
	const [product, setProduct] = useState(null)
	const [loading, setLoading] = useState(false)
	const { id } = useParams()

	useEffect(() => {
		setLoading(true)
		apiClient.get(`/products/${id}`).then((res) => {
			setProduct(res.data)
			console.log(res.data)
			setLoading(false)
		})
	}, [id])

	if (loading)
		return (
			<div className="flex justify-center items-center py-7">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		)
	if (!product) return <div>Product Not Found...</div>

	return (
		<div className="w-3/4 mx-auto px-4 py-8">
			<div className="mb-6">
				<Link
					to="/shop"
					className="flex items-center text-sm text-base-content/70 hover:text-base-content transition-colors"
				>
					<FaArrowLeft className="mr-2 h-4 w-4" />
					Back to products
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
				<ProductImageGallery
					images={
						product?.images?.length > 0 ? product.images : [{ image: defaultImage }]
					}
					productName={product?.name || 'Product'}
				/>

				<div className="flex flex-col h-full">
					<p className="text-start text-yellow-600">
						{product.category_details?.name || 'Unknown Category'}
					</p>
					<p className="pt-5 ml-2 text-2xl font-bold">{product.name}</p>

					<p className="ml-2 pt-8 font-bold text-2xl">
						{product.discount_price > 0
							? `$${product.discount_price}`
							: `$${product.price}`}						

						<span className="text-sm ml-2 text-gray-500">
							{product.price_with_tax} (incl. tax)
						</span>
					</p>					

					<ProductReview reviews={product.reviews} />

					<p className="ml-2 pt-8"> {product.description} </p>

					<div className="ml-2 mb-2 pt-8 flex text-gray-500 font-bold">
						In Stock ( {product.stock} Available )
					</div>

					<div className="mt-auto">
						<AddtoCartButton product={product} />
					</div>
				</div>
			</div>

			<ReviewSection />

			<SuggestProduct />

		</div>
	)
}

export default ProductDetail
