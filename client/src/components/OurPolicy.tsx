import Title from "./Title"
import { RiExchangeLine } from "react-icons/ri";
import { TbRosetteDiscountCheck } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
function OurPolicy() {
    return (
        <div className='w-screen h-screen md:h-[70vh] flex items-center justify-start flex-col bg-linear-to-l from-[#141414] to-[#0c2025] gap-12.5 '>
            <div className='h-[8%] w-full text-center mt-17.5 '>
                <Title text1={"OUR"} text2={"POLICY"} />
                <p className='w-full m-auto text-[13px] md:text-[20px] px-2.5 text-blue-100 '>
                    Customer-Friendly Policies | Committed to Your Satisfaction and Safety.
                </p>
            </div>
            <div className='w-full md:min-h-[50%] h-[20%] flex items-center justify-center flex-wrap lg:gap-12.5 gap-20'>
                <div className='w-100 max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5'>
                    <RiExchangeLine className='md:w-15 w-7.5 h-7.5 md:h-15 text-[#90b9ff]' />

                    <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>
                        Easy Exchange Policy
                    </p>

                    <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>
                        Exchange Made Easy | Quick, Simple, and Customer-Friendly Process.
                    </p>
                </div>
                <div className='w-100 max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5'>
                    <TbRosetteDiscountCheck className='md:w-15 w-7.5 h-7.5 md:h-15 text-[#90b9ff]' />

                    <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>
                        7 Days Replacement Policy
                    </p>

                    <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>
                         Shop without fear | with in time Replacement gaurantee.
                    </p>
                </div>
                <div className='w-100 max-w-[90%] h-[60%] flex items-center justify-center flex-col gap-2.5'>
                    <BiSupport className='md:w-15 w-7.5 h-7.5 md:h-15 text-[#90b9ff]' />

                    <p className='font-semibold md:text-[25px] text-[19px] text-[#a5e8f7]'>
                        24*7 Customer Support 
                    </p>

                    <p className='font-semibold md:text-[18px] text-[12px] text-[aliceblue] text-center'>
                        Any type of Query | Any time 
                    </p>
                </div>
            </div>

        </div>
    )
}

export default OurPolicy