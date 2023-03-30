import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === "GET") {
        getUser(res);
    }
    else {
        postUser(res, req);
    }
}

async function getUser(res) {
    const user = await prisma.user.findMany()
    res.status(200).json({user})
}
async function postUser(res, req) {
    
}



