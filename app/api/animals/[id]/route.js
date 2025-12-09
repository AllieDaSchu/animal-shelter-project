import prisma from "@/lib/prisma";import {put, del} from "@vercel/blob"
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function PUT(request, {params}) {
    try {
        const {id} = await params
        const animalId = parseInt(id)
        if (isNaN(animalId)) {
            return NextResponse.json({error: "Invalid animalID"}, {status: 400})
        } 
        const formData = await request.formData()
        
            const name = formData.get('name')
            const type = formData.get('type')
            const breed = formData.get('breed')
            const age = formData.get('age')
            const gender = formData.get('gender')
            const size = formData.get('size')
            const description = formData.get('description')
            const img = formData.get('img')
            let existingImgURL = formData.get("existingImgURL")
    
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
            if (!img && !existingImgURL) {
                return NextResponse.json({ error: 'Image is required' }, { status: 400 })
            }
            let finalImgURL = existingImgURL
            if (img && typeof img === "object" && img.size > 0) {
                if (img.size > 1024 * 1024) {
                    return NextResponse.json({ error: 'Image size must be less than 1MB' }, { status: 400 })
                }
            
            
                const arrayBuffer = await img.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer)
                const blob = await put(img.name, buffer, { access: 'public' })
                finalImgURL = blob.url;
            }
        const update = await prisma.animals.update( {
            where: {id: animalId},
            data: {
                name: name.trim(),
                type: type.trim(),
                breed: breed.trim(),
                age: age.trim(),
                gender: gender.trim(),
                size: size.trim(),
                description: description.trim(),
                image_url: finalImgURL,
            }
        })
        return NextResponse.json({data: update}, {status: 201})
        
    } catch(error) {
        if (error.code === "P2002") {
            return NextResponse.json({error: "Unique constraint violation"}, {status: 400})
        } if (error.code === 'P2025') {
            return NextResponse.json({error: "Animal not found"}, {status: 404})
        }
        console.error(error)
        return NextResponse.json({error: "Failed to update animal"}, {status: 500})
    }    
}

export async function DELETE(request, {params}) {
    console.log("Test")
    try {
        
        const {id} = params;
        const animalId = parseInt(id)
        if (isNaN(animalId)) {
            return NextResponse.json({error: "Invalid animal"}, {status: 400})
        }
        const animal = await prisma.animals.findUnique({
            where: {id: animalId}
        })

        if (animal.image_url) {
            const urlParts = animal.image_url.split("/")
            const fileKey = urlParts[urlParts.length - 1]

            try {
                await del(animal.image_url)
                
            } catch (error) {
                return NextResponse.json({error: "Blob Delete Failed"}, {status: 404})
            }
        }

        const deleted = await prisma.animals.delete({
            where: {id: animalId}
        })
        return NextResponse.json({data: deleted}, {status: 200})
    } catch (error) {
        if (error.code === 'P2025') {
            return NextResponse.json({error: "Animal not found"}, {status: 404})
        }
        console.error(error)
        return NextResponse.json({error: "Failed to delete animal"}, {status: 400})
    }
}