import axios from 'axios'
const baseUrl = 'https://api.groq.com/openai/v1/chat/completions'


const getLlmResponse = async (input) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": "You are a medical data analyst. You look at the given vitals of patient like blood pressure, heart rate,glucose level,etc and give suggestions on the type of disease and its name. the data can be of multiple days in a dictionary of arrays.Don't give long summary just give your thoughts in 50-70 words max and convey the important details only."
            },
            {
                "role": "user",
                "content": input
            }
          ]
      },
      {
          headers: {
              'Authorization': `Bearer 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`,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
const getLlmResponse2 = async (input) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": "You are a medical data analyst. You look at the given vitals of patient like blood pressure, heart rate,etc  also the patient comments day by day and also look at the day to day routine of patient. the data can be of multiple days in a dictionary of arrays.you don't need to give details about your observations. just give advice on the routine to have better health according to  their vitals. also provide changes in their routine or prevent any bad practices of patient. Just provide changes to patient routine nothing else."
            },
            {
                "role": "user",
                "content": input
            }
          ]
      },
      {
          headers: {
              'Authorization': `Bearer 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`,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
const getLlmResponse3 = async (input) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": "You are a health advisor. you will be given the summary of how the patient can improve their health based on their vitals. You need to format the given text and remove every details about vitals and make sure the response only contains advice on routine and day to day life of patient."
            },
            {
                "role": "user",
                "content": input
            }
          ]
      },
      {
          headers: {
              'Authorization': `Bearer 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`,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
export default { getLlmResponse ,getLlmResponse2, getLlmResponse3}