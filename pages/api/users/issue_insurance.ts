// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UserType } from 'contexts/userContext';
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

        const { insuranceType, issuePolicyInfo }: UserType = JSON.parse(req.body);

        if (!email || !insuranceType || !issuePolicyInfo) {
            res.status(400).json({ error: 'Incomplete information' });
        }

        const userExist = await prisma.user.findUnique({ where: { email: email } });
        if (!userExist) res.status(404).json({ error: email + ' not found' });

        await prisma.user.update({
            where: { email: email },
            data: {
                insuranceType: insuranceType
            }
        });

        const newInsurance = await prisma.insurance.upsert({
            where: {
                userId: userExist?.id
            },
            update: issuePolicyInfo,
            create: {
                ...issuePolicyInfo,
                user: { connect: { id: userExist?.id } }
            }
        });
        if (newInsurance) res.status(200).json(newInsurance);
        else res.status(500).json({ error: 'unable to create insurance' });

    } catch (error) {
        console.log(error);

        res.status(500).json({ error });
    }
}