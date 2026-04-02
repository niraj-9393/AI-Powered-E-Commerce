import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registation from "./pages/Registation"
import Navbar from "./components/NavBar"
import { useContext } from "react"
import { userDataContext } from "./context/userContext"
import About from "./pages/About"
import Collection from "./pages/Collection"
import Contact from "./pages/Contact"
import Product from "./pages/Product"
import ProjectDetails from "./components/ProjectDetails"


function App() {
  const { userData } = useContext(userDataContext)!;
  let location = useLocation();

  return (
    <>
      {userData && <Navbar />}

      <Routes>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Login />
          }
        />

        <Route
          path="/registation"
          element={
            userData
              ? <Navigate to={location.state?.from || "/"} />
              : <Registation />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            userData
              ? <Home />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/about"
          element={
            userData
              ? <About />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />
        <Route
          path="/product-details/:productId"
          element={
            userData
              ? <ProjectDetails />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }

        />
        <Route
          path="/collection"
          element={
            userData
              ? <Collection />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/contact"
          element={
            userData
              ? <Contact />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }
        />

        <Route
          path="/product"
          element={
            userData
              ? <Product />
              : <Navigate to="/login" state={{ from: location.pathname }} />
          }

        />

      </Routes>
    </>
  );
}
export default App
