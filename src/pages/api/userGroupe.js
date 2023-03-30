import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {

    if (req.method === 'POST') {
        postUserGroupe(res, req);
    }
    else if(req.method==='GET') {
        getUserGroupe(res);
    }
}

async function getUserGroupe(res) {
    const userGroup = await prisma.groupeUser.findMany();
    res.status(200).json({userGroup})
}
async function postUserGroupe(res, req) {
    const { idUser, groupeId } = req.body;

    const note = await prisma.groupeUser.create({
        data: {
            id_user: idUser,
            id_groupe: parseInt(groupeId),
        }   
    });
    
    res.status(201).json({ note });
}