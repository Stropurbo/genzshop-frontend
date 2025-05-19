import React from 'react'

const StatCard = ({ icon, title, value }) => {
	const isImage = typeof icon === 'string'

	return (
		<div className="card bg-base-100 shadow-sm transform transition duration-300 hover:-translate-y-1 hover:shadow-md">
			<div className="card-body p-2">
				<div className="flex flex-col items-center gap-2">
					<div className="h-10 w-10">
						{isImage ? (
							<img
								src={icon}
								alt="title"
							/>
						) : (
							icon
						)}
					</div>
					<h3 className="text-sm font-medium">{title}</h3>
				</div>
				<p className="text-xl font-bold text-center">{value}</p>
			</div>
		</div>
	)
}

export default StatCard
