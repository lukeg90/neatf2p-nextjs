import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleWebsiteUpdate } from '@helpers/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET lastLogin = '${now}', dateModified = '${now}' WHERE id = '${userId}'`

  return handleWebsiteUpdate(query, res)
}

export default handler
