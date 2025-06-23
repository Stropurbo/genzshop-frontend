import React from 'react'
import useAuthContext from '../hooks/useAuthContext'
import { Navigate } from 'react-router'

const PrivateRoute = ({ children }) => {
	const { user } = useAuthContext()
	if (user === null)
		return (
			<div className="fixed inset-0 flex justify-center items-center bg-white/60 z-50">
				<span className="loading loading-spinner loading-lg text-yellow-500"></span>
			</div>
		)
	return user ? children : <Navigate to="/login"></Navigate>
}

export default PrivateRoute
