import { useForm } from 'react-hook-form'
import useAuthContext from '../hooks/useAuthContext'
import ErrorAlert from '../components/ErrorAlert'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react'
import { DEMO_USERS } from '../config/demoCredentials'

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm()

	const { errMsg, loginUser } = useAuthContext()
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const onSubmit = async (data) => {
		setLoading(true)
		try {
			await loginUser(data)
			navigate('/')
		} catch (error) {
			console.log('Login Failed', error)
		} finally {
			setLoading(false)
		}
	}

	const handleDemoLogin = (type) => {
		const demoCredentials = DEMO_USERS[type]

		setValue('email', demoCredentials.email)
		setValue('password', demoCredentials.password)
	}

	return (
		<div className="flex min-h-screen items-center justify-center px-4 py-12 bg-base-200">
			<div className="card w-full max-w-md bg-base-100 shadow-xl">
				<div className="card-body">
					{errMsg && <ErrorAlert errormessage={errMsg} />}

					<form
						className="space-y-4 mt-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex justify-between">
							<h2 className="card-title text-2xl font-bold">Sign in</h2>

							<button
								type="button"
								className="btn btn-sm btn-outline btn-info"
								onClick={() => handleDemoLogin('user')}
							>
								Demo User
							</button>
						</div>

						<div className="form-control">
							<input
								id="email"
								type="email"
								placeholder="Your@email.com"
								className="input input-bordered w-full"
								{...register('email', { required: 'E-mail is required.' })}
							/>
							{errors.email && (
								<span className="text-error">{errors.email.message} </span>
							)}
						</div>

						<div className="form-control">
							<input
								id="password"
								type="password"
								placeholder="Password"
								className="input input-bordered w-full "
								{...register('password', { required: 'Password is required.' })}
							/>
							{errors.password && (
								<span className="text-error"> {errors.password.message} </span>
							)}
						</div>

						<button
							type="submit"
							className="btn btn-warning w-full text-black rounded-md"
							disabled={loading}
						>
							{loading ? 'Logging In' : 'Login'}
						</button>
					</form>

					<div className="text-center mt-4">
						<p className="text-base-content/70">
							Don&apos;t have an account?{' '}
							<a
								href="/register"
								className="link link-primary"
							>
								Sign up
							</a>
						</p>

						<Link
							to="/forget-password"
							className="link link-primary"
						>
							Forgot Password
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
