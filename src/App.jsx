
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Pages/Home/Home'
import List from './Pages/List/List'
import SingleHotel from './Pages/SingleHotel/SingleHotel'

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
      element:<SingleHotel/>
    },
    {
      
    }
  ])

  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
