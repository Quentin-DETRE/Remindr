import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {

        getGroupe(res, req);
    }
    else if (req.method === 'POST') {
        postGroupe(res, req);
    }
    else if (req.method === 'DELETE') {
        console.log("2")
        deleteGroupe(res, req);
    }
    console.log("1")
}

async function getGroupe(res, req) {
    const {id} = req.query;

    const groupe = await prisma.groupe.findUnique({
        where: {
            id: parseInt(id)
        },
        include :{
            notes: true
        }

    });
    res.status(200).json({groupe})
}

async function deleteGroupe(res, req) {
    const {id} = req.query;
    console.log("sex");
    const response = await prisma.groupe.delete({
        where: {
            id: parseInt(id),
        }
    })

    const response2 = await prisma.groupeUser.deleteMany({
        where: {
            id_groupe: parseInt(id),
        }
    })

    res.status(200).json({message : "Groupe supprimé"})
}