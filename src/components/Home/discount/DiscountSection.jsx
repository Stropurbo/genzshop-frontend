import DiscountTimer from './DiscountTimer'

const DiscountSection = () => {
	return (
		<section
			className="w-full h-[500px] bg-cover bg-center bg-no-repeat flex flex-col md:flex-row 
        justify-center items-center"
			style={{
				backgroundImage: `url('https://i.ibb.co.com/rRKFP7d7/sale-up-to-Off.png')`,
			}}
		>
			<div
				className="flex flex-col md:flex-row justify-between max-w-6xl w-full 
            items-center text-center h-full px-5"
			>
				<div className="w-full text-center md:text-left mt-8 md:m-0">
					<h1 className="text-3xl md:text-5xl text-black text-center">
						{' '}
						SPECIAL OFFER{' '}
					</h1>
					<h1
						className="text-3xl md:text-7xl text-black text-center font-bold"
						style={{
							WebkitTextStroke: '2px white',
							textStroke: '2px white',
						}}
					>
						BLACK FRIDAY
					</h1>
					<p
						className="text-3xl md:text-4xl text-white font-bold text-center"
						style={{
							WebkitTextStroke: '1px black',
							textStroke: '1px black',
						}}
					>
						DISCOUNT UP TO 30%
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
		</section>
	)
}

export default DiscountSection
