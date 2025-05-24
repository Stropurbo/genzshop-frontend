import defaultImage from '../assets/default_product.jpg'

const BlogItem = ({ blog }) => {
    
	return (
		<a
			href={`/blog/${blog.id}`}
			className="card bg-base-100 w-96 shadow-sm py-2 border border-gray-200 group"
		>
			<figure>
				<img
					src={blog.image || defaultImage}
					alt={blog.name}
					className="rounded-xl h-56 w-72 mt-5 transform transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
			</figure>
			<div className="card-body">
				<p className="text-gray-500">
					{new Date(blog.created_at).toLocaleDateString('en-GB', {
						month: 'long',
						day: '2-digit',
						year: 'numeric',
					})}
				</p>

				<h2 className="card-title line-clamp-1 text-start p-2">{blog.name}</h2>
				<p className="line-clamp-2 text-start mb-2 ml-2">{blog.description}</p>
				<div className="card-actions justify-start">
					<button className="btn btn-warning text-black p-2 ml-2">Read More</button>
				</div>
			</div>
		</a>
	)
}

export default BlogItem;