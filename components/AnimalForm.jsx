'use client'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowUpFromBracket} from '@fortawesome/free-solid-svg-icons'
import {useState} from "react"

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) => String(s ?? "").trim().replace(/\s+/g, " ");
import useForm from "../hooks/useFormHook.js"

const AnimalForm = ({animal}) => {

    const {name, type, breed, age, gender, size, description, img, isSubmitting, errors, success, onChange, handleSubmit, existingImgURL} = useForm({initialData: animal})

    const [fileInput, setFileInput] = useState("")

    const handleFileAddition = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFileInput(file.name)
            onChange({target: {name: "img", files: [file]}})
        } else {
            setFileInput("")
            onChange({target: {name: "img", files: []}})
        }
    }

    return (
        <div className="shadow-all-over rounded-[20px] max-w-[1200px] px-[25px] w-[80%] m-auto mt-[90px]">
            <form className="flex flex-col px-[20px] py-[10px]" onSubmit={handleSubmit}>
                <h1 className="w-[100%] text-center text-4xl mb-[20px]">{animal?.id ? "Update Animal" : "Add an Animal"}</h1>
                <div className="flex flex-col sm:flex-row gap-[20px] pb-[20px]">
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="name">Name: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="name" id="name" value={name} required onChange={onChange} />
                    </div>
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="type">Type: </label>
                        <select className=" p-[2px] w-[100%] h-[30px] pl-[5px] cursor-pointer bg-gray-200 border-1 border-neutral-300 rounded-[7px]" name="type" value={type} onChange={onChange}>
                            <option value="none">Select a Type...</option>
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="gender">Gender: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="gender" id="gender" value={gender} required onChange={onChange} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-[20px] pb-[20px] justify-between">
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="breed">Breed: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="breed" id="breed" value={breed} required onChange={onChange} />
                    </div>
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="age">Age: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="age" id="age" value={age} required onChange={onChange} />
                    </div>
                    <div className="flex flex-col w-[100%] sm:w-[33%]">
                        <label className="block pb-[5px]" htmlFor="size">Size: </label>
                        <input className="w-[100%] h-[30px] pl-[5px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" type="text" name="size" id="size" value={size} required onChange={onChange} />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between">
                    <div className="w-[100%] sm:w-[60%] md:w-[65%] lg:w-[75%]">
                        <label className="block pb-[5px]" htmlFor="description">Description: </label>
                        <textarea className="py-[5px] px-[7px] mb-[20px] w-[100%] h-[100px] rounded-[7px] border-1 border-neutral-300 bg-gray-200" name="description" id="description" placeholder="Add Desc..." value={description} required onChange={onChange} />
                    </div>
                    <div className="flex w-[100%] sm:w-[35%] md:w-[30%] lg:w-[20%] justify-center items-center">
                        <label htmlFor="img" className="flex flex-row sm:flex-col shadow-sm p-[20px] rounded-[20px] items-center flex-col cursor-pointer">
                            <div className="border-2 border-neutral-400 rounded-full w-15 h-15 flex items-center justify-center">
                                <FontAwesomeIcon className="text-neutral-400" icon={faArrowUpFromBracket} />
                            </div>
                            <div className="pl-[25px] sm:pl-[0px]">
                                {animal?.id ? <p className="hidden"></p> : <p>Choose Image</p> }
                                <div id="file-name" className="text-center">{animal?.id ? "Current Image will be kept is no image is uploaded" : fileInput ? fileInput : "No file selected"}</div>
                            </div>
                        </label>
                        <input className="hidden" onChange={handleFileAddition} type="file" name="img" id="img" accept="image/png, image/jpeg, image/jpg, image/gif" />
                    </div>
                </div>
                
                
                {errors && <p className="errors">{errors}</p>}
                <div className="w-[60%] m-auto">
                    <button id="submit" type="submit" className="w-[100%] bg-driftwood-500 rounded-full py-[3px] mt-[20px] text-sisal-50 hover:bg-driftwood-700 transition-bg duration-200 ease-in-out cursor-pointer"
                disabled={
                        isSubmitting ||
                        !stripTags(trimCollapse(name)) ||
                        type == "none" ||
                        !stripTags(trimCollapse(breed)) ||
                        !stripTags(trimCollapse(age)) ||
                        !stripTags(trimCollapse(gender)) ||
                        !stripTags(trimCollapse(size)) ||
                        !stripTags(trimCollapse(description)) ||
                        (!animal?.id && !img) }>
                            {animal?.id ? "Update Animal" : "Add Animal"}
                            
                </button>
                </div>
                
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    )
}

export default AnimalForm