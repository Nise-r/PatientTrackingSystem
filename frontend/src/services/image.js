import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/user'


// const login = async (credentials) => {
//   // console.log(credentials)
//   const request = await axios.post(baseUrl,credentials)
//   return request.data
// }
// const create = async (credentials)=>{
//   const request = await axios.post('http://localhost:3001/api/user',credentials)
//   return request.data
// }
const getImages = async (id)=>{
  const request = await axios.get(baseUrl+`/rec/${id}`)
  return request.data
}

const postImage = async (formData)=>{
  const request = await axios.post(baseUrl+'/add',formData)
  return request.data
}

export default { getImages,postImage}