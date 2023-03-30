import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        getNotes(res);
    }
    else if (req.method === 'POST') {
        postNote(res, req);
    }
}

async function getNotes(res) {
    const notes = await prisma.note.findMany();
    res.status(200).json({notes})
}


async function postNote(res, req) {
    const { title, content, dateT, colorHex ,id } = req.body;

    const note = await prisma.Note.create({
        data: {
            id_Groupe: parseInt(id),
            title: title,
            content: content,
            date: new Date(dateT),
            couleur: colorHex,
        }   
    });
    
    res.status(201).json({ note });
}