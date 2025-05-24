import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

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
	const [dropdownOpen, setDropdownOpen] = useState(false)

	return (
		<div className="mb-8">
			{/* Category Filter */}
			<div className="bg-white p-4 rounded-lg relative">
				<label className="block text-sm font-medium text-gray-700 mb-2">Category</label>

				<button
					type="button"
					onClick={() => setDropdownOpen(!dropdownOpen)}
					className="w-full p-2 border border-gray-200 rounded-md flex items-center justify-between bg-white"
				>
					<div className="flex items-center gap-2">
						{selectedCategory ? (
							<>
								<img
									src={
										categories.find((cat) => cat.id === selectedCategory)
											?.image
									}
									alt="Selected"
									className="w-6 h-6 object-cover rounded"
								/>
								<span>
									{
										categories.find((cat) => cat.id === selectedCategory)
											?.name
									}
								</span>
							</>
						) : (
							<span className="text-gray-400">Select Category</span>
						)}
					</div>
					<ChevronDown className="w-4 h-4" />
				</button>

				{dropdownOpen && (
					<div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
						
						<div
							onClick={() => {
								handleCategoryChange(null) 
								setDropdownOpen(false)
							}}
							className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
						>
							<span className="font-medium text-gray-700">All Category</span>
						</div>
						{categories.map((category) => (
							<div
								key={category.id}
								onClick={() => {
									handleCategoryChange(category.id)
									setDropdownOpen(false)
								}}
								className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100"
							>
								<img
									src={category.image}
									alt={category.name}
									className="w-6 h-6 object-cover rounded"
								/>
								<span>{category.name}</span>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Search */}
			<div className="bg-white p-4 rounded-lg">
				<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
				<input
					type="text"
					value={searchQuery}
					onChange={(e) => handleSearchQuery(e.target.value)}
					placeholder="Search Products..."
					className="w-full p-2 border border-gray-200 rounded-md"
				/>
			</div>

			{/* price range */}
			<div className="p-3 md:p-4 rounded-lg">
				<label className="block text-sm font-medium text-gray-700 mb-2">Price</label>

				<div className="flex justify-center mb-2 space-x-2">
					<div className="flex items-center">
						<input
							type="number"
							min="0"
							max={priceRange[1]}
							value={priceRange[0]}
							onChange={(e) => handlePriceChange(0, Number(e.target.value))}
							className="w-20 p-2 border border-gray-200 rounded-md"
						/>
					</div>

					<div className="flex items-center">
						<input
							type="number"
							min={priceRange[0]}
							max="1000"
							value={priceRange[1]}
							onChange={(e) => handlePriceChange(1, Number(e.target.value))}
							className="w-20 p-2 border border-gray-200 rounded-md"
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
