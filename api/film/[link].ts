const MongoClient = require("mongodb").MongoClient;
const dbName = 'films';
const collectionName = 'film';

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');
  const result = await getOneFilm(req.query.link, res);
  res.json(result);
}

async function getOneFilm(link, res) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
  try {
    const db = client.db(dbName)
    const data = await db.collection(collectionName).find({link: link}).toArray()
    console.log('get one film return data')
    return data[0];
  } catch (error) {
    console.log(error, 'get one film error');
    return error;
  } finally {
    console.log('get one film close connn')
    client.close();
  }
}