import React, { useState } from 'react'
import default_image from '../../assets/default_product.jpg'
import Pagination from '../shop/Pagination'
import useFetchProduct from '../../hooks/useFetchProduct'
import useFetchCategory from '../../hooks/useFetchCategory'
import FilterSection from '../shop/FilterSection'
import { Link } from 'react-router'

const AllProduct = () => {
	
	const [priceRange, setPriceRange] = useState([0, 100000])
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setselectedcategory] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [sortOrder, setSortOrder] = useState('')

	const { myproduct, isloading, error, totalpage } = useFetchProduct(
		currentPage,
		priceRange,
		selectedCategory,
		searchQuery,
		sortOrder,
	)

	const handlePriceChange = (index, value) => {
		setPriceRange((prev) => {
			const newRange = [...prev]
			newRange[index] = value
			return newRange
		})
		setCurrentPage(1)
	}

	const categories = useFetchCategory()

	return (
		<section>
			<div>
				<FilterSection
					priceRange={priceRange}
					handlePriceChange={handlePriceChange}
					categories={categories}
					selectedCategory={selectedCategory}
					handleCategoryChange={setselectedcategory}
					searchQuery={searchQuery}
					handleSearchQuery={setSearchQuery}
					sortOrder={sortOrder}
					handleSorting={setSortOrder}
				/>
			</div>

			<div className="w-full flex justify-center items-center">
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

			<div className="grid grid-cols-1 md:grid-cols-3">
				{myproduct.map((product) => (
					<Link
						to={`/shop/${product.id}`}
						key={product.id}
					>
						<div className="card bg-base-100 w-96 shadow-sm">
							<figure className="px-10 pt-10">
								<img
									src={
										product.images.length > 0
											? product.images[0].image
											: default_image
									}
									alt="Shoes"
									className="rounded-xl"
								/>
							</figure>
							<div className="card-body items-center text-center">
								<h2 className="card-title"> {product.name} </h2>
								<p className="line-clamp-2"> {product.description} </p>
								<p className="font-bold"> {product.price} Tk </p>
								<div className="card-actions">
									<button className="btn btn-primary">Buy Now</button>
								</div>
							</div>
						</div>
					</Link>
				))}
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
