import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registation from "./pages/Registation"
import Navbar from "./components/NavBar"


function App() {


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registation" element={<Registation />} />
      </Routes>
    </>
  )
}

export default App
