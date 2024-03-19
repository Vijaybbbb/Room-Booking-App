
import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './Components/Home/Home'
import List from './Components/List/List'

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
    <>
    <h1>Hello</h1>
    </>
  )
}

export default App
