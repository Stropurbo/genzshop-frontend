import axios from "axios";


const apiClient =  axios.create({
    baseURL: "https://sci-mart.vercel.app/api/v1"
})

export default apiClient;