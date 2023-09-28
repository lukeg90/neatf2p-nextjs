import { NextApiRequest, NextApiResponse } from 'next'
import { queryWebsiteDatabase } from '@helpers/db'
import { NewsPost } from 'src/globalTypes/NewsPost'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'

/** Handler for the getNewsPosts API endpoint.
 * Query Options:
    * `?limit=n` - limits the number of results from the database
    * `?id=n` - returns a single news post (in an array) by its unique ID
 */
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    const list: NewsPost[] = []
    const limit = req?.query?.limit
    const id = req?.query?.id
    const query = `SELECT np.id, i.image, i.alt, np.title, np.datePosted, np.body
      FROM newsposts np
      LEFT OUTER JOIN images i ON np.image = i.id
      ${id ? `WHERE np.id = ${id}` : ''}
      ORDER BY np.datePosted DESC
      ${limit ? `LIMIT ${limit}` : ''}`

    const response: Array<any> | ErrorResult = await queryWebsiteDatabase(query)
    
    if (response instanceof Array) {
      response?.map((rowDataPacket: NewsPost) => {
        const newObject = { ...rowDataPacket, image: rowDataPacket.image?.toString() || '' }
        list.push(newObject);
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(list))
    } else {
      throw new Error(response.error?.toString())
    }
  }
  catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
