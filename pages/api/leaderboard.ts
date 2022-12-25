import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@utils/Prisma'
import { authernate } from '@utils/Utils'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const list = await prisma.leaderboard.findMany({
      orderBy: [{ seconds: 'asc' }],
    })

    res.status(200).json(list)
  } else if (req.method == 'POST') {
    if (!authernate(req.headers.key as string))
      return res.status(401).json({ error: 'Unauthorized' })
    const { name, studentID, seconds, staff } = req.body
    if (!name || !studentID || !seconds)
      return res.status(400).json({ error: 'Missing required fields' })

    const list = await prisma.leaderboard.create({
      data: {
        name,
        studentID,
        seconds,
        staff,
      },
    })

    return res.status(200).json(list)
  } else if (req.method == 'DELETE') {
    if (!authernate(req.headers.key as string))
      return res.status(401).json({ error: 'Unauthorized' })
    const { idx } = req.body
    if (!idx) return res.status(400).json({ error: 'Missing required fields' })

    const list = await prisma.leaderboard.delete({
      where: {
        idx,
      },
    })

    return res.status(200).json(list)
  }
}
