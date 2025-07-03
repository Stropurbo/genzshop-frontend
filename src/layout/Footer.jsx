import React from 'react'

const Footer = () => {
	return (
		<footer className="bg-yellow-100">
			<div className="footer sm:footer-horizontal text-base-content p-10">
				<nav>
					<a
						to="/"
						className="text-xl bg-gradient-to-r from-red-500 to-black bg-clip-text text-transparent font-bold pb-5"
					>
						Gen <span className="text-2xl">Z</span>
					</a>
					<p className="max-w-3xs text-justify">
						GenZ is a modern e-commerce platform offering trendy, high-quality
						products tailored for the new generation. We focus on style, value, and
						customer satisfaction — making your shopping smart and seamless.
					</p>

					<div className="grid grid-flow-col gap-4 py-5">
						<a
							href="https://x.com/stropurbo"
							target="_blank"
							className="hover:text-blue-400"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
							</svg>
						</a>
						<a
							href="https://youtube.com/stropurbo"
							target="_blank"
							className="hover:text-red-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
							</svg>
						</a>
						<a
							href="https://facebook.com/stropurbo7"
							target="_blank"
							className="hover:text-blue-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								className="fill-current"
							>
								<path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
							</svg>
						</a>
					</div>
				</nav>

				{/* <nav>
					<h6 className="footer-title">Company</h6>
					<a className="link link-hover">About us</a>
					<a className="link link-hover">Contact</a>
					<a className="link link-hover">Jobs</a>
					<a className="link link-hover">Press kit</a>
				</nav> */}
				<nav className="w-full sm:w-auto sm:ml-auto sm:text-right text-left">
					<h6 className="footer-title">Company</h6>
					<a className="font-bold">Location</a>
					<a className="max-w-3xs text-justify">
						Shop-4D-021 C1 & C2 (East Court), Level-4, Block-D, Jamuna Future Park,
						Dhaka
					</a>
					<a className="font-bold">E-mail:</a>
					<a
						href="mailto:sabbir.hasan.ca@gmail.com"
						className="link link-hover"
					>
						sabbir.hasan.ca@gmail.com
					</a>
				</nav>
			</div>

			<div className="flex justify-between items-center ml-10 mr-5 mb-1 flex-wrap gap-2">
				<p className="text-sm">
					Copyright © {new Date().getFullYear()} - All rights reserved by GenZ.
				</p>
				<img
					src="https://i.ibb.co/pj4Wh6NK/payment.png"
					alt="Payment Methods"
					className="w-full sm:w-40 md:w-48 h-auto object-contain"
				/>
			</div>
		</footer>
	)
}

export default Footer
