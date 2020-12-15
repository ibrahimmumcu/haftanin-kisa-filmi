const MongoClient = require("mongodb").MongoClient;
const dbName = 'films';
const collectionName = 'film';

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
  const result = await getFeatured(res);
  res.json(result)
}

async function getFeatured(res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
    try {
      const db = client.db(dbName);
      const data = await db.collection(collectionName).find({featured:"true"}).limit(1).toArray();
      console.log('getFeatured return data')
      return data;
    } catch (error) {
      console.log(error, 'getFeatured error')
      return error;
    } finally {
      console.log('getFeatured close connection')
      client.close()
    }
}