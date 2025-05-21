import DiscountTimer from './DiscountTimer'

const DiscountSection = () => {
	return (
		<div>
			<div
				className="w-full h-[400px] bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url('https://i.ibb.co/KpM7JCW4/Orange-Simple-Special-Ramen-Promotion-Banner-Landscape-1.png')`,
				}}
			>
				<div
					className="flex flex-col md:flex-row justify-between max-w-6xl w-full 
            items-center text-center h-full px-5"
				>
					<div className="w-full text-center md:text-left mt-8 md:m-0">
						<h1 className="text-xl md:text-2xl text-black text-center">
							{' '}
							SPECIAL OFFER{' '}
						</h1>
						<h1
							className="text-xl md:text-6xl text-black text-center font-bold"
							style={{
								WebkitTextStroke: '1px white',
								textStroke: '1px white',
							}}
						>
							BLACK FRIDAY
						</h1>
						<p
							className="text-xl md:text-2xl text-white font-bold text-center"
							style={{
								WebkitTextStroke: '1px black',
								textStroke: '1px black',
							}}
						>
							DISCOUNT UP TO 50%
						</p>

						<DiscountTimer />

						{/* <img className='w-full max-w-xs sm:max-w-sm md:max-w-md' src="" alt="product image" /> */}

						<div className="flex justify-center py-5">
							<a
								href="/all-product"
								className="btn btn-neutral"
							>
								Buy Now
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DiscountSection
