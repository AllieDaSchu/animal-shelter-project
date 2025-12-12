"use client";

import Link from "next/link";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {faPaw} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import {useState} from 'react'
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const { data: session, status } = useSession();
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const openDropdown = () => {
        setHamburgerOpen(!hamburgerOpen);
    }

    return (
        <div className="fixed w-[100%] bg-linear-to-br from-sisal-300 to-sisal-100 shadow-md z-1000 top-0">
            <nav>
                <div className="flex text-driftwood-500 justify-between h-[60px] items-center px-[5px] sm:px-[30px] md:px-[75px]">
                    <Link className="flex group flex-row items-center gap-[10px] text-3xl text-driftwood-500 hover:text-driftwood-700 transition-all ease-in-out duration-200" href="/">
                        <FontAwesomeIcon className="text-5xl text-driftwood-500 group-hover:text-driftwood-700 transition-all ease-in-out duration-200 group-hover:-rotate-15" icon={faPaw} /> 
                        <div className="ubuntu-regular">Happy Paws</div>
                    </Link>
                    <div className="sm:hidden">
                        <FontAwesomeIcon className="pr-[20px] text-3xl cursor-pointer" onClick={openDropdown} icon={faBars} />
                        <div className={`bg-sisal-100 ubuntu-regular absolute left-[0] top-[60px] w-[100%] ${hamburgerOpen ? 'block' : 'hidden'}`}>
                            <Link onClick={openDropdown} className="hover:decoration-inherit py-[5px] h-[100%] flex justify-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/animals">Animals</Link>
                            <Link onClick={openDropdown} className="hover:decoration-inherit py-[5px] h-[100%] flex justify-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/contactUs">Contact Us</Link>
                        
                            {session ? (
                                <div>
                                    <Link onClick={openDropdown}  className="palanquin-regular hover:decoration-inherit py-[5px] h-[100%] flex justify-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/owner/addAnimal">Add Animal</Link>
                                </div>
                                ) : (
                                    <div className="hidden">
                                    </div>
                            )}

                        </div>
                    </div>
                    <div className="hidden ubuntu-regular sm:flex gap-[10px] md:gap-[20px] relative h-[100%] items-center text-lg">
                        <Link className="hover:decoration-inherit px-[10px] h-[100%] flex items-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/animals">Animals</Link>
                        <Link className="hover:decoration-inherit px-[10px] h-[100%] flex items-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/contactUs">Contact Us</Link>
                        
                        {session ? (
                            <div>
                                <Link className="hover:decoration-inherit px-[10px] h-[100%] flex items-center hover:text-driftwood-600 underline decoration-transparent transition-all duration-200 ease-in-out" href="/owner/addAnimal">Add Animal</Link>
                            </div>
                            ) : (
                                <div className="hidden">
                                </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
