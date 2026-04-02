import Title from "../components/Title";
import NewLetterBox from "../components/NewLetterBox";

function Contact() {
  return (
    <div className="w-[99vw] md:w-screen min-h-screen flex items-center justify-center flex-col bg-linear-to-l from-[#141414] to-[#0c2025] gap-12.5 pt-20">

      <Title text1={"CONTACT"} text2={"US"} />

      <div className="w-full flex items-center justify-center flex-col lg:flex-row gap-10">

        {/* Left Side - Info */}
        <div className="lg:w-[40%] w-[80%] flex flex-col gap-5 text-white">

          <p className="text-[14px] md:text-[16px]">
            Have questions, feedback, or need support? We’re here to help you.
            Reach out to us anytime and our team will get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-2">
            <b className="text-[#bff1f9] text-[18px]">Email</b>
            <p className="text-[14px]">support@onecart.com</p>
          </div>

          <div className="flex flex-col gap-2">
            <b className="text-[#bff1f9] text-[18px]">Phone</b>
            <p className="text-[14px]">+91 98765 43210</p>
          </div>

          <div className="flex flex-col gap-2">
            <b className="text-[#bff1f9] text-[18px]">Address</b>
            <p className="text-[14px]">
              OneCart HQ, Tech Street, Bengaluru, India
            </p>
          </div>

        </div>

        {/* Right Side - Form */}
        <div className="lg:w-[40%] w-[90%] border border-gray-300 backdrop-blur-[2px] bg-[#ffffff0b] p-8 flex flex-col gap-5 rounded-sm">

          <input
            type="text"
            placeholder="Your Name"
            className="p-3 bg-transparent border border-gray-400 text-white outline-none"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-3 bg-transparent border border-gray-400 text-white outline-none"
          />

          <textarea
            placeholder="Your Message"
            rows={4}
            className="p-3 bg-transparent border border-gray-400 text-white outline-none"
          ></textarea>

          <button className="bg-[#bff1f9] text-black py-3 font-semibold hover:bg-[#9de3ee] transition-all">
            Send Message
          </button>

        </div>

      </div>

      <NewLetterBox />

    </div>
  );
}

export default Contact;