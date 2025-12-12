import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'


export default function Home() {
  return (
    <div className="flex flex-col mb-[50px] md:flex-row max-w-[1100px] gap-[25px] m-auto mt-[100px] px-[25px] items-center">
        <div className="w-[100%] md:w-[50%] flex flex-col gap-[15px]">
            <h1 className="text-4xl ubuntu-regular">Contact Us</h1>
            <p className="palanquin-regular text-md">Feel free to reach out on this page or through another form of communication.</p>
            <div className="palanquin-medium flex flex-row items-center text-lg"><FontAwesomeIcon className="text-4xl text-driftwood-700" icon={faPhone} /><p className="pl-[15px]">(123) 456 - 7890</p></div>
            <div className="palanquin-medium flex flex-row items-center text-lg"><FontAwesomeIcon className="text-4xl text-driftwood-700" icon={faEnvelope} /><p className="pl-[15px]">happypaws@gmail.com</p></div>
            <div className="palanquin-medium flex flex-row items-center text-lg"><FontAwesomeIcon className="text-4xl text-driftwood-700" icon={faLocationDot} /><div className="pl-[15px]"><p>123 N Linden Street,</p><p>West Lafayette, IN, 47906</p></div></div>
        </div>
        <div className="palanquin-regular w-[100%] md:w-[50%] shadow-all-over rounded-[20px]">
            <form className="p-[50px] flex flex-col gap-[15px]">
                <div className="flex gap-[25px]">
                    <div className="w-[50%]">
                        <label className="block pb-[5px]" htmlFor="firstName">First Name: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="firstName" id="firstName" required />
                    </div>
                    <div className="w-[50%]">
                        <label className="block pb-[5px]" htmlFor="lastName">Last Name: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="lastName" id="lastName" required />
                    </div>
                </div>
                <div className="w-[100%]">
                    <label className="block pb-[5px]" htmlFor="email">Email: </label>
                    <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="email" id="email" required />
                </div>
                <div className="w-[100%]">
                    <label className="block pb-[5px]" htmlFor="phone">Phone (optional): </label>
                    <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="phone" id="phone" required />
                </div>
                <div className="w-[100%]">
                    <label className="block pb-[5px]" htmlFor="message">Message: </label>
                    <textarea className="py-[5px] px-[7px] w-[100%] h-[100px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" name="message" id="message" placeholder="Add Message" required />
                </div>
                <button type="submit" id="submit" className="palanquin-medium w-[100%] bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out cursor-pointer">Send Message</button>
            </form>
        </div>
    </div>
  )
}