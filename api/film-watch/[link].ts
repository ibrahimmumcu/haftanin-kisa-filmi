const MongoClient = require("mongodb").MongoClient;
const dbName = 'films';
const collectionName = 'film';

export default async function handler(req, res) {
  if(req.method === 'GET') { return res.json('no get method, sorry')}
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  const result = await incrementWatchCounter(req.query.link, res);
  res.json(result);
}

async function incrementWatchCounter(link, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
  try {
    const db = client.db(dbName)
    await db.collection(collectionName).updateOne({link: link}, {$inc:{counter:1}})
    console.log('counter incremented return true')
    return true;
  } catch (error) {
    console.log(error, 'counter increment error')
    return error;
  } finally {
    console.log('increment counter close connection');
    client.close();
  }
}