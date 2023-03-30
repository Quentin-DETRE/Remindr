import { Prisma, PrismaClient } from "@prisma/client"

export default async function getAccount(req, res) {
  const prisma = new PrismaClient()
  const account = await prisma.account.findMany()
  res.status(200).json({account})
}
