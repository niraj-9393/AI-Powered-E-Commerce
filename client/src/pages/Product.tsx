import BestSeller from "../components/BestSeller"
import LatestCollection from "../components/LatestCollection"


function Product() {
  return (
    <div className='w-screen min-h-screen bg-linear-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-5'>
      <div className='w-full min-h-17.5 flex items-center justify-center gap-2.5 flex-col'>
        <LatestCollection />
      </div>
      <div className='w-full min-h-17.5 flex items-center justify-center gap-2.5 flex-col'>
        <BestSeller/>
      </div>
    </div>
  )
}

export default Product