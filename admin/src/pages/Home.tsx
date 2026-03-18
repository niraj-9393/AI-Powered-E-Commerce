import Nav from "../components/Nav"
import Sidebar from "../components/SideBar"


function Home() {
  return (
   <div className='w-screen h-screen bg-linear-to-l from-[#141414] to-[#0c2025] text-[white] relative'>
  <Nav />
  <Sidebar />
</div>
    
  )
}

export default Home