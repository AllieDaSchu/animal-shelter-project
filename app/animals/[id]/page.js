import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()
import Link from "next/link"
import Individual from "@/components/Individual.jsx"

async function fetchAnimalData(id) {
    const animal = prisma.animals.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!animal) {
        throw new Error("Animal not found")
    }
    return animal;
}

export default async function generateAnimal({params}) {
    const {id} = await params;

    const animal = await fetchAnimalData(id);

    return (
        animal ?
        <>
            <div className="mt-[80px] px-[25px]">
                <div className="max-w-[1000px] m-auto pb-[10px]">
                    <Link className="underline" href="/animals">&lt; Back to Other Animals</Link>
                </div>
                <div className="rounded-[15px] max-w-[1000px] m-auto w-[100%] mb-[50px] shadow-all-over">
                    <div className="flex flex-col md:flex-row p-[50px]">
                        <div className="relative w-[100%] md:w-[40%] h-[200px] sm:h-[300px] rounded-[20px] flex overflow-hidden items-center shadow-all-over ">
                            <img className="absolute inset-0 w-full h-full object-cover" srcSet={animal.image_url} />
                        </div>
                        <div className="w-[100%] md:w-[60%] pt-[30px] md:p-[50px] flex flex-col items-center md:items-start justify-center">
                            <h1 className="text-4xl mb-[1rem]">{animal.name}</h1>
                            <p className="text-xl mb-[.5rem]">{animal.breed}</p>
                            <p className="mb-[1rem]">{animal.age} - {animal.gender} - {animal.size}</p>
                            <Individual id={id} />
                        </div>
                    </div>
                    <div className="flex flex-col mx-[50px] pb-[50px] before:content-[''] before:border-neutral-200 before:rounded-full before:border-1">
                        <h2 className="text-3xl p-[10px]">About</h2>
                        <p className="pl-[10px]">{animal.description}</p>
                    </div>
                </div>
            </div>
        </>

        : 
        <>
        <div>
        <p>Loading...
        </p></div>
        </>
    )
}