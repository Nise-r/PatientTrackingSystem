import { useState,useEffect} from 'react'
import './App.css'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate,
   Navigate
} from 'react-router-dom'
// import {Login} from './pages/login'
import patientService from './services/patient'
import loginService from './services/login'
import llmService from './services/llm'
import Notification from './components/Notification'
import axios from 'axios'




const patientsData = {
  1:{
    name:'mahipal',
    phone:'08120332038',
    height: 175,
    weight: 70,
    bmi: 22.9,
    data: {
  "01-11-2024": {
    heartRate: 78,
    bloodPressure: { systolic: 118, diastolic: 78 },
    oxygenLevel: 96,
    previousPrescriptions: 'Take 500mg vitamin C daily',
    patientComments: 'Feeling better after the flu',
    glucoseLevel: 92,
    temperature: 36.7,
    pain: 0,
  },
  "02-11-2024": {
    heartRate: 75,
    bloodPressure: { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    previousPrescriptions: 'Maintain hydration and balanced diet',
    patientComments: 'No complaints today',
    glucoseLevel: 94,
    temperature: 36.6,
    pain: 1,
  },
  "03-11-2024": {
    heartRate: 82,
    bloodPressure: { systolic: 125, diastolic: 85 },
    oxygenLevel: 93,
    previousPrescriptions: 'Monitor blood pressure regularly',
    patientComments: 'Slight headache in the evening',
    glucoseLevel: 96,
    temperature: 37.2,
    pain: 2,
  },
  "04-11-2024": {
    heartRate: 77,
    bloodPressure: { systolic: 115, diastolic: 78 },
    oxygenLevel: 97,
    previousPrescriptions: 'Reduce sodium intake',
    patientComments: 'Felt tired after work',
    glucoseLevel: 91,
    temperature: 36.8,
    pain: 1,
  },
  "05-11-2024": {
    heartRate: 79,
    bloodPressure: { systolic: 110, diastolic: 72 },
    oxygenLevel: 94,
    previousPrescriptions: 'Continue morning walks',
    patientComments: 'Good energy levels throughout the day',
    glucoseLevel: 89,
    temperature: 36.5,
    pain: 0,
  },
  "06-11-2024": {
    heartRate: 85,
    bloodPressure: { systolic: 122, diastolic: 80 },
    oxygenLevel: 92,
    previousPrescriptions: 'Drink 2L water daily',
    patientComments: 'Mild chest discomfort during exertion',
    glucoseLevel: 88,
    temperature: 37.5,
    pain: 2,
  },
  "07-11-2024": {
    heartRate: 74,
    bloodPressure: { systolic: 118, diastolic: 79 },
    oxygenLevel: 96,
    previousPrescriptions: 'Take prescribed antihypertensive',
    patientComments: 'No issues today',
    glucoseLevel: 90,
    temperature: 36.4,
    pain: 0,
  },
  "08-11-2024": {
    heartRate: 76,
    bloodPressure: { systolic: 112, diastolic: 76 },
    oxygenLevel: 97,
    previousPrescriptions: 'Eat more fruits and vegetables',
    patientComments: 'Slight fatigue in the afternoon',
    glucoseLevel: 87,
    temperature: 36.6,
    pain: 1,
  },
  "09-11-2024": {
    heartRate: 80,
    bloodPressure: { systolic: 120, diastolic: 82 },
    oxygenLevel: 95,
    previousPrescriptions: 'Maintain current routine',
    patientComments: 'No significant complaints',
    glucoseLevel: 93,
    temperature: 36.7,
    pain: 0,
  },
  "10-11-2024": {
    heartRate: 73,
    bloodPressure: { systolic: 118, diastolic: 79 },
    oxygenLevel: 96,
    previousPrescriptions: 'Daily 30-minute exercise',
    patientComments: 'Good day, no issues',
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 0,
  },
  "11-11-2024": {
    heartRate: 77,
    bloodPressure: { systolic: 118, diastolic: 78 },
    oxygenLevel: 96,
    previousPrescriptions: 'Continue prescribed medication',
    patientComments: 'Feeling a bit stressed at work',
    glucoseLevel: 91,
    temperature: 36.8,
    pain: 1,
  },
  "12-11-2024": {
    heartRate: 80,
    bloodPressure: { systolic: 121, diastolic: 81 },
    oxygenLevel: 95,
    previousPrescriptions: 'Drink 2L water daily',
    patientComments: 'Mild headache in the afternoon',
    glucoseLevel: 90,
    temperature: 36.7,
    pain: 2,
  },
  "13-11-2024": {
    heartRate: 75,
    bloodPressure: { systolic: 116, diastolic: 76 },
    oxygenLevel: 97,
    previousPrescriptions: 'Daily 30-minute walk',
    patientComments: 'Energy levels are good',
    glucoseLevel: 88,
    temperature: 36.5,
    pain: 0,
  },
  "14-11-2024": {
    heartRate: 79,
    bloodPressure: { systolic: 118, diastolic: 77 },
    oxygenLevel: 94,
    previousPrescriptions: 'Monitor blood pressure',
    patientComments: 'Mild fatigue in the evening',
    glucoseLevel: 92,
    temperature: 37.0,
    pain: 1,
  },
  "15-11-2024": {
    heartRate: 76,
    bloodPressure: { systolic: 120, diastolic: 80 },
    oxygenLevel: 96,
    previousPrescriptions: 'Continue current routine',
    patientComments: 'No issues reported today',
    glucoseLevel: 91,
    temperature: 36.4,
    pain: 0,
  },
  "16-11-2024": {
    heartRate: 78,
    bloodPressure: { systolic: 119, diastolic: 79 },
    oxygenLevel: 95,
    previousPrescriptions: 'Avoid caffeine before bedtime',
    patientComments: 'Slept better last night',
    glucoseLevel: 89,
    temperature: 36.5,
    pain: 0,
  },
  "17-11-2024": {
    heartRate: 81,
    bloodPressure: { systolic: 123, diastolic: 82 },
    oxygenLevel: 94,
    previousPrescriptions: 'Monitor heart rate',
    patientComments: 'Slight chest tightness during exercise',
    glucoseLevel: 93,
    temperature: 37.2,
    pain: 2,
  },
  "18-11-2024": {
    heartRate: 74,
    bloodPressure: { systolic: 115, diastolic: 75 },
    oxygenLevel: 97,
    previousPrescriptions: 'Maintain hydration',
    patientComments: 'Good energy throughout the day',
    glucoseLevel: 90,
    temperature: 36.6,
    pain: 0,
  },
  "19-11-2024": {
    heartRate: 76,
    bloodPressure: { systolic: 117, diastolic: 78 },
    oxygenLevel: 96,
    previousPrescriptions: 'Continue balanced diet',
    patientComments: 'No complaints today',
    glucoseLevel: 88,
    temperature: 36.5,
    pain: 0,
  },
  "20-11-2024": {
    heartRate: 79,
    bloodPressure: { systolic: 119, diastolic: 80 },
    oxygenLevel: 95,
    previousPrescriptions: 'Monitor glucose levels',
    patientComments: 'Feeling slightly tired',
    glucoseLevel: 92,
    temperature: 36.8,
    pain: 1,
  },
  "21-11-2024": {
    heartRate: 81,
    bloodPressure: { systolic: 122, diastolic: 82 },
    oxygenLevel: 94,
    previousPrescriptions: 'Regular physical activity recommended',
    patientComments: 'Had a productive day',
    glucoseLevel: 89,
    temperature: 36.7,
    pain: 0,
  },
  "22-11-2024": {
    heartRate: 77,
    bloodPressure: { systolic: 118, diastolic: 78 },
    oxygenLevel: 96,
    previousPrescriptions: 'Reduce screen time before bed',
    patientComments: 'Slept well last night',
    glucoseLevel: 87,
    temperature: 36.5,
    pain: 0,
  },
  "23-11-2024": {
    heartRate: 75,
    bloodPressure: { systolic: 116, diastolic: 77 },
    oxygenLevel: 97,
    previousPrescriptions: 'Monitor glucose levels',
    patientComments: 'No significant complaints',
    glucoseLevel: 90,
    temperature: 36.6,
    pain: 0,
  },
  "24-11-2024": {
    heartRate: 80,
    bloodPressure: { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    previousPrescriptions: 'Stay hydrated',
    patientComments: 'Feeling slightly tired in the evening',
    glucoseLevel: 91,
    temperature: 36.7,
    pain: 1,
  },
  "25-11-2024": {
    heartRate: 82,
    bloodPressure: { systolic: 123, diastolic: 82 },
    oxygenLevel: 94,
    previousPrescriptions: 'Reduce sodium intake',
    patientComments: 'Mild chest discomfort during the day',
    glucoseLevel: 93,
    temperature: 37.1,
    pain: 2,
  },
  "26-11-2024": {
    heartRate: 74,
    bloodPressure: { systolic: 116, diastolic: 75 },
    oxygenLevel: 97,
    previousPrescriptions: 'Continue morning exercise',
    patientComments: 'No issues today',
    glucoseLevel: 88,
    temperature: 36.4,
    pain: 0,
  },
  "27-11-2024": {
    heartRate: 79,
    bloodPressure: { systolic: 118, diastolic: 79 },
    oxygenLevel: 96,
    previousPrescriptions: 'Monitor heart rate',
    patientComments: 'Feeling better after a long week',
    glucoseLevel: 89,
    temperature: 36.5,
    pain: 0,
  },
  "28-11-2024": {
    heartRate: 77,
    bloodPressure: { systolic: 119, diastolic: 80 },
    oxygenLevel: 95,
    previousPrescriptions: 'Continue current routine',
    patientComments: 'Good energy levels today',
    glucoseLevel: 90,
    temperature: 36.6,
    pain: 0,
  },
  "29-11-2024": {
    heartRate: 76,
    bloodPressure: { systolic: 117, diastolic: 78 },
    oxygenLevel: 95,
    previousPrescriptions: 'Focus on balanced nutrition',
    patientComments: 'No complaints today',
    glucoseLevel: 91,
    temperature: 36.7,
    pain: 0,
  },
  "30-11-2024": {
    heartRate: 80,
    bloodPressure: { systolic: 121, diastolic: 81 },
    oxygenLevel: 94,
    previousPrescriptions: 'Keep tracking blood pressure',
    patientComments: 'Feeling relaxed',
    glucoseLevel: 92,
    temperature: 36.8,
    pain: 0,
  }
  }
}

}



const patientComments = {
  '22-10-15':'blood pressure is  low',
  '23-10-15':'severe headache',
  '24-10-15':'weakness in legs',
  '25-10-15':'loose motions'
}
const previousPrescriptions = {
  '22-10-15':'1mg paracitamol',
  '23-10-15':'dolo 700mg',
  '24-10-15':'penicilin',
  '25-10-15':'sumocold',
  '26-10-15':'1mg paracitamol',
  '27-10-15':'dolo 700mg',
  '28-10-15':'penicilin',
  '29-10-15':'sumocold',
  '30-10-15':'1mg paracitamol',
  '31-10-15':'dolo 700mg',
  '32-10-15':'penicilin',
  '33-10-15':'sumocold'
}

const createChartData = (label,indexes, data) => ({
    labels: indexes,
    datasets: [
      {
        label,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
})

const Profile=({isSideOpenL,toggleSidebarL,user,message,setMessage})=>{
  const [name, setName] = useState('')
  const [phone,setPhone] = useState(0)
  const [email,setEmail] = useState('')
  const [address,setAddress] = useState('')
  const [routine, setRoutine] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
        // Save the current path in localStorage
        localStorage.setItem("lastVisitedPage", "/profile");
      }
    
  // if(user.address!=null)
  //   setAddress(user.address)
  }, [user]);

  useEffect(()=>{
    if(isSideOpenL) toggleSidebarL()
    setName(user.name)
    setPhone(user.phone)
    setEmail(user.email)
    setRoutine(user.routine)
  },[])

  const handler = (event,handler)=>{
    // console.log(event.target.value)
    handler(event.target.value)
  }
  const submitHandler = async (event)=>{
    event.preventDefault()
    try {
      const createdUser = await patientService.edit({ name, phone ,email,address,routine})
      // window.localStorage.setItem('loggedUser', JSON.stringify(loadedUser))
      setName('')
      setPhone(null)
      setEmail('')
      setAddress('')
      setRoutine('')

      user.name=name
      user.email=email
      user.phone=phone

      navigate('/login')

      setMessage('Succesfully edited the details')
      setTimeout(()=>{
        setMessage(null)
      },3000)

    
      
    } catch (exception) {
      console.error('updating user failed: ', exception)

    }
  }


  // console.log(user)
  return (
    <div> 
    <div className="nav">
      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
          <button onClick={toggleSidebarL} className="close-btn">✖</button>
          <ul className="sidebar-tabs">
            <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
  </svg></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
            {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
            {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
            {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
            <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
            {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
          </ul>
        </div>
      
      <div className='navbar'>
        <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
        </div>
        <p  className='patient'> {user.name}</p>
      </div>
    </div>
    <Notification message={message}/>
    <div className="container">
      <div className="profile">
        <h2>Profile</h2>
        <form onSubmit={submitHandler}>
          <p>Name: <input onChange={(e)=>handler(e,setName)} value={name} type='string'/></p>
          <p>Phone: <input onChange={(e)=>handler(e,setPhone)} value={phone} type='number'/></p>
          <p>Email: <input onChange={(e)=>handler(e,setEmail)} value={email} type='string'/></p>
          <p>Address: <input onChange={(e)=>handler(e,setAddress)} value={address} type='string'/></p>
          {user.type=='patient'?<p>Routine: <textarea type='string' rows="5" cols="30" onChange={(e)=>handler(e,setRoutine)} value={routine}/></p>:null }
          <button type='submit'>Edit</button>
        </form>
      </div>
    </div>
    {/*<p>Name: {user.name}</p>
    <p>Phone: {user.phone}</p>
    <p>Email: {user.email}</p>
    <p>Address: {user.address==null?user.address:null}</p>*/}
    </div>
  )
}
const Settings=({isSideOpenL,toggleSidebarL,user,message,setMessage})=>{
  useEffect(() => {
  if (user) {
    // Save the current path in localStorage
    localStorage.setItem("lastVisitedPage", "/settings");
  }
}, [user]);

  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])

  return (
    <div> 
    <div className="nav">
    <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg  xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
          {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
          {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
          {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      {/*<Notification message={message}/>*/}
      
      <div className='navbar'>
      <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
      </div>
        <p  className='patient'>{user.name}</p>
      </div>
    </div>
    <Notification message={message}/>
    <div className="container">
      <div className="profile">
        <p>Theme Preferences:Light Dark</p>
        <p>Language Settings: English Hindi</p>
        <p>Time zone: India</p>
      </div>
      {/*<p>These are settings</p>*/}
    </div>
    </div>
  )
}
const Patients= ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const navigate = useNavigate()
  const [patients,setPatients] = useState([])

  useEffect(() => {
    if (user) {
      // Save the current path in localStorage
      localStorage.setItem("lastVisitedPage", "/patients");
    }
  }, [user]);
  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])
  const getP = async ()=>{
    const patients = await patientService.getPatients(user)
    setPatients(patients)
  }
  useEffect(()=>{
    getP()
  },[])
  // const patients = patientService.getPatients(user)
  // Object.entries(patients).map(([key,value])=>console.log(value.name))
  
  return (
    <div> 
    <div className="nav">
      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
          <button onClick={toggleSidebarL} className="close-btn">✖</button>
          <ul className="sidebar-tabs">
            <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
  </svg></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
            {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
            {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
            {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
            <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
            {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
          </ul>
        </div>
        
        <div className='navbar'>
          <div className="hover">
          <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
  </svg></p>
          </div>
          <p  className='patient'>{user.name}</p>

        </div>
      </div>
      <Notification message={message}/>
      <div className="container">
        <div className="profile">
          {/*{Object.entries(patientsData).map(([key,value])=><p key = {key} onClick={()=>navigate('/dashboard/'+value.name)}>{value.name}  {value.phone}</p>)}*/}
          {Object.entries(patients).map(([key,value])=><p className="hover" key = {key} onClick={()=>navigate('/dashboard/'+value.name)}>{value.name}  {value.phone}</p>)}
        </div>
      </div>
    </div>
  )
}
const CreateAccount = ({message,setMessage})=>{
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState(null)
  const [email, setEmail] = useState('')
  const [type,setType] = useState('')
  const navigate  = useNavigate()

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  // const [message, setMessage] = useState('');

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSelectedFile(file);
  //     setPreview(URL.createObjectURL(file)); // Preview the selected file
  //   }
  // };

  // const handleUpload = async (e) => {
  //   e.preventDefault();
  //   if (!selectedFile) {
  //     setMessage('Please select a file to upload.');
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('profilePicture', selectedFile);

  //   try {
  //     const response = await axios.put(`/users/${userId}/profile-picture`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     setMessage(response.data.message);
  //   } catch (error) {
  //     setMessage('Error uploading profile picture.');
  //   }
  // };

  const handler = (event,handler)=>{
    // console.log(event.target.value)
    handler(event.target.value)
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const createdUser = await loginService.create({ username,name, password ,phone,email,type})
      // window.localStorage.setItem('loggedUser', JSON.stringify(loadedUser))
      setUsername('')
      setName('')
      setPassword('')
      setPhone(null)
      setEmail('')
      setType('')

      // setUser(loadedUser)
      // patientService.setToken(loadedUser.token)
      // console.log(createdUser)
      // const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/patients"
      // if (!selectedFile) {
      //   console.log('Please select a file to upload.');
      //   return;
      // }

      // const formData = new FormData();
      // formData.append('profilePicture', selectedFile);

      // try {
      //   const response = await axios.put(`/users/${createdUser.id}/profile-picture`, formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   });
      //   console.log(response);
      // } catch (error) {
      //   console.log('Error uploading profile picture.');
      // }
      navigate('/login')
    } catch (exception) {
      console.error('creating user failed: ', exception)
      // alert('Invalid credentials, please try again.')
    }
  }
  return (
    <div className="container">
      <div className="profile">
        <h2>Create Account</h2>
        <Notification message={message}/>
        <form onSubmit={submitHandler}>
          <p>Username: <input onChange={(e)=>handler(e,setUsername)} type='string'/></p>
          <p>Name: <input onChange={(e)=>handler(e,setName)} type='string'/></p>
          <p>Password: <input onChange={(e)=>handler(e,setPassword)} type='string'/></p>
          <p>Phone: <input onChange={(e)=>handler(e,setPhone)} type='number'/></p>
          <p>Email: <input onChange={(e)=>handler(e,setEmail)} type='string'/></p>
          <div className="container" style={{margin:'10px'}} onChange={(e)=>handler(e,setType)}>
            <input type="radio" value="doctor" onChange={()=>{}} checked={type==="doctor"}/> Doctor
            <input type="radio" value="patient" onChange={()=>{}} checked={type==="patient"}/> Patient
          </div>
          {/*<div>
            <h2>Upload Profile Picture</h2>
            {/*<form onSubmit={handleUpload}>*/}
              {/*<input type="file" accept="image/*" onChange={handleFileChange} />*/}
              {/*{preview && <img src={preview} alt="Preview" style={{ width: '150px', marginTop: '10px' }} />}*/}
              {/*<button type="submit">Upload</button>*/}
            {/*</form>*/}
            {/*{message && <p>{message}</p>}*/}
          {/*</div>*/}
          <button type='submit'>Login</button>
        </form>
        <Link to="/login">Have an account? login</Link>
      </div>
    </div>
  )
}
const LoginPage = ({setUser,message,setMessage})=>{
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const navigate  = useNavigate()

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const loadedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loadedUser))
      setUsername('')
      setPassword('')
      setUser(loadedUser)
      patientService.setToken(loadedUser.token)

      const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/patients"
      navigate(lastVisitedPage)
      setMessage('Succesfully logged in')
      setTimeout(()=>{
        setMessage(null)
      },5000)
    } catch (exception) {
      console.error('Login failed: ', exception)
      alert('Invalid credentials, please try again.')
    }
  }
  const userHandler = (event)=>{
    setUsername(event.target.value)
  }
  const passHandler = (event)=>{
    setPassword(event.target.value)
  }

  return (
    <div className="container">
      <div className="profile">
        <h2>Login</h2>
        <Notification message={message}/>
        <form onSubmit={submitHandler}>
          <p>Username: <input onChange={(e)=>userHandler(e)} type='string'/></p>
          <p>Password: <input onChange={(e)=>passHandler(e)} type='string'/></p>
          <button type='submit'>Login</button>
        </form>
        <Link to="/create">create account</Link>
      </div>
    </div>
  )
}

const Dashboard =({data,user,setIsSideOpenRC,setIsSideOpenRP,isSideOpenRC,isSideOpenRP,isSideOpenL,setIsSideOpenL,toggleSidebarL,toggleSidebarRP,toggleSidebarRC,message,setMessage})=>{
  const [patient,setPatient] = useState([])
  const [comment,setComment] = useState('')
  const [timeRange, setTimeRange] = useState('thisWeek')
  const [filteredData, setFilteredData] = useState([])
  const [LLM,setLLM] = useState('')
  const [LLMHR,setLLMHR] = useState('')
  const [LLMBP,setLLMBP] = useState('')
  const [LLMGL,setLLMGL] = useState('')
  const [LLMOL,setLLMOL] = useState('')
  const [LLMT,setLLMT] = useState('')
  const [LLMP,setLLMP] = useState('')
  const navigate = useNavigate()


  const id = useParams().id

  const getP = async () => {
      const p = await patientService.getPatientsData(id)
      // const resp  = await llmService.getLlmResponse('what is the capital of india')
      // console.log(resp)
      setPatient(p)
      // console.log(p)
  }
  const handler = (event)=>{
    // console.log(event.target.value)
    setComment(event.target.value)
  }
  const submitHandler = async (event)=>{
    event.preventDefault()
    try {
      const name = patient[0].name
      const addPres = await patientService.addPrescription({ name, comment })

      setComment('')

    } catch (exception) {
      console.error('comment failed: ', exception)
      // alert('Invalid credentials, please try again.')
    }
  }

  useEffect(() => {
    getP()
  }, [id])

  const filterData = (range) => {
    const now = new Date();
    const filtered = Object.entries(dataF.data).filter(([key]) => {
      const entryDate = new Date(key.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to Date
      if (range === "all") return true; // No filtering
      if (range === "thisWeek") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return entryDate >= weekAgo && entryDate <= now;
      }
      if (range === "lastWeek") {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(now.getDate() - 14);
        return entryDate >= twoWeeksAgo && entryDate < weekAgo;
      }
      if (range === "lastMonth") {
        const lastMonth = new Date();
        lastMonth.setMonth(now.getMonth() - 1);
        return entryDate.getMonth() === lastMonth.getMonth();
      }
      return false;
    })

    return Object.fromEntries(filtered);
  }

  const llmResponse = async (input)=>{
    const jsonInput = JSON.stringify(input)
    const escapedJson = JSON.stringify(jsonInput)
    // console.log(escapedJson)
    const resp  = await llmService.getLlmResponse(escapedJson)
    setLLM(resp.choices[0].message.content)
    // console.log(resp.choices[0].message.content)
  }
  const specificLlmResponse = async (input,cmd)=>{
    const jsonInput = JSON.stringify(input)
    const escapedJson = JSON.stringify(jsonInput)
    // console.log(escapedJson)
    const resp  = await llmService.getLlmResponse(escapedJson)
    // console.log(resp.choices[0].message.content)
    if(cmd=='hr') setLLMHR(resp.choices[0].message.content)
    if(cmd=='gl') setLLMGL(resp.choices[0].message.content)
    if(cmd=='p') setLLMP(resp.choices[0].message.content)
    if(cmd=='t') setLLMT(resp.choices[0].message.content)
    if(cmd=='ol') setLLMOL(resp.choices[0].message.content)
    if(cmd=='bp') setLLMBP(resp.choices[0].message.content)
    // console.log(resp.choices[0].message.content)
  }

  const dataF = patient[0]

  useEffect(() => {
    if (user && dataF && dataF.name) {
      localStorage.setItem("lastVisitedPage", `/dashboard/${dataF.name}`)
      setFilteredData(filterData('thisWeek'))
      // llmResponse(filteredData)
    }
    // llmResponse()

  }, [user, dataF])

  useEffect(()=>{
    llmResponse(filteredData)
    specificLlmResponse(specificData('heartRate'),'hr')
    specificLlmResponse(specificData('glucoseLevel'),'gl')
    specificLlmResponse(specificData('pain'),'p')
    specificLlmResponse(specificData('temperature'),'t')
    specificLlmResponse(specificData('oxygenLevel'),'ol')
    specificLlmResponse(specificData('bloodPressure'),'bp')
    // console.log(specificData('bloodPressure'))
  },[filteredData])

  const specificData = (key)=>{
    const label  =Object.keys(filteredData)
    const data = Object.values(filteredData).map((value) => value[key])
    const dictionary = {};
    for (let i = 0; i < label.length; i++) {
      dictionary[label[i]] = data[i];
    }

    return dictionary
    // console.log(LLMSpecific)
  }

  if (!patient || patient.length === 0) {
    return <div>Loading...</div>
  }

  if (!dataF || !dataF.data) {
    return <div>Error: No patient data found.</div>
  }
  // console.log(patient[0].name)

  // Function to filter data based on the selected time range
  

  // Update chart data when time range changes
  const handleTimeRangeChange = (event) => {
    const selectedRange = event.target.value
    setTimeRange(selectedRange)
    setFilteredData(filterData(selectedRange))
    // llmResponse(filteredData)
  }

  


  if(dataF)
  return (
    <>
      <div className="nav">
      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          
          {user&&user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
          {user&&user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
          {user&&user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
          {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      
      
      <div className='navbar'>
      <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg></p>
      </div>
        <p  className='patient'>{dataF.name}</p>
      </div>
    </div>
      <Notification message={message}/>
      <div className={`sidebarR ${isSideOpenRP ? 'open' : ''}`}>
        <div>
          <button onClick={toggleSidebarRP} className="close-btn">✖</button>
          <p className="sidebarComm">Previous Prescriptions</p>
          <ul className="sidebar-tabs">
            {Object.entries(dataF.data).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value.previousPrescriptions}</p></div></li>)}
          </ul>
        </div>
        <div className="givePrescription">
          <form onSubmit={submitHandler}>
            <p>Give Prescription</p>
            <p><textarea type='string' rows="5" cols="30" onChange={(e)=>handler(e)} value={comment}/></p>
            <button>Add</button>
          </form>
        </div>
      </div>


      <div className={`sidebarR ${isSideOpenRC ? 'open' : ''}`}>
        <button onClick={toggleSidebarRC} className="close-btn">✖</button>
        <p className="sidebarComm">Patient Comments</p>
        <ul className="sidebar-tabs">
          {Object.entries(dataF.data).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value.patientComments}</p></div></li>)}
        </ul>
      </div>

      <div className='aicomment'>
        {/*<p>Ai Comments</p>*/}
        {LLM==''?<p>Ai Comments</p>:<p>{LLM}</p>}
      </div>

      <div className='patientRow'>
        <button className='btn' onClick={()=>{toggleSidebarRP()}}>Previous Prescriptions</button>
        <button className='btn' onClick={()=>{toggleSidebarRC()}}>Patients Comments</button> 
      </div>

      <div className="selectDate">
        Select Date 
        <select value={timeRange} onChange={handleTimeRangeChange}>
          <option value="all">All</option>
          <option value="thisWeek">this week</option> 
          <option value="lastWeek">last week</option>
          <option value="lastMonth">last month</option>
          {/*<option value="">last year</option>*/}
        </select> 
      </div>

      <div className="image-container">
        <div className="image-block">
          <div className="chart">
            <h3>Heart Rate</h3>
            {/*<Line data={createChartData("Heart Rate", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.heartRate))} />*/}
            <Line data={createChartData("Heart Rate", Object.keys(filteredData),Object.values(filteredData).map((value) => value.heartRate))} />
          </div>
          <div className='aicomment'>
            {/*<p>Ai Comments</p>*/}
            {LLMHR==''?<p>Ai Comments</p>:<p>{LLMHR}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Blood Pressure</h3>
            <Line
              data={{
                labels: Object.keys(filteredData),
                datasets: [
                  {

                    label: "Systolic",
                    data: Object.values(filteredData).map((value) =>  value?.bloodPressure?.systolic ?? null),
                    borderColor: "rgba(255,99,132,1)",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    fill: true,
                  },
                  {
                    label: "Diastolic",
                    data: Object.values(filteredData).map((value) =>  value?.bloodPressure?.diastolic ?? null),
                    borderColor: "rgba(54,162,235,1)",
                    backgroundColor: "rgba(54,162,235,0.2)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
          <div className='aicomment'>
            {LLMBP==''?<p>Ai Comments</p>:<p>{LLMBP}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Oxygen Level</h3>
            {/*<Line data={createChartData("Oxygen Level", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.oxygenLevel))} />*/}
            <Line data={createChartData("Oxygen Level", Object.keys(filteredData),Object.values(filteredData).map((value) => value.oxygenLevel))} />
          </div>
          <div className='aicomment'>
            {LLMOL==''?<p>Ai Comments</p>:<p>{LLMOL}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Glucose Level</h3>
            {/*<Line data={createChartData("Glucose Level", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.glucoseLevel))} />*/}
            <Line data={createChartData("Glucose Level", Object.keys(filteredData),Object.values(filteredData).map((value) => value.glucoseLevel))} />
          </div>
          <div className='aicomment'>
            {LLMGL==''?<p>Ai Comments</p>:<p>{LLMGL}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Temperature</h3>
            {/*<Line data={createChartData("Temperature",Object.entries(dataF.data).map(([key,value])=>key), Object.entries(dataF.data).map(([key,value])=>value.temperature))} />*/}
            <Line data={createChartData("Temperature", Object.keys(filteredData),Object.values(filteredData).map((value) => value.temperature))} />
          </div>
          <div className='aicomment'>
            {LLMT==''?<p>Ai Comments</p>:<p>{LLMT}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Pain</h3>
            {/*<Line data={createChartData("Pain",Object.entries(dataF.data).map(([key,value])=>key), Object.entries(dataF.data).map(([key,value])=>value.pain))} />*/}
            <Line data={createChartData("Pain", Object.keys(filteredData),Object.values(filteredData).map((value) => value.pain))} />
          </div>
          <div className='aicomment'>
            {LLMP==''?<p>Ai Comments</p>:<p>{LLMP}</p>}
          </div>
        </div>
      </div>

      <div className='lastDetail'>
        <p>Height: {dataF.height} cm</p>
        <p>Weight: {dataF.weight} kg</p>
        <p>BMI: {dataF.bmi}</p>
      </div>
      <div>    .</div>

    </>
  )
}

const Advice = ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const [patient,setPatient] = useState([])
  const [advice, setAdvice] = useState('')

  const getP = async () => {
      const p = await patientService.getPatientsData(user.name)
      setPatient(patientsData[1])
      // console.log(JSON.stringify(p[0].data)+'USER Routine '+user.routine)
  }
  // const getA = async ()=>{
  //   const a = await 
  // }
  const llmResponse = async (input)=>{
    const jsonInput = JSON.stringify(input)
    const escapedJson = JSON.stringify(jsonInput)
    // console.log(escapedJson)
    // console.log(escapedJson)
    const resp  = await llmService.getLlmResponse2(escapedJson)
    // console.log(resp)
    const newResp = await llmService.getLlmResponse3(JSON.stringify(resp))
    setAdvice(newResp.choices[0].message.content)
    // console.log(resp.choices[0].message.content)
  }

  useEffect(() => {
    if(user) {
      localStorage.setItem("lastVisitedPage", "/advice")
    }
  }, [user])

  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
    getP()
  },[])

  useEffect(()=>{
    llmResponse(JSON.stringify(patient.data)+' USER ROUTINE '+user.routine)
  },[patient])

  if (!patient || patient.length === 0) {
    return <div>Loading...</div>
  }

  // if (!dataF || !dataF.data) {
  //   return <div>Error: No patient data found.</div>
  // }

  return (
    <div>
    <div className="nav">
      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
          {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
          {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
          {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      
      <div className='navbar'>
      <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg></p>
      </div>
        <p  className='patient'>{user.name}</p>
      </div>
    </div>
      <Notification message={message}/>
      <div className="image-container">
        {/*<h2>Doctor Prescriptions</h2>*/}
        <ul className="sidebar-tabs2">
          <h2>Doctor Prescriptions</h2>
          {patient.data!=null?Object.entries(patient.data).map(([key,value],index)=>
            <li key={index} className='comments'><div><p>{key}</p><p>{value.previousPrescriptions}</p></div></li>
          ):<p>No Data</p>}
        </ul>
        <ul className="sidebar-tabs2" >
          <h2>Ai advice</h2>
          <li className="comments"><p></p><p>{advice!=''?advice:null}</p></li>
        </ul>
      </div>
    </div>
  )
}

const AddInfo = ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const [height,setHeight] = useState(0)
  const [weight,setWeight] = useState(0)
  const [bmi,setBmi] = useState(0)
  const [heartRate,setHeartRate] = useState(0)
  const [systolic,setSystolic] = useState(0)
  const [diastolic,setDiastolic] = useState(0)
  const [oxygen, setOxygen] = useState(0)
  const [comment,setComment] = useState('')
  const [glucose,setGlucose ] = useState(0)
  const [temperature,setTemperature] =useState(0)
  const [pain,setPain] = useState(0)

  useEffect(() => {
    if(user) {
      localStorage.setItem("lastVisitedPage", "/addInfo")
    }
  }, [user])

  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])

  const submitHandler = async (event)=>{
    event.preventDefault()
    try {
      const addPatientData = await patientService.addPatientData({ height,weight,bmi,heartRate,
        systolic,diastolic,oxygen,comment,glucose,temperature,pain })
      // window.localStorage.setItem('loggedUser', JSON.stringify(loadedUser))
      setHeight(0)
      setWeight(0)
      setBmi(0)
      setHeartRate(0)
      setSystolic(0)
      setDiastolic(0)
      setOxygen(0)
      setComment('')
      setGlucose(0)
      setTemperature(0)
      setPain(0)


    } catch (exception) {
      console.error('Error when adding patients data: ', exception)
      alert('something wrong. find out')
    }
  }

  const handler = (event,handler)=>{
    // console.log(event.target.value)
    handler(event.target.value)
  }
  return (
    <>
    <div className="nav">
    <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
        </svg></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
          {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
          {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
          {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      
      
      <div className='navbar'>
      <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg></p>
      </div>
        <p  className='patient'>{user.name}</p>
      </div>
    </div>
    <Notification message={message}/>  
    <div className="container">
      <div className="profile">
        <h2>Add Today's Data</h2>
        <form onSubmit={submitHandler}>
          <p>Height: <input onChange={(e)=>handler(e,setHeight)} value={height} type="number" /> </p>
          <p>Weight: <input onChange={(e)=>handler(e,setWeight)} value={weight} type='number'/></p>
          <p>Bmi: <input onChange={(e)=>handler(e,setBmi)} value={bmi} type="number" /> </p>
          <p>Heart Rate: <input onChange={(e)=>handler(e,setHeartRate)} value={heartRate} type='number'/></p>
          <p>Blood Pressure: <p style={{backgroundColor:'ghostwhite'}}>Systolic: <input onChange={(e)=>handler(e,setSystolic)}value={systolic} type="number" /> 
           </p><p style={{backgroundColor:'ghostwhite'}}>Diastolic:  <input onChange={(e)=>handler(e,setDiastolic)} value={diastolic} type='number'/></p></p>
          <p >Oxygen Level: <input onChange={(e)=>handler(e,setOxygen)} value={oxygen} type="number" /> </p>
          <p>Patient Comment: <textarea onChange={(e)=>handler(e,setComment)} value={comment} type='string'/></p>
          <p>Glucose Level: <input onChange={(e)=>handler(e,setGlucose)} value={glucose} type="number" /> </p>
          <p>Temperature: <input onChange={(e)=>handler(e,setTemperature)} value={temperature} type='number'/></p>
          <p>Pain:(1-5) <input onChange={(e)=>handler(e,setPain)} value={pain} type="number" /> </p>
          
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
    </>
  )
}
const AddPatients = ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage}) =>{
  const [name,setName]= useState('')
  const [phone,setPhone] = useState(null)
  useEffect(() => {
    if (user) {
      // Save the current path in localStorage
      localStorage.setItem("lastVisitedPage", "/add");
    }
  }, [user]);

  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])

  // setMessage(`Added ${toAdd.name}`)
  // setTimeout(()=>{
  //   setMessage(null)
  // },5000)

  const nameHandler = (event)=>{
    setName(event.target.value)
  }
  const phoneHandler = (event)=>{
    // console.log(event.target.value)
    setPhone(event.target.value)
  }
  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const addPatient = await patientService.addPatient({ name, phone })
      // window.localStorage.setItem('loggedUser', JSON.stringify(loadedUser))
      setName('')
      setPhone('')

      // const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/patients"
      // navigate(lastVisitedPage)
      setMessage(`Added ${name}`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
    } catch (exception) {
      console.error('Error when adding patient: ', exception)
      alert('something wrong. find out')
    }
  }
  return (
    <div>
    <div className="nav">
      <div className={`sidebarL ${isSideOpenL ? 'open' : ''}`}>
        <button onClick={toggleSidebarL} className="close-btn">✖</button>
        <ul className="sidebar-tabs">
          <li><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          {user.type=='doctor'?<li><Link to="/patients">Patients</Link></li>:null}
          {user.type=='doctor'?<li><Link to="/add">Add Patient</Link></li>:null}
          {user.type=='patient'?<li><Link to="/addInfo">Add today data</Link></li>:null}
          {user.type=='patient'?<li><Link to="/advice">Get Advice</Link></li>:null}
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      
      <Notification message={message}/>
      <div className='navbar'>
      <div className="hover">
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
      </div>
        <p  className='patient'>{user.name}</p>

      </div>
    </div>
      <div className="container">
        <div className="profile">
          <form onSubmit={submitHandler}>
            <p>Name: <input onChange={(e)=>nameHandler(e)} type="string" /> </p>
            <p>Phone: <input onChange={(e)=>phoneHandler(e)} type='number'/></p>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  const [isSideOpenL, setIsSideOpenL] = useState(false)
  const [isSideOpenRP, setIsSideOpenRP] = useState(false)
  const [isSideOpenRC, setIsSideOpenRC] = useState(false)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  

  useEffect(() => {

    const loggedUserJson = window.localStorage.getItem('loggedUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      console.log('User loaded from localStorage:', user);
      setUser(user);
      patientService.setToken(user.token);
    }
  }, [])

  
  // useEffect(()=>{console.log(user)},[user])


  const toggleSidebarL = ()=>{
    setIsSideOpenL(!isSideOpenL)
  }
  const toggleSidebarRP = ()=>{
    if(isSideOpenRC) setIsSideOpenRC(!isSideOpenRC)
    setIsSideOpenRP(!isSideOpenRP)
  }
  const toggleSidebarRC = ()=>{
    if(isSideOpenRP) setIsSideOpenRP(!isSideOpenRP)
    setIsSideOpenRC(!isSideOpenRC)
  }

  const lastVisitedPage = localStorage.getItem("lastVisitedPage")
  
  return (
    <>
      <Router>
        <Routes>

            <Route path="/" element={user ? <Navigate to="/profile" /> : <Navigate to="/login" />} />
            <Route path="/login" element={user?<Navigate to={lastVisitedPage||"/profile"}/>:<LoginPage user ={user}  message={message} setMessage={setMessage} setUser ={setUser}/>} />

            {/*<Route path="/dashboard" element={user?<Dashboard data={[]} user={user} toggleSidebarRC={toggleSidebarRC} toggleSidebarRP={toggleSidebarRP}
                toggleSidebarL={toggleSidebarL} isSideOpenL={isSideOpenL} setIsSideOpenL={setIsSideOpenL} 
                isSideOpenRP={isSideOpenRP} setIsSideOpenRP={setIsSideOpenRP} isSideOpenRC={isSideOpenRC}
                setIsSideOpenRC={setIsSideOpenRC} />:<Navigate to={lastVisitedPage||"/login"}/>} />
            */}
            <Route path="/profile" element={user?<Profile user={user} setUser ={setUser} isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL}  message={message} setMessage={setMessage}/>:<Navigate to='/login'/>} />
            
            <Route path="/settings" element={user?<Settings user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL}  message={message} setMessage={setMessage}/>:<Navigate to="/login"/>} />
            
            <Route path="/patients" element={user?<Patients user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} message={message} setMessage={setMessage}/>:<Navigate to="/login"/>} />

            <Route path="/add" element={user?<AddPatients user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} message={message} setMessage={setMessage}/>:<Navigate to="/login"/>} />
            
            <Route path="/dashboard/:id" element={<Dashboard data={patientsData} user={user} toggleSidebarRC={toggleSidebarRC} toggleSidebarRP={toggleSidebarRP}
                toggleSidebarL={toggleSidebarL} isSideOpenL={isSideOpenL} setIsSideOpenL={setIsSideOpenL} 
                isSideOpenRP={isSideOpenRP} setIsSideOpenRP={setIsSideOpenRP} isSideOpenRC={isSideOpenRC}
                setIsSideOpenRC={setIsSideOpenRC} message={message} setMessage={setMessage}/>}/>

            <Route path="/advice" element={user?<Advice user={user} setUser ={setUser} isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL}  message={message} setMessage={setMessage}/>:<Navigate to="/login"/>}/>

            <Route path="/addInfo" element={user ? <AddInfo  user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} message={message} setMessage={setMessage}/> : <Navigate to="/login" />} />

            <Route path="/create" element={user?<Navigate to={lastVisitedPage||"/profile"}/>:<CreateAccount user ={user}  setUser ={setUser} message={message} setMessage={setMessage}/>} />

            <Route path="*" element={user?<Navigate to="/profile" />:<Navigate to={lastVisitedPage||"/login"}/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
