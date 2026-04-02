import logo from "../assets/vcart logo.png"

function Footer() {
    return (
        <div className='w-full'>

            {/* FOOTER SECTION */}
            <div className='w-full bg-[#cfe8e8] px-5 md:px-15 py-10 flex flex-col md:flex-row justify-between gap-7.5'>

                {/* LEFT */}
                <div className='md:w-[30%] flex flex-col gap-3.75'>

                    <div className='flex items-center gap-2.5'>
                        <img src={logo} alt="" className='w-8.75 h-8.75' />
                        <p className='text-[20px] font-semibold'>OneCart</p>
                    </div>

                    <p className='text-[14px] text-[#1e2223] leading-5.5'>
                        OneCart is your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery—all backed by trusted service designed to make your life easier every day.
                    </p>
                </div>


                {/* COMPANY */}
                <div className='md:w-[20%] flex flex-col gap-2.5 text-center md:text-left'>
                    <p className='text-[18px] font-semibold'>COMPANY</p>
                    <p>Home</p>
                    <p>About us</p>
                    <p>Delivery</p>
                    <p>Privacy Policy</p>
                </div>


                {/* CONTACT */}
                <div className='md:w-[25%] flex flex-col gap-2.5 text-center md:text-left'>
                    <p className='text-[18px] font-semibold'>GET IN TOUCH</p>
                    <p>+91-9876543210</p>
                    <p>contact@onecart.com</p>
                    <p>+1-123-456-7890</p>
                    <p>admin@onecart.com</p>
                </div>

            </div>


            {/* COPYRIGHT */}
            <div className='w-full bg-[#cfe8e8] text-center py-3 text-[14px] border-t border-gray-400'>
                Copyright 2025@onecart.com - All Rights Reserved
            </div>

        </div>
    )
}

export default Footer