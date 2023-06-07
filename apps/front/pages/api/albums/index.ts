import { NextApiRequest, NextApiResponse } from 'next'
import { apiHttpClient } from '../../../utils/constant';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
      const results = await apiHttpClient.get('/albums')
      res.status(200).json(results)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler