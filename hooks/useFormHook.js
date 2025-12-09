import {useState, useEffect} from 'react'

import {useRouter} from "next/navigation"

const stripTags = (s) => String(s ?? "").replace(/<\/?[^>]+>/g, "");
const trimCollapse = (s) => String(s ?? "").trim().replace(/\s+/g, " ");

const initialValues = {
    name: "",
    type: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    description: "",
    img: null,
    existingImgURL: ""
}

const useForm = ({ initialData }) => {
    const router = useRouter();

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState("")

    useEffect(() => {
        if (!initialData) return;

        setValues({
            name: initialData.name,
            type: initialData.type,
            breed: initialData.breed,
            age: initialData.age,
            gender: initialData.gender,
            size: initialData.size,
            description: initialData.description,
            img: null,
            existingImgURL: initialData.image_url
        })
    }, [initialData?.id])

    const {name, type, breed, age, gender, size, description, img, existingImgURL} = values

    const onChange = (event) => {
        if (event.target.name === "img") {
            const file = event.target.files[0]
            const isFileOk = file && file.size < 1024*1024
            if (isFileOk) {
                setValues({...values, img: file})
            } else {
                setErrors("File size must be less than 1MB")
            }
        } else {
            const {name, value} = event.target;
            setValues({...values, [name]: value})
            setErrors("")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget
        setIsSubmitting(true)
        try {
            const formData = new FormData()
            formData.append("name", stripTags(trimCollapse(name)))
            formData.append("type", stripTags(trimCollapse(type)))
            formData.append("breed", stripTags(trimCollapse(breed)))
            formData.append("age", stripTags(trimCollapse(age)))
            formData.append("gender", stripTags(trimCollapse(gender)))
            formData.append("size", stripTags(trimCollapse(size)))
            formData.append("description", stripTags(trimCollapse(description)))
            if (img) {
                formData.append("img", img)
            }
            if (existingImgURL) {
                formData.append("existingImgURL", existingImgURL)
            }

            const method = initialData?.id ? "PUT" : "POST"
            const fetchURL = initialData?.id ? `/api/animals/${initialData.id}` : `/api/animals`

            const response = await fetch (fetchURL, {
                method: method,
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Failed to submit form")
            }

            setIsSubmitting(false)
            setSuccess("Animals added successfully")

            form.reset();
            if (!initialData?.id) {
                setValues(initialValues)
            }
            const fileInput = document.getElementById("img")
            if (fileInput) {
                fileInput.value = ""
            }
            const redirect = initialData?.id ? `/animals/${initialData.id}` : `/animals`
            console.log(redirect)
            setTimeout(() => {
                setSuccess("")
                router.push(redirect, {replace: true})
            }, 100)
        } catch (error) {
            setErrors(error.message || "There is an error")
        } finally {
            setIsSubmitting(false)
        }
    }
    return {name, type, breed, age, gender, size, description, img, isSubmitting, errors, success, onChange, handleSubmit, existingImgURL}
}

export default useForm;