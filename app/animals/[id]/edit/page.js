import AnimalForm from "@/components/AnimalForm.jsx"
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()

export default async function EditProfilePage({params}) {

    const {id} = await params;
    const animal = await prisma.animals.findUnique ({
        where: {
            id: parseInt(id),
        },
    })

    return(
        <>
            <AnimalForm animal={animal} />
        </>
    )
}