import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registation from "./pages/Registation"
import Navbar from "./components/NavBar"
import { useContext } from "react"
import { userDataContext } from "./context/userContext"


function App() {

const {userData} = useContext(userDataContext)!;
  return (
    <>
    {userData && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registation" element={<Registation />} />
      </Routes>
    </>
  )
}

export default App
