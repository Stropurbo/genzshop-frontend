import { ChevronDown } from "lucide-react"

const FilterSection = ({
	priceRange,
	handlePriceChange,
	categories,
	selectedCategory,
	handleCategoryChange,
	searchQuery,
	handleSearchQuery,
	// sortOrder,
	// handleSorting,
}) => {
	return (
		<div className="mb-8">
		
			{/* Category Filter */}
			<div className="bg-white p-4 rounded-lg">
				<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>

				<select
					className="w-full p-2 border rounded-md"
					value={selectedCategory}
					onChange={(e) =>
						handleCategoryChange(e.target.value ? Number(e.target.value) : null)
					}
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option
							key={category.id}
							value={category.id}
						>
							{category.name}
						</option>
					))}
				</select>
			</div>

			{/* Search */}
			<div className="bg-white p-4 rounded-lg">
				<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
					placeholder="Search Products..."
					className="w-full p-2 border rounded-md"
				/>
			</div>

			{/* price range */}
			<div className="p-3 md:p-4 rounded-lg">
				<label className="block text-sm font-medium text-gray-700 mb-2">Price</label>

				<div className="flex mb-2 space-x-2">
					<div className="flex items-center">
						<input
							type="number"
							min="0"
							max={priceRange[1]}
							value={priceRange[0]}
							onChange={(e) => handlePriceChange(0, Number(e.target.value))}
							className="w-20 p-2 border border-gray-500 rounded-md"
						/>
					</div>

					<div className="flex items-center">
						<input
							type="number"
							min={priceRange[0]}
							max="1000"
							value={priceRange[1]}
							onChange={(e) => handlePriceChange(1, Number(e.target.value))}
							className="w-20 p-2 border border-gray-500 rounded-md"
						/>
					</div>
				</div>

				<input
					type="range"
					min="0"
					max={priceRange[1]}
					step="10"
					value={priceRange[0]}
					onChange={(e) => handlePriceChange(0, Number(e.target.value))}
					className="w-full"
				/>

				<div className="flex justify-between text-sm text-gray-600 mt-2">
					<span>${priceRange[0]}</span>
					<span>${priceRange[1]}</span>
				</div>
			</div>

			{/* Sorting  */}
			{/* <div className="bg-white p-4 rounded-lg">
				<div className="flex text-sm font-medium text-gray-700 mb-2">
					Sort By
					<ChevronDown className="space-x-5" />
				</div>
				<select
					className="w-full p-2 border rounded-md"
					value={sortOrder}
					onChange={(e) => handleSorting(e.target.value)}
				>
					<option value="">Default</option>
					<option value="price">Low to High</option>
					<option value="-price">High to Low</option>
				</select>
			</div> */}
		</div>
	)
}

export default FilterSection
