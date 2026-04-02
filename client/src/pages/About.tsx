
import Title from '../components/Title'
import about from "../assets/about.png"
import NewLetterBox from '../components/NewLetterBox'
function About() {
  return (
    <div className="w-[99vw] md:w-screen min-h-screen flex items-center justify-center flex-col bg-linear-to-l from-[#141414] to-[#0c2025] gap-12.5 pt-20">

      <Title text1={'ABOUT'} text2={'US'} />

      <div className="w-full flex items-center justify-center flex-col lg:flex-row">

        <div className="lg:w-[50%] w-full flex items-center justify-center">
          <img
            src={about}
            alt=""
            className="lg:w-[65%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>
        <div className="lg:w-[50%] w-[80%] flex items-start justify-center gap-5 flex-col mt-5 lg:mt-0">

          <p className="lg:w-[80%] w-fullext-white  text-white md:text-[16px] text-[13px]">
            OneCart born for smart, seamless shopping—created to deliver quality products,
            trending styles, and everyday essentials in one place. With reliable service,
            fast delivery, and great value, OneCart makes your online shopping experience
            simple, satisfying, and stress-free.
          </p>

          <p className="lg:w-[80%] w-full text-white md:text-[16px] text-[13px]">
            Modern shoppers—combining style, convenience, and affordability. Whether it's
            fashion, essentials, or trends, we bring everything you need to one trusted
            platform with fast delivery, easy returns, and a customer-first shopping
            experience you'll love.
          </p>

          <p className="lg:w-[80%] w-fullext-[15px] text-white lg:text-[18px] mtmt-2.5ont-bold">
            Our Mission
          </p>

          <p className="lg:w-[80%] w-fullext-white   text-white md:text-[16px] text-[13px]">
            Our mission is to redefine online shopping by delivering quality, affordability,
            and convenience. OneCart connects customers with trusted products and brands,
            offering a seamless, customer-focused experience that saves time, adds value,
            and fits every lifestyle and need.
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center flex-col gap-2.5">

        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className="w-[80%] flex items-center justify-center lg:flex-row flex-col py-10">

          {/* Card 1 */}
          <div className="lg:w-[33%] w-[90%] h-62.5 border border-gray-300 flex items-center justify-center gap-5 flex-col px-10 py-2.5 text-white backdrop-blur-[2px] bg-[#ffffff0b]">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Quality Assurance
            </b>

            <p className="text-center text-[14px]">
              We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.
            </p>

          </div>

          {/* Card 2 */}
          <div className="lg:w-[33%] w-[90%] h-62.5 border border-gray-300 flex items-center justify-center gap-5 flex-col px-10 py-2.5 text-white backdrop-blur-[2px] bg-[#ffffff0b]">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Convenience
            </b>

            <p className="text-center text-[14px]">
              Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.
            </p>

          </div>

          {/* Card 3 */}
          <div className="lg:w-[33%] w-[90%] h-62.5 border border-gray-300 flex items-center justify-center gap-5 flex-col px-10 py-2.5 text-white backdrop-blur-[2px] bg-[#ffffff0b]">

            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Exceptional Customer Service
            </b>

            <p className="text-center text-[14px]">
              Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.
            </p>

          </div>

        </div>

      </div>
      <NewLetterBox/>

    </div>
  )
}

export default About