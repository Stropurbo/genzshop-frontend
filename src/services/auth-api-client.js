import axios from 'axios'

const AuthApiClient = axios.create({
	// baseURL: 'https://genz-shop.vercel.app/api/v1',
	baseURL: "http://127.0.0.1:8000/api/v1/",
})

AuthApiClient.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('authTokens')
		if (token) {
			config.headers.Authorization = `JWT ${JSON.parse(token).access}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

export default AuthApiClient
