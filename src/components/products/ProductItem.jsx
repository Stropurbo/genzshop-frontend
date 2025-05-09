import default_image from '../../assets/default_product.jpg'

const ProductItem = ({ product }) => {
	return (
		<a href={`/shop/${product.id}`}>
			<div className="card bg-base-100 w-96 shadow-sm group">
				<figure className="px-10 pt-10 h-[200px]">
					<img
						src={
							product.images.length > 0 ? product.images[0].image : default_image
						}
						alt={product.name}
						className="rounded-xl"
					/>
				</figure>
				<div className="card-body items-center text-center">
					<h2 className="card-title">{product.name}</h2>
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
