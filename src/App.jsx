
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home'
import List from './Pages/List/List'
import Hotel from './Pages/Hotel/Hotel'
import Login from './Pages/Login/Login'
import SignUp from './Pages/SignUp/SignUp'
import Otp from './Pages/Otp/Otp'
import PasswordReset from './Pages/ForgetPassword/PasswordReset'
import EnterEmail from './Pages/ForgetPassword/EnterEmail'
import ResetOtpPage from './Pages/ForgetPassword/ResetOtpPage'
import AdminLogin from './Pages/admin/adminLogin/AdminLogin'
import AdminHome from './Pages/admin/adminHome/AdminHome'


function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/hotels',
      element:<List/>
    },
    {
      path:"/hotels/:id",
      element:<Hotel/>
    },
    {
      path:'/login',
      element:<Login/>
    }, 
    {
      path:'/signup',
      element:<SignUp/>
    },
    {
      path:'/otp',
      element:<Otp/>
    },
    {
      path:'/passwordReset',
      element:<PasswordReset/>
    },
    {
      path:'/enterEmail',
      element:<EnterEmail/>
    },
    {
      path:'/resetWithOtp',
      element:<ResetOtpPage/>
    },
    {
      path:"/adminLogin",
      element:<AdminLogin/>
    },
    {
      path:"/adminHome",
      element:<AdminHome/>
    }
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
