import DiscountTimer from './DiscountTimer'

const DiscountSection = () => {
	return (
		<div
			className="max-w-[calc(100%-5rem)] mx-auto flex justify-end h-[400px] bg-cover bg-no-repeat"
			style={{
				backgroundImage: `url('https://i.ibb.co/bgRyS6bC/Black-Orange-Modern-Indian-Food-Banner.png')`,
			}}
		>
			<div className='flex justify-end'>
				<div
					className="flex flex-col justify-end md:flex-row max-w-6xl w-full 
            		items-center text-center h-full px-5 md:mt-5"
				>
					<div className="w-full md:text-left mt-8 md:m-0 md:ml-auto">
						<h1 className="text-xl md:text-2xl text-white text-center">
							{' '}
							SPECIAL OFFER{' '}
						</h1>
						<h1 className="text-xl md:text-6xl text-yellow-500 text-center font-bold">
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

						<div className="flex justify-center py-5">
							<a
								href="/all-product"
								className="btn btn-warning text-black"
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
