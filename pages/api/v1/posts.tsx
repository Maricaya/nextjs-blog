import {NextApiHandler} from 'next';
import fs, {promises as fsPromise} from 'fs';
import path from 'path';

const getPosts = async () => {
  const markdownDir = path.join(process.cwd() + 'markdown')

  const fileNames = await fsPromise.readdir(markdownDir)

  console.log(fileNames)
}

const Posts: NextApiHandler =  (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({name: 'frank'}))
  res.end()
}

export default Posts
