'use client'

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) => String(s ?? "").trim().replace(/\s+/g, " ");
import useForm from "../hooks/useFormHook.js"

const InterestForm = ({animal}) => {

        const {name} = useForm({initialData: animal})

    return (
        <>
            <div className="flex flex-col mb-[50px] md:flex-row max-w-[1100px] gap-[25px] m-auto mt-[100px] px-[25px] items-center">
                <div className="w-[100%] shadow-all-over rounded-[20px]">
                    <form className="p-[50px] flex flex-col gap-[15px]">
                        <h1 className="w-[100%] text-center text-4xl mb-[20px]">Interest Form</h1>
                        <div className="flex flex-col sm:flex-row gap-[10px] sm:gap-[25px]">
                            <div className="w-[100%] sm:w-[50%]">
                                <label className="block pb-[5px]" htmlFor="firstName">First Name: </label>
                                <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="firstName" id="firstName" required />
                            </div>
                            <div className="w-[100%] sm:w-[50%]">
                                <label className="block pb-[5px]" htmlFor="lastName">Last Name: </label>
                                <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="lastName" id="lastName" required />
                            </div>
                        </div>
                        <div className="w-[100%]">
                            <label className="block pb-[5px]" htmlFor="email">Animal: </label>
                            <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="animal" id="animal" value={name} disabled />
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
                        <button type="submit" id="submit" className="w-[100%] bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out cursor-pointer">Send Message</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InterestForm;