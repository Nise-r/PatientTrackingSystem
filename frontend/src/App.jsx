import { useState,useEffect} from 'react'
import './App.css'
import { Line,Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isWithinInterval,
  isSameDay,
} from "date-fns"
import ReactApexChart from 'react-apexcharts'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate,
   Navigate,useLocation
} from 'react-router-dom'
// import {Login} from './pages/login'
import patientService from './services/patient'
import loginService from './services/login'
import llmService from './services/llm'
import imageService from './services/image'
import Notification from './components/Notification'
import axios from 'axios'

import imageBg from './assets/bg-medical.jpeg'




const createChartData = (label,indexes, data) => ({
    labels: indexes,
    datasets: [
      {
        label,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3
      },
    ],
})
const createChartData2 = (label,indexes, data) => ({
    labels: indexes,
    datasets: [
      {
        label,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.3
      },
      {
        type:'line',
        label,
        data,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "#8AD167",
        backgroundColor: "#8AD167",
        pointBackgroundColor: "#8AD167",
        pointBorderColor: "#ffffff",
        borderWidth: 2,
        borderDash: [5, 5],
        fill: false,
        tension: 0.3
      }
    ],
})

const options={
  responsive: true,
    plugins: {
      legend: { display: false }, // Hides legend
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            tooltipItem.datasetIndex === 0
              ? `${tooltipItem.raw} hours`
              : `${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false }, // Hide vertical grid lines
      },
      y: {
        grid: { display: true, color: "#E8F5E9" },
        ticks: { beginAtZero: true },
      },
    }
  }




const Profile=({isSideOpenL,toggleSidebarL,user,message,setMessage})=>{
  const [name, setName] = useState('')
  const [phone,setPhone] = useState(0)
  const [email,setEmail] = useState('')
  const [address,setAddress] = useState('')
  const [routine, setRoutine] = useState('')
  const [hover,setHover]= useState()
  const navigate = useNavigate()


  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }

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
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
    <div className="container">
      <div className="profile">
        <h2 style={{'color':'white'}}>Profile</h2>
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
  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }

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
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
    <div className="container">
      <div className="profile">
        <p className="hover">Theme Preferences:Light Dark</p>
        <p className="hover">Language Settings: English</p>
        <p className="hover">Time zone: India</p>
      </div>
      {/*<p>These are settings</p>*/}
    </div>
    </div>
  )
}
const Patients= ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const navigate = useNavigate()
  const [patients,setPatients] = useState([])

  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }

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
    // console.log(user)
    const patient = await patientService.getPatients(user)
    // console.log(patient)
    setPatients(patient)
  }
  useEffect(()=>{
    getP()
  },[])
  // const patients = patientService.getPatients(user)
  // Object.entries(patients).map(([key,value])=>console.log(value.name))
  
  return (
    <div> 
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
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
    

    <div className="login-page" style={{'paddingLeft':200,'paddingRight':200}}>
      {/* Left Section */}
      <div className="login-left">
        <div className="illustration">
          {/*<img src={imageBg} alt="Illustration"  className="img2"/>*/}
        </div>
        <div className="text-content">
          
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <Notification message={message} className="notification"/>
        <h1>Create your account</h1>
        <form className="login-form" onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={(e)=>handler(e,setUsername)}
            id="username"
            placeholder="d4vdrook"
            required
          />
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            onChange={(e)=>handler(e,setName)}
            id="name"
            placeholder="David Brooks"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e)=>handler(e,setPassword)} 
            placeholder="********"
            required
          />
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            onChange={(e)=>handler(e,setPhone)}
            id="phone"
            placeholder="9123231232"
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e)=>handler(e,setEmail)} 
            placeholder="d4vd@gmail.com"
            required
          />
          <div   onChange={(e)=>handler(e,setType)}>
            <div style={{'display':'flex','flexDirection':'row'}}><input type="radio" value="doctor" onChange={()=>{}} checked={type==="doctor"}/> <p style={{"position":'relative','left':-280,'top':-16}}>Doctor</p></div>
            <div style={{'display':'flex','flexDirection':'row'}}><input type="radio" value="patient" onChange={()=>{}} checked={type==="patient"}/> <p style={{"position":'relative','left':-280,'top':-16}}>Patient</p></div>
          </div>
          <button type="submit" className="sign-in-btn">
            Create
          </button>
        </form>
        
        <div className="create-account">
          Have an account? <a href="#"><Link to="/login">login</Link></a>
        </div>
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
    // <div className="container" style={{marginTop:'100px'}}>
    //   <div className="profile">
    //     <h2>Login</h2>
    //     <Notification message={message} className="notification"/>
    //     <form onSubmit={submitHandler}>
    //       <p>Username: <input onChange={(e)=>userHandler(e)} type='string'/></p>
    //       <p>Password: <input onChange={(e)=>passHandler(e)} type='password'/></p>
    //       <button type='submit'>Login</button>
    //     </form>
    //     <Link to="/create">create account</Link>
    //   </div>
    // </div>
    <div className="login-page" style={{'paddingLeft':200,'paddingRight':200}}>
      {/* Left Section */}
      <div className="login-left">
        <div className="illustration">
          {/*<img src={imageBg} alt="Illustration"  className="img2"/>*/}
        </div>
        <div className="text-content">
          
        </div>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <Notification message={message} className="notification"/>
        <h1>Welcome to DocAssist</h1>
        <form className="login-form" onSubmit={submitHandler}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={(e)=>userHandler(e)}
            id="username"
            placeholder="David Brooks"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e)=>passHandler(e)} 
            placeholder="********"
            required
          />
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>
        
        <div className="create-account">
          New to DocAssist? <a href="#"><Link to="/create">create account</Link></a>
        </div>
      </div>
    </div>
  )
}


const Dashboard =({user,setIsSideOpenRC,setIsSideOpenRP,isSideOpenRC,isSideOpenRCh,isSideOpenRP,isSideOpenL,setIsSideOpenL,toggleSidebarL,toggleSidebarRP,toggleSidebarRC,toggleSidebarRCh,toggleSidebarRD,message,setMessage,setIsSideOpenRD,isSideOpenRD})=>{
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
  const [LLMIMG,setLLMIMG] = useState('')
  const [images,setImages] = useState([])
  const [filteredImages,setFilteredImages] = useState([])
  const [chatbot, setChatbot] = useState(["Hello, how may i help you?"])
  const [chatbotInput,setChatbotInput] = useState([])
  const [hover,setHover]= useState()
  const [isOpen, setIsOpen] = useState(false)

  

  const [isExpanded1, setIsExpanded1] = useState(false) 
  const [isExpanded2, setIsExpanded2] = useState(false)
  const [isExpanded3, setIsExpanded3] = useState(false)

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedWeek, setSelectedWeek] = useState(null); // Store the selected week range
  const [selectedDay, setSelectedDay] = useState(null); // Store the selected day
  const [selectedMonth, setSelectedMonth] = useState(false); // Track if the whole month is selected

  const [expandedIndex, setExpandedIndex] = useState(null)
  // const [prevPres,setPrevPres] = useState(null)
  const navigate = useNavigate()


  const id = useParams().id

  useEffect(()=>{
    if(user==null) navigate('/login')
  },[])

  const getImg = async (id) =>{
    const img  = await imageService.getImages(id)
    setImages(img)
    setFilteredImages(img)
  }
  const toggleChatbot = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    // axios.get(`http://localhost:3001/api/user/rec/${id}`)
    //   .then(response => setImages(response.data))
    //   .catch(error => console.error('Error fetching images:', error))
    getImg(id)
    // console.log(images)
  }, [user])
  
  const getP = async () => {
      const p = await patientService.getPatientsData(id)
      // const resp  = await llmService.getLlmResponse('what is the capital of india')
      // console.log(resp)
      setPatient(p[0])
      // console.log(p)
  }
  const handler = (event)=>{
    // console.log(event.target.value)
    setComment(event.target.value)
  }
  const handler2 = (event)=>{
    // console.log(event.target.value)
    setChatbotInput(event.target.value)
  }

  const chatHandler = async (event)=>{
    event.preventDefault()
    
    try{
      // setChatbot(chatbot+chatbotInput)
      setChatbot((prev)=>[...prev,chatbotInput])

      // console.log(chatbot[chatbot.length-1])

      const jsonInput = JSON.stringify(chatbot)
      const escapedJson = JSON.stringify(jsonInput)

      const jsonInput2 = JSON.stringify(filteredData)
      const escapedJson2 = JSON.stringify(jsonInput2)



      console.log(escapedJson2)

      const resp = await llmService.getLlmResponseChatbot(escapedJson,escapedJson2)

      // console.log(resp)

      setChatbot((prev)=>[...prev,resp.choices[0].message.content])



    }catch (exception) {
      console.log('comment failed: ', exception)
      // alert('Invalid credentials, please try again.')
    }
  }
  const submitHandler = async (event)=>{
    event.preventDefault()
    try {
      const name = patient.name
      const addPres = await patientService.addPrescription({ name, comment })
      
      setPatient(addPres)
      setComment('')


      setMessage('Added Today\'s prescription')
      setTimeout(()=>{
        setMessage(null)
      },5000)
      // setTimeout(()=>{
      //   window.location.reload()
      // },[1000])



    } catch (exception) {
      console.error('comment failed: ', exception)
      // alert('Invalid credentials, please try again.')
    }
  }

  const plusHandler = async (handle,handler)=>{
    handler(!handle)
  }

  useEffect(() => {
    getP()
  }, [id])


  const filterData = (range) => {
    const now = new Date();
    // console.log(patient)
    const filtered = Object.entries(patient.data).filter(([key]) => {
      const entryDate = new Date(key.split("-").reverse().join("-")); // Convert "DD-MM-YYYY" to Date
      // console.log(entryDate)
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
    const resp  = await llmService.getLlmResponseSpecific(escapedJson,cmd)
    // console.log(resp.choices[0].message.content)
    if(cmd=='heartRate') setLLMHR(resp.choices[0].message.content)
    if(cmd=='glucoseLevel') setLLMGL(resp.choices[0].message.content)
    if(cmd=='pain') setLLMP(resp.choices[0].message.content)
    if(cmd=='temperature') setLLMT(resp.choices[0].message.content)
    if(cmd=='oxygenLevel') setLLMOL(resp.choices[0].message.content)
    if(cmd=='bloodPressure') setLLMBP(resp.choices[0].message.content)
    // console.log(resp.choices[0].message.content)
  }

  // const patient = patient


  useEffect(() => {
    if (user && patient && patient.name) {
      localStorage.setItem("lastVisitedPage", `/dashboard/${patient.name}`)
      setFilteredData(filterData('all'))
      // handleMonthClick()
      // llmResponse(filteredData)
    }
    // llmResponse()

  }, [user, patient])

  useEffect(()=>{
    llmResponse(filteredData)
    specificLlmResponse(specificData('heartRate'),'heartRate')
    specificLlmResponse(specificData('glucoseLevel'),'glucoseLevel')
    specificLlmResponse(specificData('pain'),'pain')
    specificLlmResponse(specificData('temperature'),'temperature')
    specificLlmResponse(specificData('oxygenLevel'),'oxygenLevel')
    specificLlmResponse(specificData('bloodPressure'),'bloodPressure')

    // console.log(specificData('glucoseLevel'))
    // console.log(specificData('oxygenLevel'))
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

  if (!patient || !patient.data) {
    return <div>Error: No patient data found.</div>
  }
  // console.log(patient.name)

  // Function to filter data based on the selected time range
  

  // Update chart data when time range changes


  

  const llmResponseImg = async (ind)=>{
    let file = null
    images.map((img,index)=>index===ind?file = img.url:null)
    console.log(file)
    const formData = new FormData()
    formData.append('image', file)
    try {
      const result = await axios.post('http://localhost:3001/api/user/analyze-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      // console.log(result.data.choices[0].message.content)
      setLLMIMG(result.data.choices[0].message.content.split("\n"))
      // console.log(LLMIMG)
    } catch (error) {
        console.error('Error:', error);
    }
    // setLLMIMG('Fuck off')
  }

  const handleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expansion
    if(expandedIndex!==index){
      // console.log('this one ',index)
      llmResponseImg(index)
    }
  }

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }

  const renderDays = () => {
    const startDate = startOfWeek(startOfMonth(currentMonth));
    const endDate = endOfWeek(endOfMonth(currentMonth));
    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  };

  // Function to render the calendar header
  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)}>{"<"}</button>
        <span
          className="month-name"
          onClick={handleMonthClick} // Add click handler for the month name
        >
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button onClick={() => handleMonthChange(1)}>{">"}</button>
      </div>
    );
  };

  // Render the day of the week column (Sun, Mon, etc.)
  const renderDayOfWeekHeader = () => {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="day-of-week-row">
        {weekDays.map((day, index) => (
          <div key={index} className="day-of-week">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Handle week and day selection
  const handleDateClick = (day) => {
    setSelectedMonth(false); // Clear the month-wide selection
    const startOfSelectedWeek = startOfWeek(day); // Start of the clicked week
    const endOfSelectedWeek = endOfWeek(day); // End of the clicked week
    setSelectedWeek({ start: startOfSelectedWeek, end: endOfSelectedWeek });
    setSelectedDay(day); // Set the selected day


    // console.log(format(day,'y'))
    // console.log(startOfSelectedWeek)
    // console.log(endOfSelectedWeek)

    // console.log(Object.entries(patient.data).filter(([key])=>{
    //   const entryDate = new Date(key.split("-").reverse().join("-"))
    //   // console.log(entryDate)
    //   return entryDate<=endOfSelectedWeek && entryDate>=startOfSelectedWeek
    // }))
    setFilteredData(Object.fromEntries(Object.entries(patient.data).filter(([key])=>{
      const [day, month, year] = key.split("-")
      const paddedDay = day.padStart(2, "0")
      const paddedMonth = month.padStart(2, "0")
      const entryDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)
      // console.log(entryDate)
      return entryDate<=endOfSelectedWeek && entryDate>=startOfSelectedWeek
    })))

    setFilteredImages(Object.values(Object.fromEntries(Object.entries(images).filter(([key,values])=>{
      const [day, month, year] = values.date.split("-")
      const paddedDay = day.padStart(2, "0")
      const paddedMonth = month.padStart(2, "0")
      const entryDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)
      // console.log(entryDate)

      return entryDate<=endOfSelectedWeek && entryDate>=startOfSelectedWeek
    }))))

  };
  const selectAll=()=>{
    setFilteredData(Object.fromEntries(Object.entries(patient.data)))
    setFilteredImages(Object.values(Object.fromEntries(Object.entries(images))))
  }

  // Handle clicking the month name to select all days
  const handleMonthClick = () => {
    setSelectedMonth(true); // Indicate the whole month is selected
    setSelectedWeek(null); // Clear the week selection
    setSelectedDay(null); // Clear the day selection


    // console.log(Object.fromEntries(Object.entries(patient.data).filter(([key])=>{
    //   // const entryDate = new Date(key.split("-").reverse().join("-"))
    //   const [day, month, year] = key.split("-")
    //   const paddedDay = day.padStart(2, "0")
    //   const paddedMonth = month.padStart(2, "0")
    //   const entryDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)

    //   // console.log(key)
    //   // console.log(entryDate)
    //   return entryDate<=endOfMonth(currentMonth) && entryDate>=startOfMonth(currentMonth)
    // })))

    setFilteredData(Object.fromEntries(Object.entries(patient.data).filter(([key])=>{
      const [day, month, year] = key.split("-")
      const paddedDay = day.padStart(2, "0")
      const paddedMonth = month.padStart(2, "0")
      const entryDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)
      // console.log(entryDate)
      return entryDate<=endOfMonth(currentMonth) && entryDate>=startOfMonth(currentMonth)
    })))

    // console.log(images)
    setFilteredImages(Object.values(Object.fromEntries(Object.entries(images).filter(([key,values])=>{
      const [day, month, year] = values.date.split("-")
      const paddedDay = day.padStart(2, "0")
      const paddedMonth = month.padStart(2, "0")
      const entryDate = new Date(`${year}-${paddedMonth}-${paddedDay}`)
      // console.log(entryDate)

      return entryDate<=endOfMonth(currentMonth) && entryDate>=startOfMonth(currentMonth)
    }))))
  };

  // Handle month navigation
  const handleMonthChange = (direction) => {
    setCurrentMonth(addDays(currentMonth, direction * 30));
    setSelectedMonth(false); // Clear month-wide selection when navigating
    setSelectedWeek(null); // Clear week selection
    setSelectedDay(null); // Clear day selection
  };

  // Render the calendar cells
  const renderCells = () => {
    const days = renderDays();
    return days.map((day, index) => {
      const isInCurrentMonth = isSameMonth(day, currentMonth);
      const isInSelectedWeek =
        selectedWeek &&
        isWithinInterval(day, { start: selectedWeek.start, end: selectedWeek.end });
      const isInSelectedMonth = selectedMonth && isSameMonth(day, currentMonth);
      const isSelectedDay = selectedDay && isSameDay(day, selectedDay);

      return (
        <div
          key={index}
          className={`calendar-cell ${
            isInSelectedMonth ? "selected-month" : ""
          } ${isInSelectedWeek ? "selected-week" : ""} ${
            isSelectedDay ? "selected-day" : ""
          } ${!isInCurrentMonth ? "disabled" : ""}`}
          onClick={() => handleDateClick(day)}
        >
          <span>{format(day, "d")}</span>
        </div>
      );
    });
  };


  
  const pathname = useLocation().pathname

  if(patient)
  return (
    <>
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'60%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
      {/*<ul className="sidebar-tabs2" style={{background:'rgba(0,180,255,0.2)',padding:'10px',borderRadius:'10px',border:'2px solid black'}}>
            <h2 style={{display:'flex',justifyContent:'center'}}>Ai advice</h2>
            {advice!=''?advice.map((rec, index) => (
              <li key={index} className="comments">
                {rec}
              </li>
            )):null}
      </ul>*/}
      <div className='aicomment2' style={{'marginBottom':15}}>
        {/*<p>Ai Comments</p>*/}
        {LLM==''?<p>Ai Comments</p>:<p>{LLM}</p>}
      </div>




      <div className="image-container">
        <div className="image-block">
          <div className="chart">
            <h3>Heart Rate</h3>
            {/*<Line data={createChartData("Heart Rate", Object.entries(patient.data).map(([key,value])=>key),Object.entries(patient.data).map(([key,value])=>value.heartRate))} />*/}
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
            {/*<Line data={createChartData("Oxygen Level", Object.entries(patient.data).map(([key,value])=>key),Object.entries(patient.data).map(([key,value])=>value.oxygenLevel))} />*/}
            <Line  data={createChartData("Oxygen Level", Object.keys(filteredData),Object.values(filteredData).map((value) => value.oxygenLevel))} />
          </div>
          <div className='aicomment'>
            {LLMOL==''?<p>Ai Comments</p>:<p>{LLMOL}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Glucose Level</h3>
            {/*<Line data={createChartData("Glucose Level", Object.entries(patient.data).map(([key,value])=>key),Object.entries(patient.data).map(([key,value])=>value.glucoseLevel))} />*/}
            <Line data={createChartData("Glucose Level", Object.keys(filteredData),Object.values(filteredData).map((value) => value.glucoseLevel))} />
          </div>
          <div className='aicomment'>
            {LLMGL==''?<p>Ai Comments</p>:<p>{LLMGL}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Temperature</h3>
            {/*<Line data={createChartData("Temperature",Object.entries(patient.data).map(([key,value])=>key), Object.entries(patient.data).map(([key,value])=>value.temperature))} />*/}
            <Line data={createChartData("Temperature", Object.keys(filteredData),Object.values(filteredData).map((value) => value.temperature))} />
          </div>
          <div className='aicomment'>
            {LLMT==''?<p>Ai Comments</p>:<p>{LLMT}</p>}
          </div>
        </div>
        <div className="image-block">
          <div className="chart">
            <h3>Pain</h3>
            {/*<Line data={createChartData("Pain",Object.entries(patient.data).map(([key,value])=>key), Object.entries(patient.data).map(([key,value])=>value.pain))} />*/}
            <Bar style={{'position':'relative','left':10}}options={options} data={createChartData2("Pain", Object.keys(filteredData),Object.values(filteredData).map((value) => value.pain))} />
          </div>
          <div className='aicomment'>
            {LLMP==''?<p>Ai Comments</p>:<p>{LLMP}</p>}
          </div>
        </div>
      </div>


      <div>    .</div>
      <div className="rightHover">
          <div className="patientDetails">
            <h3>Patient</h3>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
              <p>{patient.name}</p>
            </div>
            <div className="secondDiv">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-rulers" viewBox="0 0 16 16">
                  <path d="M1 0a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h5v-1H2v-1h4v-1H4v-1h2v-1H2v-1h4V9H4V8h2V7H2V6h4V2h1v4h1V4h1v2h1V2h1v4h1V4h1v2h1V2h1v4h1V1a1 1 0 0 0-1-1z"/>
                </svg>
                <p>{patient.height}</p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer" viewBox="0 0 16 16">
                  <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                  <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                </svg>
                <p>{patient.weight}</p>
              </div>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                </svg>
                <p>{patient.bmi}</p>
              </div>
            </div>
          </div>
          <div className="calendar-container">
            <h3>Select Date</h3>
            {renderHeader()}
            {renderDayOfWeekHeader()} {/* Add the row of day names */}
            <div className="calendar-grid">{renderCells()}</div>
          </div>
          <div className="allButton">
            <button onClick={selectAll}>All</button>
          </div>
      </div>
      <div className="tabName">
        <h3>Medication Management</h3>
        <button onClick={()=>plusHandler(isExpanded1,setIsExpanded1)}>
          {!isExpanded1?<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
          </svg>:
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
          </svg>}
        </button>
      </div>
      {isExpanded1?<div className="tabComponent2">
        <h4>Add today's prescription</h4>
        <form className="tabInput" onSubmit={submitHandler}>
          <textarea className="inputChatbot" type='text' onChange={(e)=>handler(e)} value={comment}></textarea>
          <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg></button>
        </form>
      </div>:null}
      <div className="tabComponent" style={{height:'auto'}}>
        {/*<p><ul className="sidebar-tabs">
            {Object.entries(filteredData).map(([key,value],index)=><li key={index} className='comments'><div><p>{key}</p><p>{value.previousPrescriptions}</p></div></li>)}
          </ul></p>*/}

        {Object.entries(filteredData).map(([key,value],index)=>(<div className="sidebar-tabs" key={index}>
            <p className="date">{key}</p>
            <p className="message">{value.previousPrescriptions}</p>
          </div>))}
      </div>

      <div className="tabName" >
        <h3>Patient Comments</h3>
      </div>
      <div className="tabComponent" style={{height:'auto'}}>
            {Object.entries(filteredData).map(([key,value],index)=>(<div  className='sidebar-tabs'><p className="date">{key}</p><p className="message2">{value.patientComments}</p></div>))}
      </div>

      <div className="tabName">
        <h3>Patient Documents</h3>
        
      </div>
      <div className="tabComponent3">
        <div style={{ display: 'grid',height:'auto', gridTemplateColumns: 'repeat(auto-fill, minmax(45%, 1fr))', gap: '20px' }}>
          {filteredImages.map((img, index) => (
            <div key={img.id} className="comments3">
              {/* Clickable header */}
              <div
                onClick={() => handleExpand(index)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  background: '#f5f5f5',
                  borderRadius: '5px',
                }}
              >
                <p style={{ margin: '0', flex: '0 0 auto' }}>{img.date}</p>
                <p style={{ margin: '0', textAlign: 'center', flex: '1 1 auto' }}>{img.name}</p>
              </div>

              {/* Expandable section */}
              {expandedIndex === index && (
                <div style={{ marginTop: '10px', textAlign: 'center','overflow':'scroll' }}>
                  <img
                    src={img.url}
                    alt="Uploaded"
                    style={{ width: '100%', height: 'auto', objectFit: 'contain', borderRadius: '5px' }}
                  />
                  {LLMIMG === '' ? (
                    <p style={{ marginTop: '10px' }}>AI Comment</p>
                  ) : (
                    <ul style={{ listStyleType: 'none' ,'overflow':'scroll','maxHeight':300}}>
                      {LLMIMG.map((rec, index) => (
                        <li style={{ backgroundColor: 'white', margin: '5px 0', padding: '5px' }} key={index}>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <h3>Chatbot</h3>
          <button className="close-btn" onClick={toggleChatbot}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
            </svg>
          </button>
        </div>

        <div className="chatbot-body">
          <div className="chatbotArea">
            <ul className="tabsChatbot">
              {chatbot.map((value,index)=><div>
                {index%2==0?<p className="chatIcon">Bot</p>:<p className="chatIcon2">User</p>}
                <li key={index} ><p>{value}</p></li>
              </div>)}
            </ul>
          </div>
        </div>
        <form className="Chatbot" onSubmit={chatHandler}>
            <textarea className="inputChatbot" type='text' onChange={(e)=>handler2(e)}></textarea>
            <button className="arrowChatbot"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
          </svg></button>
        </form>
      </div>

      {/* Chatbot Button */}
      <button className="chatbot-button" onClick={toggleChatbot}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-robot" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
        </svg>
      </button>


    </>
  )
}
const Advice = ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const [patient,setPatient] = useState([])
  const [advice, setAdvice] = useState('')
  const [llmCalled, setLlmCalled] = useState(false)
  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }


  const getP = async () => {
      const p = await patientService.getPatientsData(user.name)
      // console.log(p)
      setPatient(p[0])
      // console.log(JSON.stringify(p[0].data)+'USER Routine '+user.routine)
  }
  // const getA = async ()=>{
  //   const a = await 
  // }
  const llmResponse = async (input,patientComments,previousPrescriptions,routine)=>{
    // console.log(input)
    // console.log(patientComments)
    // console.log(previousPrescriptions)
    // console.log(routine)

    // const jsonInput = JSON.stringify(input)
    // const escapedJson = JSON.stringify(jsonInput)

    const ip = JSON.stringify(input)
    const pc = JSON.stringify(patientComments)
    const pp = JSON.stringify(previousPrescriptions)
    const rt = JSON.stringify(routine)

    
    // const resp  = await llmService.getLlmResponse2(escapedJson)
    const resp = await llmService.getLlmResponseAdvice(ip,pc,pp,rt)
    // console.log(resp.choices[0].message.content)
    const newResp = await llmService.getLlmResponseClean(JSON.stringify(resp))

    // setAdvice(newResp.choices[0].message.content)
    // console.log(newResp.choices[0].message.content.split("\n"))

    setAdvice(newResp.choices[0].message.content.split("\n"))
    // console.log(newResp.choices[0].message.content.split("\n"))
    
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
    if(patient && patient.data && !llmCalled){
      // llmResponse(JSON.stringify(patient.data)+' USER ROUTINE '+user.routine)
      llmResponse(patient.data,Object.entries(patient.data).reduce((acc,[key,value])=>
            {acc[key] = value.patientComments;return acc},{}),Object.entries(patient.data).reduce((acc,[key,value])=>
            {acc[key] = value.previousPrescriptions;return acc},{}),user.routine)
      setLlmCalled(true)
    }
  },[patient])

  if (!patient || patient.length === 0) {
    return <div>Loading...</div>
  }

  // if (!patient || !patient.data) {
  //   return <div>Error: No patient data found.</div>
  // }

  return (
    <div>
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
      <div className="image-container" style={{'width':'89%','padding':'10px'}}>
        {/*<h2>Doctor Prescriptions</h2>*/}
        <ul className="sidebar-tabs2" style={{background:'#2e3e2e',borderRadius:'10px',border:'2px solid black',padding:'10px'}}>
          <h2 style={{display:'flex',justifyContent:'center',color:'white'}}>Doctor Prescriptions</h2>
          {patient.data!=null?Object.entries(patient.data).map(([key,value],index)=>
            <li key={index} className='comments'><div><p>{key}</p><p>{value.previousPrescriptions}</p></div></li>
          ):<p>No Data</p>}
        </ul>

        {/*<ul className="sidebar-tabs2" >
          <h2>Ai advice</h2>
          <li className="comments"><p></p><p>{advice!=''?advice:null}</p></li>
        </ul>*/}
          <ul className="sidebar-tabs2" style={{background:'lightgreen',right:'5px',borderRadius:'10px',border:'2px solid black'}}>
            <h2 style={{display:'flex',justifyContent:'center'}}>Ai advice</h2>
            {advice!=''?advice.map((rec, index) => (
              <li key={index} className="comments">
                {rec}
              </li>
            )):null}
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
  const navigate = useNavigate()
  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }



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

      setMessage('Succesfully added Today\'s data')
      setTimeout(()=>{
        setMessage(null)
      },5000)

      // navigate('/addInfo')
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
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/> 
    <div className="container">
      <div className="profile">
        <h2 style={{'color':'white'}}>Add Today's Data</h2>
        <form onSubmit={submitHandler}>
          <p>Height: <input onChange={(e)=>handler(e,setHeight)} value={height!=0?height:null} type="number" /> </p>
          <p>Weight: <input onChange={(e)=>handler(e,setWeight)} value={weight!=0?weight:null} type='number'/></p>
          <p>Bmi: <input onChange={(e)=>handler(e,setBmi)} value={bmi!=0?bmi:null} type="number" /> </p>
          <p>Heart Rate: <input onChange={(e)=>handler(e,setHeartRate)} value={heartRate!=0?heartRate:null} type='number'/></p>
          <p>Blood Pressure: <p style={{backgroundColor:'lightgreen'}}>Systolic: <input onChange={(e)=>handler(e,setSystolic)}value={systolic!=0?systolic:null} type="number" /> 
           </p><p style={{backgroundColor:'lightgreen'}}>Diastolic:  <input onChange={(e)=>handler(e,setDiastolic)} value={diastolic!=0?diastolic:null} type='number'/></p></p>
          <p >Oxygen Level: <input onChange={(e)=>handler(e,setOxygen)} value={oxygen!=0?oxygen:null} type="number" /> </p>
          <p>Patient Comment: <textarea onChange={(e)=>handler(e,setComment)} value={comment} type='string'/></p>
          <p>Glucose Level: <input onChange={(e)=>handler(e,setGlucose)} value={glucose!=0?glucose:null} type="number" /> </p>
          <p>Temperature: <input onChange={(e)=>handler(e,setTemperature)} value={temperature!=0?temperature:null} type='number'/></p>
          <p>Pain:(1-5) <input onChange={(e)=>handler(e,setPain)} value={pain!=0?pain:null} type="number" /> </p>
          
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
  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }

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
    <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
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
const Document = ({isSideOpenL,toggleSidebarL,user,setUser,message,setMessage})=>{
  const [photo, setPhoto] = useState('')
  const [images, setImages] = useState([])
  const [name, setName] = useState('')
  const [hover,setHover]= useState()

  const pathname = useLocation().pathname

  const mouseOver=(event)=>{
    setHover(true)
  }
  const mouseOut=(event)=>{
    setHover(false)
  }



  const getImg = async (name)=>{
    const img = await imageService.getImages(name)
    setImages(img)
  }

  useEffect(() => {
    // axios.get(`http://localhost:3001/api/user/rec/${user.name}`)
    //   .then(response => setImages(response.data))
    //   .catch(error => console.error('Error fetching images:', error))
    getImg(user.name)
  }, [])

  useEffect(() => {
    if (user) {
      // Save the current path in localStorage
      localStorage.setItem("lastVisitedPage", "/document");
    }
  }, [user]);

  useEffect(()=>{
    if(isSideOpenL)
    toggleSidebarL()
  },[])

  const handlePhoto = (event)=>{
    setPhoto(event.target.files[0])
    // console.log(event.target.files[0])
  }
  const nameHandler = (event)=>{
    setName(event.target.value)
  }
  const handleSubmit =async (event)=>{
    event.preventDefault()

    try {
      const formData = new FormData()
      formData.append('name',name)
      formData.append('username',user.username)
      formData.append('photo',photo)

      const pst = await imageService.postImage(formData)

      setMessage(`Added document`)
      setTimeout(()=>{
        setMessage(null)
      },5000)
      setTimeout(()=>{
        window.location.reload()
      },[1000])
    } catch (exception) {
      console.error('Error when adding patients data: ', exception)
      alert('something wrong. find out')
    }
  }

  return (
    <>
      <div className={`newNav${hover?'True':'False'}`} onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <ul className="newNavList">
        <li className="logo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-amd" viewBox="0 0 16 16">
        <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0zM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2z"/>
        </svg></li>
        <div className="newNavDiv">
          <li className={`${pathname === '/profile' ? 'active' : 'inactive'}`}><Link to="/profile" ><svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg></Link>{hover?<p>Profile</p>:''}
          </li>
          <li className={`${pathname === '/settings' ? 'active' : 'inactive'}`}><Link to="/settings"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-gear" viewBox="0 0 16 16">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
            </svg></Link>{hover?<p>Settings</p>:''}
          </li>
          
          {user&&user.type=='doctor'?<li className={`${pathname === '/patients' ? 'active' : 'inactive'}`}><Link to="/patients"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-people-fill" viewBox="0 0 16 16">
            <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
          </svg></Link>{hover?<p>Patients</p>:''}</li>:null}
          {user&&user.type=='doctor'?<li className={`${pathname === '/add' ? 'active' : 'inactive'}`}><Link to="/add"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-person-fill-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
          </svg></Link>{hover?<p>Add Patient</p>:''}</li>:null}
          {user&&user.type=='patient'?<li className={`${pathname === '/addInfo' ? 'active' : 'inactive'}`}><Link to="/addInfo"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-database-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0"/>
            <path d="M12.096 6.223A5 5 0 0 0 13 5.698V7c0 .289-.213.654-.753 1.007a4.5 4.5 0 0 1 1.753.25V4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16c.536 0 1.058-.034 1.555-.097a4.5 4.5 0 0 1-.813-.927Q8.378 15 8 15c-1.464 0-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13h.027a4.6 4.6 0 0 1 0-1H8c-1.464 0-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10q.393 0 .774-.024a4.5 4.5 0 0 1 1.102-1.132C9.298 8.944 8.666 9 8 9c-1.464 0-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777M3 4c0-.374.356-.875 1.318-1.313C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4"/>
          </svg></Link>{hover?<p>Add today's data</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/document' ? 'active' : 'inactive'}`}><Link to="/document"><svg style={{'color':'white'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5m-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"/>
          </svg></Link>{hover?<p>Add Document</p>:''}</li>:null}

          {user.type=='patient'?<li className={`${pathname === '/advice' ? 'active' : 'inactive'}`}><Link to="/advice"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chat-dots" viewBox="0 0 16 16">
            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9 9 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.4 10.4 0 0 1-.524 2.318l-.003.011a11 11 0 0 1-.244.637c-.079.186.074.394.273.362a22 22 0 0 0 .693-.125m.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6-3.004 6-7 6a8 8 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a11 11 0 0 0 .398-2"/>
          </svg></Link>{hover?<p>Advice</p>:''}</li>:null}
          {user?null:<Navigate to={window.localStorage.getItem('lastVisitedPage')}/>}
          <li className={`${pathname === '/' ? 'active' : 'inactive'}`}><Link to="/"  onClick={()=>{window.localStorage.removeItem('loggedUser');window.location.reload();}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
          </svg></Link>{hover?<p>Logout</p>:''}</li>
        </div>
        <div className="newNavDiv2">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-brightness-high" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-moon" viewBox="0 0 16 16">
              <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278M4.858 1.311A7.27 7.27 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.32 7.32 0 0 0 5.205-2.162q-.506.063-1.029.063c-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          </li>
        </div>
      </ul>
    </div>
      <div className="nav2" style={{'width':'90%'}}>
        <p  className='patient' style={{'display':'flex','flexDirection':'row','alignItems':'center','position':'relative','top':-17}}><p>Hello,{user.name}</p> <p>👋</p></p>
      </div>


      <Notification message={message} className="notification"/>
    <div className="container">
      <div className="profile">
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
         <h2 style={{'color':'white'}}>Upload a Document</h2>
         <p><input type="file" accept=".png, .jpg, .jpeg" name="photo" onChange={handlePhoto}/></p>
         <p>Name: <input onChange={(e)=>nameHandler(e)} type="string" /> </p>
         <button type="submit">Submit</button>
        </form>
        <h2 style={{'color':'white'}}>Uploaded Documents</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          {images.map(img => (
            <div key={img.id} style={{ margin: '10px' }}>
              <p style={{padding:'0px',margin:'2px', backgroundColor:'green'}}>{img.date}</p>
              <p style={{padding:'0px',margin:'2px'}}>{img.name}</p>
              <img 
                src={img.url} 
                alt="Uploaded" 
                style={{ width: '250px', height: '250px', objectFit: 'cover' }} 
              />

            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )

}

function App() {
  const [count, setCount] = useState(0)
  const [isSideOpenL, setIsSideOpenL] = useState(false)
  const [isSideOpenRP, setIsSideOpenRP] = useState(false)
  const [isSideOpenRC, setIsSideOpenRC] = useState(false)
  const [isSideOpenRCh, setIsSideOpenRCh] = useState(false)
  const [isSideOpenRD, setIsSideOpenRD] = useState(false)
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
    if(isSideOpenRD) setIsSideOpenRD(!isSideOpenRD)
    if(isSideOpenRCh) setIsSideOpenRCh(!isSideOpenRCh)
    setIsSideOpenRP(!isSideOpenRP)
  }
  const toggleSidebarRC = ()=>{
    if(isSideOpenRP) setIsSideOpenRP(!isSideOpenRP)
    if(isSideOpenRD) setIsSideOpenRD(!isSideOpenRD)
    if(isSideOpenRCh) setIsSideOpenRCh(!isSideOpenRCh)
    setIsSideOpenRC(!isSideOpenRC)
  }
  const toggleSidebarRD = ()=>{
    if(isSideOpenRP) setIsSideOpenRP(!isSideOpenRP)
    if(isSideOpenRC) setIsSideOpenRP(!isSideOpenRC)
    if(isSideOpenRCh) setIsSideOpenRCh(!isSideOpenRCh)
    setIsSideOpenRD(!isSideOpenRD)
  }
  const toggleSidebarRCh = ()=>{
    if(isSideOpenRP) setIsSideOpenRP(!isSideOpenRP)
    if(isSideOpenRC) setIsSideOpenRP(!isSideOpenRC)
    if(isSideOpenRD) setIsSideOpenRD(!isSideOpenRD)
    setIsSideOpenRCh(!isSideOpenRCh)
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
            
            <Route path="/dashboard/:id" element={<Dashboard  user={user} toggleSidebarRC={toggleSidebarRC} toggleSidebarRP={toggleSidebarRP} toggleSidebarRCh={toggleSidebarRCh}
                toggleSidebarL={toggleSidebarL} isSideOpenL={isSideOpenL} setIsSideOpenL={setIsSideOpenL} toggleSidebarRD={toggleSidebarRD}
                isSideOpenRP={isSideOpenRP} setIsSideOpenRP={setIsSideOpenRP} isSideOpenRCh={isSideOpenRCh} setIsSideOpenRCh={setIsSideOpenRCh} isSideOpenRC={isSideOpenRC} isSideOpenRD={isSideOpenRD} setIsSideOpenRD={setIsSideOpenRD}
                setIsSideOpenRC={setIsSideOpenRC} message={message} setMessage={setMessage}/>}/>

            <Route path="/advice" element={user?<Advice user={user} setUser ={setUser} isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL}  message={message} setMessage={setMessage}/>:<Navigate to="/login"/>}/>

            <Route path="/addInfo" element={user ? <AddInfo  user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} message={message} setMessage={setMessage}/> : <Navigate to="/login" />} />

            <Route path="/create" element={user?<Navigate to={lastVisitedPage||"/profile"}/>:<CreateAccount user ={user}  setUser ={setUser} message={message} setMessage={setMessage}/>} />

            <Route path="/document" element={user?<Document user ={user}  isSideOpenL={isSideOpenL} toggleSidebarL={toggleSidebarL} message={message} setMessage={setMessage} />:<Navigate to="/login"/>} />

            <Route path="*" element={user?<Navigate to="/profile" />:<Navigate to={lastVisitedPage||"/login"}/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
