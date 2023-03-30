import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        getGroupe(res);
    }
    else if (req.method === 'POST') {
        postGroupe(res, req);
    }
}

async function getGroupe(res) {
    const groupe = await prisma.groupe.findMany();
    res.status(200).json({groupe})
}


async function postGroupe(res, req) {
    const { groupeName, groupeDesc, userId } = req.body;

    const groupe = await prisma.groupe.create({
        data: {
            nom_groupe: groupeName,
            description_groupe: groupeDesc,
        }   
    });
    
    const GroupeUser = await prisma.groupeUser.create({
        data: {
            id_groupe: groupe.id,
            id_user: userId,
        }
    })
    res.status(201).json({ groupe });
}