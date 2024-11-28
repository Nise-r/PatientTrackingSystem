import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'


const login = async (credentials) => {
  // console.log(credentials)
  const request = await axios.post(baseUrl,credentials)
  return request.data
}
const create = async (credentials)=>{
  const request = await axios.post('http://localhost:3001/api/user',credentials)
  return request.data
}

export default { login,create }