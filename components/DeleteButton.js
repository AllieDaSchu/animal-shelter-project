'use client'

import {useState} from "react"
import {useRouter} from "next/navigation"

export default function DeleteButton({id}) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter();
    const handleClicked = async () => {
        setIsDeleting(true)
        setError("")
        try {
            console.log(id)
            const response = await fetch(`/api/animals/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error||"Failed to Delete animal")
            }
            router.push("/animals")
        } catch (error) {
            setError(error.message)
            setIsDeleting(false)
        }
    }

    return (
        <>
            <button className="w-[50%] text-center cursor-pointer bg-driftwood-500 rounded-full py-[3px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out" onClick={handleClicked} disabled={isDeleting}>Delete</button>
            {error && <p>{error}</p>}
        </>
    )
}