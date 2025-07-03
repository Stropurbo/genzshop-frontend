import defaultImage from '../assets/default_product.jpg'

const BlogItem = ({ blog }) => {
    
	return (
		<a
			href={`/blog/${blog.id}`}
			className="card bg-white w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[22rem] shadow-sm border border-gray-200 group transition-transform duration-300 hover:shadow-md"
		>
			<figure className="flex justify-center pt-5">
				<img
					src={blog.image || defaultImage}
					alt={blog.name}
					className="rounded-xl h-48 sm:h-52 md:h-56 w-full object-cover px-3 transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			</figure>

			<div className="card-body px-4 py-2 space-y-2">
				<p className="text-gray-500 text-sm">
					{new Date(blog.created_at).toLocaleDateString('en-GB', {
						month: 'long',
						day: '2-digit',
						year: 'numeric',
					})}
				</p>

				<h2 className="card-title text-start line-clamp-1">{blog.name}</h2>
				<p className="text-start line-clamp-2 text-sm text-gray-700">
					{blog.description}
				</p>

				<div className="card-actions justify-start pt-2">
					<button className="btn btn-warning text-black px-4 py-2 text-sm font-semibold">
						Read More
					</button>
				</div>
			</div>
		</a>
	)
}

export default BlogItem;