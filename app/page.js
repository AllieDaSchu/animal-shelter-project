import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram} from '@fortawesome/free-brands-svg-icons'
import {faLinkedinIn} from '@fortawesome/free-brands-svg-icons'
import {faYoutube} from '@fortawesome/free-brands-svg-icons'
import {faFacebookF} from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faXTwitter} from '@fortawesome/free-brands-svg-icons'
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div id="banner" className="flex shadow-inset justify-center items-center h-[500px] before:content-[''] before:bg-black before:w-[100%] before:h-[500px] before:opacity-45 before:absolute bg-cover bg-center" style={{backgroundImage: 'url(../images/animal-shelter-banner.jpg)'}}>
        <div className="text-center text-sisal-100 z-900 mt-[70px] px-[10px] text-shadow-lg">
          <h1 className="text-6xl pb-[20px] maitree-medium">Happy Paws Animal Shelter</h1>
          <h2 className="text-3xl pb-[15px] ubuntu-regular">Where animals find their fur-ever home</h2>
          <Link className="" href="/animals"><button className="palanquin-regular inline-flex text-lg items-center justify-center bg-driftwood-500 rounded-full pb-[5px] pt-[2px] px-[15px] hover:scale-105 hover:bg-driftwood-700 transform-gpu transition-all duration-200 ease-in-out cursor-pointer">See Availability</button></Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-[25px] max-w-[1200px] m-auto my-[40px] px-[25px] items-center">
        <div className="w-[100%] md:w-[60%] flex justify-center flex-col">
          <h2 className="text-4xl mb-[15px] ubuntu-regular">About Us</h2>
          <p className="text-lg palanquin-regular">
            Happy Paws is an animal shelter that helps both cats and dogs in need. Our mission is to provide compassionate care, safe shelter, and medical support to animals in need while working tirelessly to place them in loving, permanent homes. We are committed to reducing pet overpopulation through spay/neuter initiatives, educating the community on responsible pet ownership, and fostering a culture of kindness and respect for all living beings. By building strong partnerships and engaging volunteers, we strive to create a world where every animal is valued and protected.
          </p>
        </div>
        <div className="w-[100%] justify-center md:w-[40%]">
          <img className="rounded-[25px] w-[100%] shadow-all-over" src="../images/owner-with-puppy-about-us.jpg" />
        </div>
      </div>
      <div className="bg-sisal-600 w-[100%] py-[25px]">
        <div className="flex flex-col md:flex-row gap-[25px] md:gap-0 justify-between items-center h-[100%] max-w-[1200px] px-[25px] m-auto">
          <h3 className="text-4xl text-center md:text-left text-sisal-50 ubuntu-regular">Want to know more about the shelter?</h3>
          <Link href="/contactUs" className="text-2xl palanquin-regular bg-driftwood-800 rounded-full text-sisal-100 pb-[10px] pt-[6px] px-[30px] hover:bg-driftwood-800/0 border border-7 border-driftwood-800 transition-bg duration-200 ease-in-out">Contact Us</Link>
        </div>
      </div>
      <div className="w-[100%] h-[100%] pt-[70px]">
        <div className="flex flex-col gap-[10px] justify-between px-[25px] items-center h-[100%] max-w-[1200px] m-auto">
          <h3 className="text-4xl text-center text-driftwood-900 pb-[25px] ubuntu-medium">Check Out Our Socials!</h3>
          <div className="text-2xl sm:text-4xl text-sisal-50 flex flex-col sm:flex-row gap-[20px]">
            <div className="flex gap-[30px]">

            
              <div className="border-driftwood-900 cursor-pointer border-4 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-5xl" icon={faInstagram} />
              </div>
              <div className="border-driftwood-900 cursor-pointer border-5 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-4xl" icon={faFacebookF} />
              </div>
              <div className="border-driftwood-900 cursor-pointer border-5 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-4xl" icon={faLinkedinIn} />
              </div>
            </div>
            <div className="flex gap-[30px]">
              <div className="border-driftwood-900 cursor-pointer border-5 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-4xl" icon={faYoutube} />
              </div>
              <div className="border-driftwood-900 cursor-pointer border-5 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-4xl" icon={faEnvelope} />
              </div>
              <div className="border-driftwood-900 cursor-pointer border-5 bg-driftwood-900 hover:bg-driftwood-900/0 hover:text-driftwood-900 transition-all duration-200 ease-in-out rounded-[10px] w-20 h-20 flex items-center justify-center">
                <FontAwesomeIcon className="text-4xl" icon={faXTwitter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
