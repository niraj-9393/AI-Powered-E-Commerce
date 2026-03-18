import back1 from "../assets/back1.jpg";
import back2 from "../assets/back2.jpg";
import back3 from "../assets/back3.jpg";
import back4 from "../assets/back4.jpg"

interface BackgroundProps {
  heroCount: number;
}

function Background({ heroCount }: BackgroundProps) {
  const images = [back1, back2, back3, back4];

  return (
    <img
      src={images[heroCount]}
      alt=""
      className="w-full h-full object-cover"
    />
  );
}

export default Background;