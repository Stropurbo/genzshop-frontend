const TwoCaro = () => {
	return (
		<div className="ml-4 mt-8 flex flex-col gap-4 h-[500px] ">
			<div
				className="flex flex-col h-1/2"
				style={{
					backgroundImage: `url('https://i.ibb.co/dFsVGF2/Red-Modern-Japanese-Food-Banner.png')`,
				}}
			>
				<div
					className="flex flex-col md:flex-row justify-center max-w-6xl w-full gap-6
            			items-center text-center md:text-left h-full"
				>
					{/* left content */}
					<div className="w-full md:w-1/2 text-center md:text-left ml-5">
						<p className="text-white line-clamp-1"> Fresh </p>
						<h1 className="text-sm md:text-2xl font-bold text-white line-clamp-1 mb-3">
							{' '}
							Food{' '}
						</h1>
						<a
							href={`/shop/`}
							className="btn px-2 py-2 md:px-7 md:py-3 rounded-lg"
						>
							Shop
						</a>
					</div>

					{/* right image */}
					<div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
						<img
							className="w-full md:h-30 max-w-xs sm:max-w-sm md:max-w-md"
							src="https://i.ibb.co/nq0hfZR1/images-removebg-preview.png"
							alt="product image"
						/>
					</div>
				</div>
			</div>

			{/* second banner */}
			<div
				className="flex flex-col h-1/2"
				style={{
					backgroundImage: `url('https://i.ibb.co/KxqNbw11/Green-and-Yellow-Modern-Fresh-Food-Vegetables-Banner.png')`,
				}}
			>
				<div
					className="flex flex-col md:flex-row justify-center max-w-6xl w-full gap-6
            			items-center text-center md:text-left h-full"
				>
					{/* left content */}
					<div className="w-full md:w-1/2 text-center md:text-left ml-5">
						<p className="text-white line-clamp-1"> Fresh </p>
						<h1 className="text-sm md:text-2xl font-bold text-white line-clamp-1 mb-3">
							{' '}
							Drinks{' '}
						</h1>
						<a
							href={`/shop/`}
							className="btn px-2 py-2 md:px-7 md:py-3 rounded-lg"
						>
							Shop
						</a>
					</div>

					{/* right image */}
					<div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
						<img
							className="w-full md:h-30 max-w-xs sm:max-w-sm md:max-w-md"
							src="https://i.ibb.co/8DhhsNFT/image-removebg-preview.png"
							alt="product image"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TwoCaro
