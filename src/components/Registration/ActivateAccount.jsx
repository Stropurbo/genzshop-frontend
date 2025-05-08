import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import ErrorAlert from '../ErrorAlert'
import apiClient from '../../services/api-client'

const ActivateAccount = () => {
	const { uid, token } = useParams()
	const [message, setMessage] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		apiClient
			.post('/auth/users/activation/', { uid, token })
			.then((res) => {
				setMessage('Account activate Successfully.')
				setTimeout(() => {
					navigate('/login')
				}, 1000)
			})
			.catch((error) => {
				setError('Somethings went wrong. Please check your activation url.')
				console.log(error)
			})
	}, [uid, token])

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-500">
			<div className="card bg-primary text-primary-content w-96">
				<div className="card-body">
					<h2 className="card-title">Account Activation.</h2>

					{message && (
						<div
							role="alert"
							className="alert alert-success"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 shrink-0 stroke-current"
								fill="none"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							<span> {message} </span>
						</div>
					)}
					{/* {error && <ErrorAlert  errormessage={error} />} */}
				</div>
			</div>
		</div>
	)
}

export default ActivateAccount
