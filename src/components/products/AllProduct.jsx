import React, { useEffect, useState } from 'react'
import default_image from '../../assets/default_product.jpg'
import Pagination from '../shop/Pagination'
import useFetchProduct from '../../hooks/useFetchProduct'
import useFetchCategory from '../../hooks/useFetchCategory'
import FilterSection from '../shop/FilterSection'
import { Link, useNavigate, useParams } from 'react-router'
import { ChartNoAxesGantt, EllipsisVertical, Logs } from 'lucide-react'

const AllProduct = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [priceRange, setPriceRange] = useState([0, 1000])
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setselectedcategory] = useState(id)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortOrder, setSortOrder] = useState('')

	const { myproduct, isloading, error, totalpage } = useFetchProduct(
		currentPage,
		priceRange,
		selectedCategory,
		searchQuery,
		sortOrder,
	)
	const [viewMode, setViewMode] = useState('grid')

	const handlePriceChange = (index, value) => {
		setPriceRange((prev) => {
			const newRange = [...prev]
			newRange[index] = value
			return newRange
		})
		setCurrentPage(1)
	}

	const categories = useFetchCategory()

	useEffect(() => {
		if (id) {
			setselectedcategory(Number(id))
			setCurrentPage(1)
		} else {
			setselectedcategory(null)
		}
	}, [id])

	const handleCategoryChange = (catId) => {
		setselectedcategory(catId)

		setCurrentPage(1)
		if (catId) navigate(`/shop/category/${catId}`)
		else navigate('/shop')
	}

	const handleSorting = (value) => {
		setSortOrder(value)
		setCurrentPage(1)
	}

	return (
		<section>
			<div className="flex flex-col md:flex-row">
				{/* filter section */}
				<div className="mt-5 flex items-center justify-center">
					<ul className="menu text-base-content min-h-full w-52">
						<div>
							<FilterSection
								priceRange={priceRange}
								handlePriceChange={handlePriceChange}
								categories={categories}
								selectedCategory={selectedCategory}
								handleCategoryChange={handleCategoryChange}
								searchQuery={searchQuery}
								handleSearchQuery={setSearchQuery}
								// sortOrder={sortOrder}
								// handleSorting={setSortOrder}
							/>
						</div>
					</ul>
				</div>

				{/* loading */}
				<div className="flex justify-center items-center">
					{isloading && (
						<div className="flex justify-center items-center">
							<span className="loading loading-spinner loading-lg text-center m-5 "></span>
						</div>
					)}

					{!isloading && !error && myproduct.length === 0 && (
						<p className="text-center text-gray-500 font-bold ">
							Product Not Available
						</p>
					)}
				</div>

				<div>
					{/* sort by */}
					<div className="flex justify-between mr-4 mt-4">
						<div className="flex justify-start ms-4">
							<button onClick={() => setViewMode('grid')}>
								<Logs
									className={
										viewMode === 'grid' ? 'text-blue-500' : 'text-gray-400'
									}
								/>
							</button>
							<button onClick={() => setViewMode('list')}>
								
								<ChartNoAxesGantt
									className={
										viewMode === 'list' ? 'text-blue-500' : 'text-gray-400'
									}							
								/>
							</button>
						</div>

						<div className="flex justify-end">
							<select
								className="w-full md:w-32 p-2 border border-gray-300 rounded-md text-gray-600"
								value={sortOrder}
								onChange={(e) => handleSorting(e.target.value)}
							>
								<option value="">Sort by</option>
								<option value="price">Low to High</option>
								<option value="-price">High to Low</option>
							</select>
						</div>
					</div>

					{/* product */}
					<div
						className={`grid ${
							viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
						} `}
					>
						{myproduct.map((product) => (
							<Link
								to={`/shop/${product.id}`}
								key={product.id}
							>
								<div
									className={`card bg-base-100 w-full ${
										viewMode === 'grid'
											? 'max-w-sm md:max-w-md lg:max-w-96'
											: 'max-w-full'
									} h-96 shadow-lg m-2 group`}
								>
									<figure className="px-10 pt-10">
										<img
											src={
												product.images.length > 0
													? product.images[0].image
													: default_image
											}
											alt="Product Photo"
											className="rounded-xl h-36 transform transition-transform duration-300 group-hover:scale-125 object-cover"
										/>
									</figure>
									<div className="card-body items-center text-center">
										<h2 className="card-title line-clamp-1">
											{' '}
											{product.name}{' '}
										</h2>
										<p className="line-clamp-2 text-start">
											{' '}
											{product.description}{' '}
										</p>
										<p className="font-bold"> {product.price} Tk </p>
										<div className="card-actions">
											<button className="btn btn-primary">Buy Now</button>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>

			<div>
				<Pagination
					totalpage={totalpage}
					currentpage={currentPage}
					handlePageChange={setCurrentPage}
				/>
			</div>
		</section>
	)
}

export default AllProduct
