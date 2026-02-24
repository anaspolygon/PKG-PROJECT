import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ status: string }>
) {
    if (req.method !== 'GET') {
        return res.status(405).end(); // Method Not Allowed
    }

    res.status(200).json({ status: 'ok' });
}
