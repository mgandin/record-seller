import { NextApiRequest, NextApiResponse } from 'next'
import { apiHttpClient } from '../../../utils/constant';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
      const result = await apiHttpClient.get('/records')
      res.status(200).json(result)
  } catch (err: any) {
    console.log(err)
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler