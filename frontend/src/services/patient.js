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
//add  prescription
const addPrescription = async (toAdd) =>{
  const config = {
    headers: {Authorization:token}, 
  }
  // console.log(token)
  const request = await axios.post(baseUrl+'/comment',toAdd,config)
  return request.data
}

//adding the patient under a doctor
const addPatient =  async (toAdd) =>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.post(baseUrl+'/doctor',toAdd,config)
  return request.data
}
//Getting the patient data to show on dashboard
const getPatientsData = async (id)=>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.get(baseUrl+`/${id}`,config)
  return request.data
}
//patient adding the daily data
const addPatientData = async (toAdd)=>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.post(baseUrl,toAdd,config)
  return request.data
}
//get the list of patients under the doctor
const getPatients = async (user)=>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.get('http://localhost:3001/api/user',config)
  return request.data.find(u => user.username === "blaa").patients
}

const edit = async (credentials)=>{
  const config = {
    headers: {Authorization:token}, 
  }
  const request = await axios.post('http://localhost:3001/api/user/edit',credentials,config)
  return request.data
}

export default { getAll, create ,setToken,
 addPatient,addPatientData,getPatients,
 getPatientsData, addPrescription,edit }