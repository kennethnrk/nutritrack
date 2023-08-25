import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
})

export const userSignup = async(payload)=>{
    try {
        const response = await axiosInstance.post('signup',payload)
        return response.data

    } catch (error) {
        return error.response.data
    }
}
export const userLogin = async(payload)=>{
    try {
        const response = await axiosInstance.post('login',payload)
        return response.data

    } catch (error) {
        return error.response.data
    }
}

export const getGoal = async(payload)=>{
    try {
        const response = await axiosInstance.post('goal',payload)
        return response.data

    } catch (error) {
        return error.response.data
    }
}

export const setGoalPost = async(payload)=>{
    try {
        const response = await axiosInstance.post('setgoal',payload)
        return response.data

    } catch (error) {
        return error.response.data
    }
}

export const getFood = async()=>{
    try {
        const response = await axiosInstance.get('food')
        return response.data

    } catch (error) {
        return error.response.data
    }
}

