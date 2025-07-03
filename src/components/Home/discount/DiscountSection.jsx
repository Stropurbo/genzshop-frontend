import DiscountTimer from './DiscountTimer'

const DiscountSection = () => {
	return (
		<div className="relative max-w-[calc(100%-5rem)] mx-auto px-4 sm:px-6 md:px-10 overflow-hidden">
			<div className="w-screen">
				<img
					src="https://i.ibb.co/bgRyS6bC/Black-Orange-Modern-Indian-Food-Banner.png"
					alt="Black Friday Banner"
					className="w-screen h-[300px] sm:h-[400px] object-cover"
				/>
			</div>

			<div className="absolute top-0 left-0 w-full max-w-screen h-full flex items-center justify-end">
				<div className="w-full max-w-screen mx-auto px-5">
					<div className="w-full md:w-auto text-right mt-5 md:mt-0 ml-auto">
						<h1 className="text-sm md:text-2xl text-white">SPECIAL OFFER</h1>
						<h1 className="text-sm md:text-6xl text-yellow-500 font-bold">
							BLACK FRIDAY
						</h1>
						<p
							className="text-sm md:text-2xl text-white font-bold"
							style={{
								WebkitTextStroke: '1px black',
								textStroke: '1px black',
							}}
						>
							DISCOUNT UP TO 50%
						</p>

						<DiscountTimer />
					</div>
				</div>
			</div>
		</div>
	)
}

export default DiscountSection
