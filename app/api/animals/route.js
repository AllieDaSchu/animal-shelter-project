import prisma from "@/lib/prisma";import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export const runtime = 'nodejs'

export async function POST(request) {
    console.log("Test")
    try {
        const formData = await request.formData()

        const name = formData.get('name')
        const type = formData.get('type')
        const breed = formData.get('breed')
        const age = formData.get('age')
        const gender = formData.get('gender')
        const size = formData.get('size')
        const description = formData.get('description')
        const img = formData.get('img')

        console.log('Form data received:', { name, type, breed, age, gender, size, description, img: img?.name })

        if (!name || name.trim() === '') {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }
        if (!type || type.trim() === '') {
            return NextResponse.json({ error: 'Type is required' }, { status: 400 })
        }
        if (!breed || breed.trim() === '') {
            return NextResponse.json({ error: 'Breed is required' }, { status: 400 })
        }
        if (!age || age.trim() === '') {
            return NextResponse.json({ error: 'Age is required' }, { status: 400 })
        }
        if (!gender || gender.trim() === '') {
            return NextResponse.json({ error: 'Gender is required' }, { status: 400 })
        }
        if (!size || size.trim() === '') {
            return NextResponse.json({ error: 'Size is required' }, { status: 400 })
        }
        if (!description || description.trim() === '') {
            return NextResponse.json({ error: 'Description is required' }, { status: 400 })
        }
        if (!img) {
            return NextResponse.json({ error: 'Image is required' }, { status: 400 })
        }
        if (img.size > 1024 * 1024) {
            return NextResponse.json({ error: 'Image size must be less than 1MB' }, { status: 400 })
        }

        const arrayBuffer = await img.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const blob = await put(img.name, buffer, { access: 'public', token: process.env. BLOB_READ_WRITE_TOKEN, })
        
        const animal = await prisma.animals.create({
            data: {
                name: name.trim(),
                type: type.trim(),
                breed: breed.trim(),
                age: age.trim(),
                gender: gender.trim(),
                size: size.trim(),
                description: description.trim(),
                image_url: blob.url,
            },
        })

        return NextResponse.json({ data: animal }, { status: 201 })
    } catch(error) {
        //I want to throw the error code when the animal already exists in the system
        if (error.code === "P2002") {
            return NextResponse.json({error: "Animal already exists in our database"}, {status: 400})
        }
        console.error(error)
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
    }
}