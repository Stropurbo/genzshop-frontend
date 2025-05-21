import default_image from '../../assets/default_product.jpg'

const ProductItem = ({ product }) => {
	return (
		<a href={`/shop/${product.id}`}>
			<div className="card bg-base-100 w-80 shadow-lg mb-5 group hover:bg-gray-100">
				<figure className="px-8 pt-10 h-[200px] flex items-center justify-center">
					<img
						src={
							product.images.length > 0 ? product.images[0].image : default_image
						}
						alt={product.name}
						className="rounded-xl h-full object-cover transform transition-transform duration-300 hover:scale-110"
					/>
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title line-clamp-1">{product.name}</h2>
					<p className="line-clamp-1">{product.description}</p>
					<p className="font-bold"> ${product.price} </p>

					<div className="card-actions mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<button className="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		</a>
	)
}

export default ProductItem
