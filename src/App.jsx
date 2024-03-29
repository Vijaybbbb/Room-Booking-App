
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home'
import List from './Pages/List/List'
import Hotel from './Pages/Hotel/Hotel'
import Login from './Pages/Login/Login'


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
    }   
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
