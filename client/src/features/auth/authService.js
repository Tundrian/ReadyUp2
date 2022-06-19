// Make the http requests and setting data in localstorage
import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth/'

// Register user
const register = async (userData) => {

    const response = await axios.post(API_URL + 'signup', userData)

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
}

// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
  
    return response.data
}

const logout = async () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    login,
    logout
}

export default authService