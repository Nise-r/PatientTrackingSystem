import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/patients'

let token = null
let user = null

const setToken = newToken =>{
  token = `Bearer ${newToken}`
}
const setUser = newUser =>{
  user = JSON.parse(newUser)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async (toAdd)=>{
  const config = {
    headers: {Authorization:token}, 
  }

  const request = await axios.post(baseUrl,toAdd,config)
  return request.data
}
const addPatient =  async (toAdd) =>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.post(baseUrl+'/doctor',toAdd,config)
  return request.data
}

const addPatientData = async (toAdd)=>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.post(baseUrl,toAdd,config)
  return request.data
}
export default { getAll, create ,setToken, addPatient,addPatientData}