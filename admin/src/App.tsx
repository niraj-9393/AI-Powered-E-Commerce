import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Lists from "./pages/Lists"
import Orders from "./pages/Orders"
import Add from "./pages/Add"
import { useContext } from "react"
import { adminDataContext } from "./context/adminContext"

function App() {
 
const {adminData} = useContext(adminDataContext)!
  return (
    <>
    {!adminData ? <Login/> :
   <><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add" element={<Add />} />
      </Routes>
      </>}
       
    </>
  )
}

export default App
