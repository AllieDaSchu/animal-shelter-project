"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import DeleteButton from "@/components/DeleteButton.js"

const Individual = ({id}) => {
    const { data: session } = useSession();
    return (
        <>
            {session ? (
                <div className="palanquin-medium flex w-[100%] gap-[20px] mt-[10px]">
                    <Link className="palanquin-medium w-[50%] text-center cursor-pointer bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out" href={`/animals/${id}/edit`}>Edit</Link>
                    <DeleteButton className="" id={id} />
                </div>
                ) : (
                <Link href={`/animals/${id}/interest`} className="palanquin-medium text-center w-[100%] cursor-pointer bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out">Submit Interest</Link>
            )} 
        </>
    )
}

export default Individual