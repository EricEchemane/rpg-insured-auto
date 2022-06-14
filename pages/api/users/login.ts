import prisma from 'lib/prisma_client';
import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

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
        const user = await prisma.user.findUnique({
            where: { email: email }
        });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        if (user.password === password) {
            const signature = process.env.SIGNATURE;
            if (signature) {
                const token = jwt.sign(email, signature);
                res.status(200).send(token);
            }
            else res.status(500).send('Server error occured');
        }

    } catch (error) {
        res.status(500).end();
    }
}