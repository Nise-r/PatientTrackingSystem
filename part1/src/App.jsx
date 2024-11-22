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



const patientsData = {
  1:{
    name:'mahipal',
    phone:'08120332038',
    height: 175,
    weight: 70,
    bmi: 22.9,
    data:{
  "22-10-12":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 94,
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    glucoseLevel: 90,
    temperature: 42.5,
    pain: 2,
  },
  "23-10-22":{
    heartRate: 70,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 35.5,
    pain: 3,
  },
  "24-10-22":{
    heartRate: 82,
    bloodPressure:
      { systolic: 111, diastolic: 85 },
    oxygenLevel: 92,
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    glucoseLevel: 89,
    temperature: 40.5,
    pain: 2,
  },
  "25-10-22":{
    heartRate: 76,
    bloodPressure:
      { systolic: 100, diastolic: 87 },
    oxygenLevel: 95,
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    glucoseLevel: 92,
    temperature: 36.5,
    pain: 1,
  },
  "26-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 125, diastolic: 70 },
    oxygenLevel: 91,
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    glucoseLevel: 80,
    temperature: 38.5,
    pain: 3,
  },
  "27-10-22":{
    heartRate: 79,
    bloodPressure:
      { systolic: 115, diastolic: 77 },
    oxygenLevel: 97,
    previousPrescriptions: 'blood pressure is  low',
    patientComments: '1mg paracitamol',
    glucoseLevel: 96,
    temperature: 42.5,
    pain: 1,
  }
}
  },
  2:{
    name:'manvendra',
    phone:'08120332038',
  },
}

const dummyData2 = {
  name: "John Doe",
  phone:"1982347029",
  data:{
  "22-10-12":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  },
  "23-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  },
  "24-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  },
  "25-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  },
  "26-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  },
  "27-10-22":{
    heartRate: 80,
    bloodPressure:
      { systolic: 120, diastolic: 80 },
    oxygenLevel: 95,
    glucoseLevel: 90,
    temperature: 36.5,
    pain: 1,
    height: 175,
    weight: 70,
    bmi: 22.9
  }
}
}
const dummyData = {
  name: "John Doe",
  phone:"1982347029",
  heartRate: [80, 82, 79, 85, 83],
  bloodPressure: [
    { systolic: 120, diastolic: 80 },
    { systolic: 122, diastolic: 82 },
    { systolic: 118, diastolic: 78 },
    { systolic: 125, diastolic: 85 },
  ],
  oxygenLevel: [95, 96, 94, 97, 95],
  glucoseLevel: [90, 92, 88, 91, 89],
  temperature: [36.5, 36.7, 36.6, 36.8, 36.9],
  pain: [1, 2, 2, 3, 1],
  height: 175,
  weight: 70,
  bmi: 22.9,
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

const Profile=({isSideOpenL,toggleSidebarL,user})=>{
  useEffect(() => {
  if (user) {
      // Save the current path in localStorage
      localStorage.setItem("lastVisitedPage", "/profile");
    }
  }, [user]);
  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])
  return (
    <div> 
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
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
        <p  className='patient'> {user.name}</p>
      </div>
    This is profile.
    </div>
  )
}
const Settings=({isSideOpenL,toggleSidebarL,user})=>{
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
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
        <p  className='patient'>{user.name}</p>
      </div>
    These are settings
    </div>
  )
}
const Patients=({isSideOpenL,toggleSidebarL,user,setUser})=>{
  const navigate = useNavigate()
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
  return (
    <div> 
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
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
</svg></p>
        <p  className='patient'>{user.name}</p>

      </div>
        {Object.entries(patientsData).map(([key,value])=><p key = {key} onClick={()=>navigate('/dashboard/'+value.name)}>{value.name}  {value.phone}</p>)}
    </div>
  )
}
const CreateAccount = ()=>{
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState(null)
  const [email, setEmail] = useState('')
  const [type,setType] = useState('')
  const navigate  = useNavigate()

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

      // const lastVisitedPage = localStorage.getItem("lastVisitedPage") || "/patients"
      navigate('/login')
    } catch (exception) {
      console.error('creating user failed: ', exception)
      // alert('Invalid credentials, please try again.')
    }
  }
  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={submitHandler}>
        <p>Username: <input onChange={(e)=>handler(e,setUsername)} type='string'/></p>
        <p>Name: <input onChange={(e)=>handler(e,setName)} type='string'/></p>
        <p>Password: <input onChange={(e)=>handler(e,setPassword)} type='string'/></p>
        <p>Phone: <input onChange={(e)=>handler(e,setPhone)} type='number'/></p>
        <p>Email: <input onChange={(e)=>handler(e,setEmail)} type='string'/></p>
        <div onChange={(e)=>handler(e,setType)}>
          <input type="radio" value="doctor" onChange={()=>{}} checked={type==="doctor"}/> Doctor
          <input type="radio" value="patient" onChange={()=>{}} checked={type==="patient"}/> Patient
        </div>
        <button type='submit'>Login</button>
      </form>
      <Link to="/login">Have an account? login</Link>
    </div>
  )
}
const LoginPage = ({setUser})=>{
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
    <div>
      <h2>Login as Doctor</h2>
      <form onSubmit={submitHandler}>
        <p>Username: <input onChange={(e)=>userHandler(e)} type='string'/></p>
        <p>Password: <input onChange={(e)=>passHandler(e)} type='string'/></p>
        <button type='submit'>Login</button>
      </form>
      <Link to="/create">create account</Link>
    </div>
  )
}

const Dashboard =({data,user,setIsSideOpenRC,setIsSideOpenRP,isSideOpenRC,isSideOpenRP,isSideOpenL,setIsSideOpenL,toggleSidebarL,toggleSidebarRP,toggleSidebarRC})=>{
  // useEffect(() => {
  //   console.log(user)
  //   if(user) {
  //     localStorage.setItem("lastVisitedPage", "/dashboard")
  //   }
  // }, [user])
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])

  const id = useParams().id
  const dataF = Object.values(patientsData).find(p=>p.name===id)
  // console.log(dataF)
  // Object.entries(dataF.data).map(([key,value])=>console.log(value.heartRate))
  useEffect(() => {
    console.log(user)
    if(user) {
      localStorage.setItem("lastVisitedPage", `/dashboard/${dataF.name}`)
    }
  }, [user])
  if(dataF)
  return (
    <>
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
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg></p>
        <p  className='patient'>{dataF.name}</p>
      </div>
      <div className={`sidebarR ${isSideOpenRP ? 'open' : ''}`}>
        <button onClick={toggleSidebarRP} className="close-btn">✖</button>
        <p className="sidebarComm">Previous Prescriptions</p>
        <ul className="sidebar-tabs">
          {Object.entries(dataF.data).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value.previousPrescriptions}</p></div></li>)}
        </ul>
      </div>

      <div className={`sidebarR ${isSideOpenRC ? 'open' : ''}`}>
        <button onClick={toggleSidebarRC} className="close-btn">✖</button>
        <p className="sidebarComm">Patient Comments</p>
        <ul className="sidebar-tabs">
          {Object.entries(dataF.data).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value.patientComments}</p></div></li>)}
        </ul>
      </div>

      <div className='aicomment'>
        <p>Ai Comments</p>
      </div>

      <div className='patientRow'>
        <button className='btn' onClick={()=>{toggleSidebarRP()}}>Previous Prescriptions</button>
        <button className='btn' onClick={()=>{toggleSidebarRC()}}>Patients Comments</button> 
      </div>

      <div className="selectDate">
        Select Date 
        <select onChange={(e)=>console.log(e.target.value)}>
          <option >this week</option> 
          <option >last week</option>
          <option >last month</option>
          <option >last year</option>
        </select> 
      </div>

      <div className="image-container">
        <div className="image-block">
          <div className="chart">
            <h3>Heart Rate</h3>
            <Line data={createChartData("Heart Rate", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.heartRate))} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Blood Pressure</h3>
            <Line
              data={{
                labels: Object.entries(dataF.data).map(([key,value])=>key),
                datasets: [
                  {
                    label: "Systolic",
                    data: Object.entries(dataF.data).map(([key,value])=>value.bloodPressure.systolic),
                    borderColor: "rgba(255,99,132,1)",
                    backgroundColor: "rgba(255,99,132,0.2)",
                    fill: true,
                  },
                  {
                    label: "Diastolic",
                    data: Object.entries(dataF.data).map(([key,value])=>value.bloodPressure.diastolic),
                    borderColor: "rgba(54,162,235,1)",
                    backgroundColor: "rgba(54,162,235,0.2)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Oxygen Level</h3>
            <Line data={createChartData("Oxygen Level", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.oxygenLevel))} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Glucose Level</h3>
            <Line data={createChartData("Glucose Level", Object.entries(dataF.data).map(([key,value])=>key),Object.entries(dataF.data).map(([key,value])=>value.glucoseLevel))} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Temperature</h3>
            <Line data={createChartData("Temperature",Object.entries(dataF.data).map(([key,value])=>key), Object.entries(dataF.data).map(([key,value])=>value.temperature))} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Pain</h3>
            <Line data={createChartData("Pain",Object.entries(dataF.data).map(([key,value])=>key), Object.entries(dataF.data).map(([key,value])=>value.pain))} />
          </div>
          <div className='aicomment'>
            <p>Ai Comments</p>
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
const AddInfo = ({isSideOpenL,toggleSidebarL,user,setUser})=>{
  const [height,setHeight] = useState(null)
  const [weight,setWeight] = useState(null)
  const [bmi,setBmi] = useState(null)
  const [heartRate,setHeartRate] = useState(null)
  const [systolic,setSystolic] = useState(null)
  const [diastolic,setDiastolic] = useState(null)
  const [oxygen, setOxygen] = useState(null)
  const [comment,setComment] = useState('')
  const [glucose,setGlucose ] = useState(null)
  const [temperature,setTemperature] =useState(null)
  const [pain,setPain] = useState(null)

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
      setHeight(null)
      setWeight(null)
      setBmi(null)
      setHeartRate(null)
      setSystolic(null)
      setDiastolic(null)
      setOxygen(null)
      setComment('')
      setGlucose(null)
      setTemperature(null)
      setPain(null)


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
          <li><Link to="/profile"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload()}}>Logout</Link></li>
          {/*<li><Link to="/dashboard">Dashboard</Link></li>*/}
        </ul>
      </div>
      <div className='navbar'>
        <p className='button' onClick={()=>{toggleSidebarL()}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
      </svg></p>
        <p  className='patient'>{user.name}</p>
      </div>
    <div>
      <form onSubmit={submitHandler}>
        <p>Height: <input onChange={(e)=>handler(e,setHeight)} value={height} type="number" /> </p>
        <p>Weight: <input onChange={(e)=>handler(e,setWeight)} value={weight} type='number'/></p>
        <p>Bmi: <input onChange={(e)=>handler(e,setBmi)} value={bmi} type="number" /> </p>
        <p>Heart Rate: <input onChange={(e)=>handler(e,setHeartRate)} value={heartRate} type='number'/></p>
        <p>Blood Pressure: Systolic: <input onChange={(e)=>handler(e,setSystolic)}value={systolic} type="number" /> 
         Diastolic:  <input onChange={(e)=>handler(e,setDiastolic)} value={diastolic} type='number'/></p>
        <p>Oxygen Level: <input onChange={(e)=>handler(e,setOxygen)} value={oxygen} type="number" /> </p>
        <p>Patient Commnet: <input onChange={(e)=>handler(e,setComment)} value={comment} type='string'/></p>
        <p>Glucose Level: <input onChange={(e)=>handler(e,setGlucose)} value={glucose} type="number" /> </p>
        <p>Temperature: <input onChange={(e)=>handler(e,setTemperature)} value={temperature} type='number'/></p>
        <p>Pain:(1-5) <input onChange={(e)=>handler(e,setPain)} value={pain} type="number" /> </p>
        
        <button type="submit">Add</button>
      </form>
    </div>
    </>
  )
}
const AddPatients = () =>{
  const [name,setName]= useState('')
  const [phone,setPhone] = useState(null)

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
    } catch (exception) {
      console.error('Error when adding patient: ', exception)
      alert('something wrong. find out')
    }
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <p>Name: <input onChange={(e)=>nameHandler(e)} type="string" /> </p>
        <p>Phone: <input onChange={(e)=>phoneHandler(e)} type='number'/></p>
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


function App() {
  const [count, setCount] = useState(0)
  const [isSideOpenL, setIsSideOpenL] = useState(false)
  const [isSideOpenRP, setIsSideOpenRP] = useState(false)
  const [isSideOpenRC, setIsSideOpenRC] = useState(false)
  const [user, setUser] = useState(null)


  

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
            <Route path="/login" element={user?<Navigate to={lastVisitedPage||"/profile"}/>:<LoginPage user ={user}  setUser ={setUser}/>} />

            {/*<Route path="/dashboard" element={user?<Dashboard data={[]} user={user} toggleSidebarRC={toggleSidebarRC} toggleSidebarRP={toggleSidebarRP}
                toggleSidebarL={toggleSidebarL} isSideOpenL={isSideOpenL} setIsSideOpenL={setIsSideOpenL} 
                isSideOpenRP={isSideOpenRP} setIsSideOpenRP={setIsSideOpenRP} isSideOpenRC={isSideOpenRC}
                setIsSideOpenRC={setIsSideOpenRC} />:<Navigate to={lastVisitedPage||"/login"}/>} />
            */}
            <Route path="/profile" element={user?<Profile user={user} setUser ={setUser} isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} />:<Navigate to='/login'/>} />
            
            <Route path="/settings" element={user?<Settings user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} />:<Navigate to="/login"/>} />
            
            <Route path="/patients" element={user?<Patients user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL}/>:<Navigate to="/login"/>} />

            <Route path="/add" element={user?<AddPatients />:<Navigate to="/login"/>} />
            
            <Route path="/dashboard/:id" element={<Dashboard data={patientsData} user={user} toggleSidebarRC={toggleSidebarRC} toggleSidebarRP={toggleSidebarRP}
                toggleSidebarL={toggleSidebarL} isSideOpenL={isSideOpenL} setIsSideOpenL={setIsSideOpenL} 
                isSideOpenRP={isSideOpenRP} setIsSideOpenRP={setIsSideOpenRP} isSideOpenRC={isSideOpenRC}
                setIsSideOpenRC={setIsSideOpenRC}/>}/>

            <Route path="/addInfo" element={user ? <AddInfo  user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} /> : <Navigate to="/login" />} />

            <Route path="/create" element={user?<Navigate to={lastVisitedPage||"/profile"}/>:<CreateAccount user ={user}  setUser ={setUser}/>} />

            <Route path="*" element={user?<Navigate to="/profile" />:<Navigate to={lastVisitedPage||"/login"}/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
