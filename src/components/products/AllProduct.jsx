import React, { useEffect, useState } from 'react'
import default_image from '../../assets/default_product.jpg'
import Pagination from '../shop/Pagination'
import useFetchProduct from '../../hooks/useFetchProduct'
import useFetchCategory from '../../hooks/useFetchCategory'
import FilterSection from '../shop/FilterSection'
import { Link, useNavigate, useParams } from 'react-router'
import { ChartNoAxesGantt, EllipsisVertical, Logs, Plus } from 'lucide-react'
import { BiHeart } from 'react-icons/bi'

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
				<div className="mt-5 flex items-center justify-start">
					<ul className="menu text-base-content min-h-full w-72">
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
					<div className="flex justify-between mt-4 mb-2">
						<div className="flex justify-start ml-5">
							<button onClick={() => setViewMode('grid')}>
								<Logs
									className={
										viewMode === 'grid' ? 'text-yellow-500' : 'text-red-400'
									}
								/>
							</button>
							<button onClick={() => setViewMode('list')}>
								<ChartNoAxesGantt
									className={
										viewMode === 'list' ? 'text-yellow-500' : 'text-red-400'
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
						className={`grid gap-5 ${
							viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'
						} `}
					>
						{myproduct.map((product) => (
							<Link
								to={`/shop/${product.id}`}
								key={product.id}
							>
								{viewMode === 'list' ? (
									<div className="flex md:flex-row flex-col w-full border ml-4 border-gray-200 rounded-md shadow-sm gap-4 group relative">
										{product.discount > 0 && (
											<div className="absolute top-2 left-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded z-10">
												-{product.discount}%
											</div>
										)}

										<div className="w-1/3 flex flex-col md:flex-row border-r border-gray-200 items-start justify-center  transform 			transition-transform duration-300 group-hover:scale-125">
											<img
												src={
													product.images.length > 0
														? product.images[0].image
														: default_image
												}
												alt="Product"
												className="object-contain h-40 w-full max-w-[160px]"
											/>
										</div>

										<div className="w-[700px] flex flex-col justify-between m-5 ">
											<div>
												<p className="text-xs text-yellow-500 font-semibold uppercase mb-1">
													{product.category_details?.name ||
														'Category'}
												</p>

												<h3 className="text-lg font-semibold">
													{product.name}
												</h3>

												<p className="text-sm w-2/3 text-gray-600 mt-2 mb-2 line-clamp-3">
													{product.description}
												</p>

												{product.reviews.length > 0 &&
													(() => {
														const totalRatings =
															product.reviews.reduce(
																(sum, review) =>
																	sum + review.ratings,
																0,
															)
														const avgRating =
															totalRatings /
															product.reviews.length
														const filledStars = '★'.repeat(
															Math.round(avgRating),
														)
														const emptyStars = '☆'.repeat(
															5 - Math.round(avgRating),
														)

														return (
															<div className="flex items-center mb-2">
																<span className="text-yellow-500 text-xl">
																	{filledStars}
																</span>
																<span className="text-gray-400 text-sm">
																	{emptyStars}
																</span>
																{/* <span className="text-gray-600 text-sm ml-2">
																	({product.reviews.length}{' '}
																	reviews)
																</span> */}
															</div>
														)
													})()}
											</div>

											<div className="flex items-center gap-3 mt-2">
												<span className="font-bold text-lg text-black">
													{product.discount_price > 0
														? product.discount_price + ' Tk'
														: product.price + ' Tk'}
												</span>
											</div>
										</div>
									</div>
								) : (
									<div
										className={`relative card bg-base-100 w-full border border-gray-200 ${
											viewMode === 'grid'
												? 'max-w-sm md:max-w-md lg:max-w-96'
												: 'max-w-full'
										} h-96 shadow-sm group`}
									>
										{product.discount > 0 && (
											<div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded z-10">
												-{product.discount}%
											</div>
										)}

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
												{product.name}
											</h2>
											<p className="line-clamp-2 text-start">
												{product.description}
											</p>
											<span className="font-bold text-lg text-black">
												{product.discount_price > 0
													? product.discount_price + ' Tk'
													: product.price + ' Tk'}
											</span>

											<div className="card-actions">
												<button className="btn btn-warning text-black">
													Buy Now
												</button>
											</div>
										</div>
									</div>
								)}
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
