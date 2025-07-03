const TwoCaro = () => {
	return (
		<div className="w-full mt-6 flex flex-col gap-6">
			{/* First Banner */}
			<div
				className="w-full rounded-lg bg-cover bg-center"
				style={{
					backgroundImage: `url('https://i.ibb.co/dFsVGF2/Red-Modern-Japanese-Food-Banner.png')`,
				}}
			>
				<div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-6 gap-6">
					{/* Left Content */}
					<div className="w-full lg:w-1/2 text-center lg:text-left">
						<p className="text-white text-sm sm:text-base">Fresh</p>
						<h2 className="text-lg sm:text-2xl font-bold text-white mb-4">Food</h2>
						<a
							href="/shop"
							className="btn bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-lg"
						>
							Shop
						</a>
					</div>

					{/* Right Image */}
					<div className="w-full lg:w-1/2 flex justify-center">
						<img
							src="https://i.ibb.co/nq0hfZR1/images-removebg-preview.png"
							alt="Food"
							className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px] object-contain"
						/>
					</div>
				</div>
			</div>

			{/* Second Banner */}
			<div
				className="w-full rounded-lg bg-cover bg-center"
				style={{
					backgroundImage: `url('https://i.ibb.co/KxqNbw11/Green-and-Yellow-Modern-Fresh-Food-Vegetables-Banner.png')`,
				}}
			>
				<div className="flex flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-6 gap-6">
					{/* Left Content */}
					<div className="w-full lg:w-1/2 text-center lg:text-left">
						<p className="text-white text-sm sm:text-base">Fresh</p>
						<h2 className="text-lg sm:text-2xl font-bold text-white mb-4">
							Drinks
						</h2>
						<a
							href="/shop"
							className="btn bg-white text-black hover:bg-gray-100 px-5 py-2 rounded-lg"
						>
							Shop
						</a>
					</div>

					{/* Right Image */}
					<div className="w-full lg:w-1/2 flex justify-center">
						<img
							src="https://i.ibb.co/8DhhsNFT/image-removebg-preview.png"
							alt="Drinks"
							className="w-full max-w-[180px] sm:max-w-[200px] md:max-w-[250px] object-contain"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TwoCaro
