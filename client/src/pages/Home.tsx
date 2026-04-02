import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Product from "./Product"
import OurPolicy from "../components/OurPolicy"
import NewLetterBox from "../components/NewLetterBox"
import Footer from "../components/Footer"


function Home() {
interface HeroData {
  text1: string
  text2: string
}
  const heroData: HeroData[] = [
    { text1: "30% OFF Limited Offer", text2: "Style that speaks" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose Your Perfect Fashion Fit", text2: "Now on Sale!" }
  ]

  const [heroCount, setHeroCount] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(prev => prev === heroData.length - 1 ? 0 : prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen ">

      <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
      <Product/>
      <OurPolicy/>
      <NewLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home