import { useEffect, useState } from 'react'
import apiClient from '../services/api-client'

const useLiveSearchProducts = (searchQuery) => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!searchQuery.trim()) {
			setProducts([])
			return
		}

		const fetchProducts = async () => {
			setLoading(true)
			try {
				const res = await apiClient.get('products/', {
					params: { search: searchQuery, page_size: 5 },
				})
				setProducts(res.data.results || [])
			} catch (error) {
				console.error('Live search error:', error)
				setProducts([])
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
		
	}, [searchQuery])

	return { products, loading }
}

export default useLiveSearchProducts
