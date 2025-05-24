import { useEffect, useState } from "react"
import apiClient from "../services/api-client";

const useFetchProduct = (currentPage, priceRange, selectedCategory, searchQuery, sortOrder) => {
	const [myproduct, setProduct] = useState([])
	const [isloading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [totalpage, setTotalPage] = useState(0)

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true)

			const params = {
				price__gt: priceRange[0],
				price__lt: priceRange[1],
				page: currentPage,
				ordering: sortOrder,
			}

			if (selectedCategory) params.category_id = selectedCategory
			if (searchQuery) params.search = searchQuery

			try {
				const res = await apiClient.get('products/', { params })
				const products = res.data.results

				const updateProduct = await Promise.all(
					products.map(async (product) => {
						try{
							const review = await apiClient.get(`products/${product.id}/review/`)
							return {
								...product, 
								reviews: review.data.results 
							}
						}catch (error){
							console.log(error)
							return {
								...product,
								reviews: false,
							}
						}
					})
				)
				setProduct(updateProduct)
				setTotalPage(Math.ceil(res.data.count / 10))
			} catch (error) {
				setError(error.message || 'Something went wrong')
			} finally {
				setLoading(false)
			}
		}

		fetchProduct()
	}, [currentPage, priceRange, selectedCategory, searchQuery, sortOrder])

	return { myproduct, isloading, error, totalpage }
}

export default useFetchProduct
