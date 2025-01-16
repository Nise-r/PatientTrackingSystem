import axios from 'axios'
const baseUrl = 'https://api.groq.com/openai/v1/chat/completions'
const apiKey = 'Bearer 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 asd'
const apiKeyTest = 'Bearer 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'

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
              'Authorization': apiKey,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
const getLlmResponseChatbot = async (input,data) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": `You are a medical data chatbot.  You look at the vitals of the patient and give your advice on it's basis.The data can be of multiple days in a dictionary of arrays.you have to answer general questions to doctor queries related to given data. The previous queries are also given, you  have to answer the last query by user only. `
            },
            {
                "role": "user",
                "content": `DATA: ${data}\n QUERIES: ${input} `
            }
          ]
      },
      {
          headers: {
              'Authorization': apiKey,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}

const getLlmResponseSpecific = async (input,specific)=>{
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": `You are a medical data analyst. You look at the ${specific} vitals of the patient and give your advice on it's basis.The data can be of multiple days in a dictionary of arrays.Only give your response in 50-60 words maximum. `
            },
            {
                "role": "user",
                "content": input
            }
          ]
      },
      {
          headers: {
              'Authorization': apiKey,
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
              'Authorization': apiKey,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
const getLlmResponseAdvice = async (input,patientComments,previousPrescriptions,routine) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": "You are a medical data analyst. you are given  data on patient routine, their comments on day to day health and doctor prescriptions. You need to analyze the data and provide advice on how can they better their routine and some activities to improve health."
            },
            {
                "role": "user",
                "content": `DATA: ${input}` + `\nPATIENT_COMMENTS: ${patientComments}.\n DOCTOR_PRESCRIPTIONS: ${previousPrescriptions}.\n ROUTINE: ${routine}. `
            }
          ]
      },
      {
          headers: {
              'Authorization': apiKey,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}

const getLlmResponseClean = async (input) => {
  const request = await axios.post(
      baseUrl,
      {
          "model": "llama3-8b-8192",
          "messages": [
            {
                "role": "system",
                "content": "You role is to clean the data. you will be given the summary of how the patient can improve their health. You need to format the given text to remove information related to vitals.Remove every special character like '*' and points should be numbered. Also remove any text that identify the response as machine generated."
            },
            {
                "role": "user",
                "content": input
            }
          ]
      },
      {
          headers: {
              'Authorization': apiKey,
              'Content-Type': 'application/json',
          },
      }
  )
  // console.log(request.data)
  return request.data
}
export default { getLlmResponse, getLlmResponseChatbot ,getLlmResponse2, getLlmResponseClean, getLlmResponseSpecific, getLlmResponseAdvice}