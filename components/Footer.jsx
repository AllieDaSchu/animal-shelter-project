"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'


const Footer = () => {
    const { data: session, status } = useSession();
    return (
        <div className="bg-driftwood-800 mt-[70px] bottom-[0px] w-[100%] px-[10px]">
            <div className="max-w-[750px] m-auto flex flex-col items-center sm:flex-row sm:items-start text-sisal-100 gap-[20px] sm:gap-[5px] justify-between py-[40px]">
                <div className="">
                    <h3 className="text-2xl">Our Hours</h3>
                    <div className="flex gap-[20px]">
                        <div>
                            <p>Monday</p>
                            <p>Tuesday</p>
                            <p>Wednesday</p>
                            <p>Thursday</p>
                            <p>Friday</p>
                            <p>Saturday</p>
                            <p>Sunday</p>
                        </div>
                        <div>
                            <p>Closed</p>
                            <p>12pm - 6pm</p>
                            <p>12pm - 6pm</p>
                            <p>12pm - 6pm</p>
                            <p>12pm - 6pm</p>
                            <p>12pm - 6pm</p>
                            <p>Closed</p>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col gap-[5px]">
                    <Link className="text-2xl cursor-pointer" href="/contactUs">Contact Us</Link>
                    <p className="cursor-pointer"><FontAwesomeIcon className="pr-[5px]" icon={faEnvelope} />happypaws@gmail.com</p>
                    <p className="cursor-pointer"><FontAwesomeIcon className="pr-[5px]" icon={faPhone} />(123) 456-7890</p>
                    <div className="flex">
                        <div><FontAwesomeIcon className="pr-[5px]" icon={faLocationDot} /></div>
                        <div>
                            <p>123 N Linden Street,</p>
                            <p>West Lafayette, IN, 47906</p>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h3 className="text-2xl">Socials</h3>
                    <p className="cursor-pointer">Instagram</p>
                    <p className="cursor-pointer">Facebook</p>
                    <p className="cursor-pointer">LinkedIn</p>
                    <p className="cursor-pointer">YouTube</p>
                    <p className="cursor-pointer">X</p>
                    {status === "loading" ? (
                    <span>Loading...</span>
                    ) : session ? (
                    <>
                        <span className="">{session.user.email}</span>
                        <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="cursor-pointer pl-[5px] underline"
                        >
                        Sign Out
                        </button>
                    </>
                    ) : (
                    <Link href="/auth/signin" className="cursor-pointer">
                        Owner Sign In
                    </Link>
                    )}
                </div>
            </div>
            <div>
                <p className="text-center text-sisal-100 pb-[20px]">Happy Paws Animal Shelter - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer;