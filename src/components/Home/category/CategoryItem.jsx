import React from 'react'

const CategoryItem = ({ category, index }) => {
	const gradients = [
		'bg-gradient-to-br from-fuchsia-200 to-violet-300',
		'bg-gradient-to-br from-violet-200 to-fuchsia-300',
		'bg-gradient-to-br from-indigo-200 to-fuchsia-300',
		'bg-gradient-to-br from-fuchsia-200 via-blue-100 to-fuchsia-300',
	]

	return (
		<div
			className={`w-full md:w-60 h-40 px-2 m-2 md:m-2 md:px-3 rounded-lg  
                ${gradients[index % gradients.length]}`}
		>
			<div className="flex justify-between pt-5">
				<p
					className="flex justify-center items-center rounded-4xl bg-fuchsia-500 text-white font-bold
                h-7 w-7 text-center p-2"
				>
					{' '}
					{category.name.charAt(0)}{' '}
				</p>
				<p className="flex justify-center items-center text-black bg-gray-100 rounded-full p-2 h-7 w-7 text-sm">
					{category.product_count}
				</p>
			</div>
			<p className="font-bold ">{category.name}</p>
			<p className="text-sm"> {category.description} </p>
			<div className="flex items-center mt-5 ">
				<p className="text-fuchsia-500 font-bold">Explore</p>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="lucide lucide-chevron-right-icon text-fuchsia-500 lucide-chevron-right "
				>
					<path d="m9 18 6-6-6-6" />
				</svg>
			</div>
		</div>
	)
}

export default CategoryItem
