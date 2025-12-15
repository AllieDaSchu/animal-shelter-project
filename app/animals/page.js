export const dynamic = "force-dynamic";

import Link from 'next/link'
import Search from "@/components/Search.jsx"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function AnimalGrid({params, searchParams}) {
    const {animals} = await params
    const {search = "", gender= "", age="", size=""} = await searchParams

    const animalList = await prisma.animals.findMany({
        where: { 
            type: animals,
            name: search ? { contains: search, mode: "insensitive" } : undefined,
        },
        orderBy: { id: 'asc' }
    });

    const allGenders = await prisma.animals.findMany({
        distinct: ['gender'],
        select: { gender: true },
        orderBy: { gender: "asc" },
    });

    const allAges = await prisma.animals.findMany({
        distinct: ['age'],
        select: { age: true },
        orderBy: { age: "asc" },
    });
    const allSizes = await prisma.animals.findMany({
        distinct: ['size'],
        select: { size: true },
        orderBy: { size: "asc" },
    });

    const genders = allGenders.map((g) => g.gender)
    const ages = allAges.map((a) => a.age);
    const sizes = allSizes.map((s) => s.size)

    //const header = animal.length > 0 ? animal[0].type : animals;
    //const fixedHeader = header[0].toUpperCase() + header.substring(1) + "s"

    return (
         <div className="mt-[90px]">
            <h1 className="w-[100%] text-center text-5xl my-[25px] ubuntu-regular">Animals Available</h1>
            {/* <Search search={search} gender={gender} age={age} size={size} genders={genders} ages={ages} sizes={sizes} /> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-[10px] max-w-[1000px] m-auto px-[20px]">
                {animalList.map((a) => (
                    
                        <div key={a.id} className={`w-[100%] overflow-hidden relative group hover:ease rounded-[15px] shadow-all-over scale-100 hover:scale-101 transition-all ease-in-out duration-300 h-[200px] bg-cover bg-center flex flex-col`}>
                            <Link className="w-[100%] h-[100%]" key={a.id} href={`/animals/${a.id}`}>
                                <img src={a.image_url} alt={a.name} className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute bottom-0 w-[100%] z-60 flex flex-col justify-end h-[100%]">
                                <div className="w-[100%] rounded-b-[14px] justify-between items-center flex flex-row overflow-hidden py-[7px] px-[15px] bg-white">
                                    <div>
                                        <p className="ubuntu-medium">{a.name}</p>
                                        <p className="hidden sm:block palanquin-medium">{a.type} - {a.gender}</p>
                                    </div>
                                    <div className="pr-[5px] group-hover:pr-[0px] group-hover:shadow-black transition-all ease-out duration-300"><FontAwesomeIcon className="w-[25px] h-[25px]" icon={faArrowRight} /></div>
                                    
                                </div>
                            </div>
                            
                            </Link>
                        </div>
                    
                ))}
            </div>
        </div>
    )
}