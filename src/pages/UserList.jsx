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

	const deleteUser = async (id) => {
		try {
			await AuthApiClient.delete(`/admin/user/${id}/`)
			setUser((authU) => authU.filter((user) => user.id !== id))
			alert('User delete successfull')
		} catch (error) {
			console.log(error)
			alert('Failed to delete user')
		}
	}

	return (
		<div className="mx-auto max-w-5xl p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">Total Users: {user.length}</h2>

			<div className="overflow-x-auto shadow-lg rounded-lg">

				<table className="table-auto w-full text-left border-collapse bg-white">
					<thead className="bg-gray-100">
						<tr>
							<th className="px-4 py-2 border">NO.</th>
							<th className="px-4 py-2 border">Email</th>
							<th className="px-4 py-2 border text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{user.map((authUser, index) => (
							<tr
								key={authUser.id}
								className="border-t hover:bg-gray-50"
							>
								<td className="px-4 py-2 border">{index + 1}</td>
								<td className="px-4 py-2 border">{authUser.email}</td>
								<td className="px-4 py-2 border text-center">
									<button
										onClick={() => deleteUser(authUser.id)}
										className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
									>
										Delete
									</button>
								</td>
							</tr>
						))}
						{user.length === 0 && (
							<tr>
								<td
									colSpan="3"
									className="text-center py-4 text-gray-500"
								>
									No users found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
export default UserList
