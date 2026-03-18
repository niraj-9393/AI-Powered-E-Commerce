import { FaCircle } from "react-icons/fa"
import back1 from "../assets/back1.jpg"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.jpg"
import back4 from "../assets/back4.jpg"

interface HeroData {
  text1: string
  text2: string
}

interface HeroProps {
  heroData: HeroData
  heroCount: number
  setHeroCount: React.Dispatch<React.SetStateAction<number>>
}

const images = [back1, back2, back3, back4]

function Hero({ heroData, heroCount, setHeroCount }: HeroProps) {

  return (
    <div className="flex w-full h-screen overflow-hidden">

      {/* LEFT TEXT SECTION */}
      <div className="w-full md:w-1/2 bg-[#07292e] flex flex-col justify-center px-[8%]">

        <h1 className="text-[#88d9ee] text-3xl md:text-5xl lg:text-6xl font-semibold leading-tight">
          {heroData.text1}
        </h1>

        <h2 className="text-[#88d9ee] text-3xl md:text-5xl lg:text-6xl font-semibold mt-3">
          {heroData.text2}
        </h2>

        {/* DOT NAVIGATION */}
        <div className="flex gap-3 mt-10">

          {images.map((_, index) => (
            <FaCircle
              key={index}
              onClick={() => setHeroCount(index)}
              className={`w-3 h-3 cursor-pointer transition-all duration-300
              ${heroCount === index ? "fill-orange-400 scale-110" : "fill-white"}`}
            />
          ))}

        </div>

      </div>


      {/* RIGHT IMAGE SECTION */}
      <div className="hidden md:block w-1/2 h-full">

        <img
          src={images[heroCount]}
          alt="hero"
          className="w-full h-full object-cover transition-all duration-700"
        />

      </div>

    </div>
  )
}

export default Hero