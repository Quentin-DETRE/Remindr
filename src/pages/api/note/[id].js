import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {

        getNote(res, req);
    }
    else if (req.method === 'DELETE') {
        console.log("passe")
        deleteNote(res, req);
    }
    else if(req.method === 'PUT') {
        putNote(res, req);
    }
}

async function getNote(res, req) {
    const {id} = req.query;

    const note = await prisma.note.findUnique({
        where: {
            id: parseInt(id)
        },
    });

    res.status(200).json({note})
}

async function deleteNote(res, req) {

    const {id} = req.query;
    const response = await prisma.note.delete({
        where: {
            id: parseInt(id),
        }
    })
    console.log(response);
    res.status(200).json({message : "Note supprimé"})
}

async function putNote(res, req) {
    const { id } = req.query;
    const { title, content, dateT, couleur } = req.body;

    // const date = new Date(dateT).toISOString();

    const note = await prisma.note.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title: title,
        content: content,
        date: dateT,
        couleur: couleur,
      },
    });
    res.status(200).json({ note });
}