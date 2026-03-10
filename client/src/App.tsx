import { Route, Routes } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
import Registation from "./pages/registation"


function App() {


  return (
   <Routes>
    <Route path = "/" element = {<Home/>}/>
    <Route path = "/login" element = {<Login/>}/>
    <Route path = "/registation" element = {<Registation/>}/>
   </Routes>
  )
}

export default App
