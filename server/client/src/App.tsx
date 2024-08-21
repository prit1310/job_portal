import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ForgotPassword from './pages/ForgotPassword'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import Error from './pages/Error'
import Logout from './pages/Logout'
import JobAdd from './pages/JobAdd'
import GetJobs from './pages/GetJobs'
import Navbar from './components/Navbar'
import UpdateJob from './pages/UpdateJob'
import ContactUs from './pages/ContactUs'

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/jobadd' element={<JobAdd />} ></Route>
          <Route path='/jobupdate/:id' element={<UpdateJob />} />
          <Route path='/job' element={<GetJobs />}></Route>
          <Route path='/contactus' element={<ContactUs />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
