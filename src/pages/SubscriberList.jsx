import { useEffect, useState } from 'react'
import AuthApiClient from '../services/auth-api-client'

const SubscriberList = () => {
	const [user, setUser] = useState([])

	useEffect(
		() => async () => {
			try {
				const res = await AuthApiClient.get('/getupdate')
				setUser(res.data.results)
			} catch (error) {
				console.error(error)
			}
		},
		[],
	)

	return (
		<div className="mx-auto max-w-4xl p-4">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Total Subscriber: {user.length}
			</h2>

			<div className="overflow-x-auto w-full shadow-lg rounded-lg">
				
				<table className="table-auto w-full border-collapse bg-white">
					<thead className="w-full">
						<tr>
							<th className="px-4 py-2 text-left">NO.</th>
							<th className="px-4 py-2 text-left">Email</th>
						</tr>
					</thead>

					<tbody>
						{user.map((subscriber, index) => (
							<tr
								key={subscriber.id}
								className="border-t"
							>
								<td className="px-4 py-2">{index + 1}</td>
								<td className="px-4 py-2">{subscriber.mail}</td>
							</tr>
						))}
						{user.length === 0 && (
							<tr>
								<td
									className="px-4 py-2 text-center"
									colSpan="2"
								>
									No subscribers found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default SubscriberList
