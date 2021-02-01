const MongoClient = require("mongodb").MongoClient;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=600');
  const result = await getPopular(res);
  res.json(result)
}

async function getPopular(res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
    try {
      const db = client.db(dbName);
      const data = await db.collection(collectionName).find().sort({counter:-1}).limit(6).toArray();
      console.log('getPopular return data')
      return data;
    } catch (error) {
      console.log(error, 'getPopular error')
      return error;
    } finally {
      console.log('getPopular close connection')
      client.close()
    }
}