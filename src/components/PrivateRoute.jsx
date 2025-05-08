import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }) => {
	const { user } = useAuthContext()
	if (user === null)
		return (
			<p className="flex justify-center items-center">
				<span className="loading loading-spinner loading-lg mt-7"></span>
			</p>
		)
	return user ? children : <Navigate to="/login"></Navigate>
}

export default PrivateRoute
