import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
  return (
    
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl  px-6 py-4 flex items-center">

        <img
        onClick={()=>navigate('/home')}
          src="/vcart logo.png"
          alt="app logo"
          className="h-10 w-auto object-contain "
        />

      </div>
    </nav>
  );
};

export default Navbar;