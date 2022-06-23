// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from 'lib/prisma_client';
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import jwt from 'jsonwebtoken';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const cookies = new Cookies(req, res);
        let email: any = cookies.get('email');

        const signature = process.env.SIGNATURE;
        if (email && signature) {
            email = jwt.verify(email, signature);
        }

        const { payment } = JSON.parse(req.body);

        if (!email || !payment) {
            res.status(400).json({ error: 'Incomplete information' });
            return;
        }

        const userExist = await prisma.user.findUnique({ where: { email: email } });
        if (!userExist) res.status(404).json({ error: email + ' not found' });

        const updated = await prisma.payment.upsert({
            where: { userId: userExist?.id },
            update: payment,
            create: {
                ...payment,
                user: { connect: { id: userExist?.id } }
            }
        });

        res.status(200).json({ updated });

    } catch (error) {
        console.log(error);

        res.status(500).json({ error });
    }
}