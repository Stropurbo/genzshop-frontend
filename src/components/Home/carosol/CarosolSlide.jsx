import DiscountSection from '../discount/DiscountSection'

const CarosolSlide = ({ title, subtitle, image, productId }) => {


	return (
		<div className="flex mt-8  h-[500px] ">
			
			<div className="h-full">
				<div
					className="w-full h-full bg-cover flex-col md:flex-row justify-center items-center px-4 md:px-8"
					style={{
						backgroundImage: `url('https://img.freepik.com/free-vector/dark-gradient-background-with-copy-space_53876-99548.jpg?t=st=1746590644~exp=1746594244~hmac=07d1beb6f3eccfde8ab6e22957157ebf18de318786040f20d49b0a8925c6fc1d&w=826')`,
					}}
					>
					<div
						className="flex flex-col md:flex-row justify-between max-w-6xl w-full gap-6
             		items-center text-center md:text-left h-full py-8"
					>
						{/* left content */}
						<div className="w-full md:w-1/2 text-center md:text-left mt-8 md:m-0">
							<h1 className="text-3xl md:text-5xl text-white line-clamp-1">
								{' '}
								{title}{' '}
							</h1>
							<p className="text-lg text-white line-clamp-2 mb-5"> {subtitle} </p>
							<a
								href={`/shop/${productId}`}
								className="btn px-2 py-2 md:px-7 md:py-3 rounded-lg"
							>
								Shop
							</a>
						</div>

						{/* right image */}
						<div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
							<img
								className="w-full md:h-64 bg-contain max-w-xs sm:max-w-sm md:max-w-md"
								src={image}
								alt="product image"
							/>
						</div>
					</div>
				</div>
			</div>

		
			
		</div>
	)
}

export default CarosolSlide
