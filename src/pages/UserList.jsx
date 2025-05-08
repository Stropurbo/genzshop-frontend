import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'

const UserList = () => {
	const [user, setUser] = useState([])

	useEffect(
		() => async () => {
			try {
				const res = await AuthApiClient.get('/auth/users/')
				setUser(res.data.results)
			} catch (error) {
				console.error(error)
			}
		},
		[],
	)

	// const deleteUser = async (id) => {
	// 	try {
	// 		await AuthApiClient.delete(`/auth/users/${id}/`)
	// 		setUser((authU) => authU.filter((user) => user.id !== id))
	// 		alert('User delete successfull')

	// 	} catch (error) {
	// 		console.log(error)
	//         console.log(error.response?.data || error.message)

	// 	}
	// }

	return (
		<div className="mx-auto">
			<div className="card bg-base-100 w-42 max-w-xs h-24 shadow-md mb-4">
				<div className="card-body rounded-lg items-center justify-center">
					<h2 className="card-title text-center text-base md:text-xl">Total User</h2>
					<p className="text-center text-lg md:text-2xl font-semibold">
						{user.length}
					</p>
				</div>
			</div>

			{user.map((authUser) => (
				<div
					key={authUser.id}
					className="mb-2 p-4 rounded-lg shadow"
				>
					<div className="flex justify-between items-center">
						<p> {authUser.email} </p>
						{/* <button
							onClick={() => deleteUser(authUser.id)}
							className="btn btn-error text-white"
						>
							Delete
						</button> */}
					</div>
				</div>
			))}
		</div>
	)
}
export default UserList
