import { NextApiRequest, NextApiResponse } from 'next';
import { bigcommerceClient, getSession } from '../../../lib/auth';
import { getStoreDataByStoreHash } from '@lib/dbs/mysql';

export default async function products(req: NextApiRequest, res: NextApiResponse) {
  const {
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const { accessToken, storeHash } = await getSession(req);
        const result = await getStoreDataByStoreHash(storeHash);
        res.status(200).json(result[0]);
      } catch (error) {
        const { message, response } = error;
        res.status(response?.status || 500).json({ message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
