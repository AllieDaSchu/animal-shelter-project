'use client'

import {useState} from "react"
import Link from "next/link"

export default function Search ({search, gender, age, size, genders, ages, sizes}) {
    const [filters, setFilters] = useState(false)

    const openFilters = () => {
        setFilters(!filters)
    }
    return (
        <form method="GET" action="/animals">
            <div className="max-w-[750px] m-auto my-[20px]">
                <div className="flex">
                    <div className="w-[75%]">
                        <label htmlFor="search">Search by Name: </label>
                        <input id="search" className="search-bar bg-gray-300 pl-[10px] rounded-[10px]" defaultValue={search} type="text" placeholder="Enter Name" name="search" />
                    </div>
                    <div className="w-[25%]">
                        <button className="text-center cursor-pointer relative" type="button" onClick={openFilters}>Filters</button>
                        <div className={`absolute flex flex-col z-1000 bg-white rounded-[10px] p-[10px] ${filters ? "block" : "hidden"}`}>
                            <div>
                                <label>Gender</label>
                                <ul>
                                    <li></li>
                                </ul>
                            </div>
                            
                            <label>Age</label>
                            <label>Size</label>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">Search</button>
                    <Link href="/animals">Clear</Link>
                </div>
            </div>
        </form>
    )
}