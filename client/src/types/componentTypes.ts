export interface HeroProps {
  heroData: {
    text1: string
    text2: string
  }
  heroCount: number
  setHeroCount: React.Dispatch<React.SetStateAction<number>>
}