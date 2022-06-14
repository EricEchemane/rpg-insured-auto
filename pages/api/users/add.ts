// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from 'lib/prisma_client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email, password } = JSON.parse(req.body);

    if (!email || !password) {
        res.status(400);
        return;
    }

    try {
        const newUser = await prisma.user.create({
            data: { email, password }
        });
        res.status(200).send(newUser);

    } catch (error: any) {
        if (error.code === 'P2002') res.status(400).json({ error: 'Email already exist' });
        else res.status(500);
    }
}
