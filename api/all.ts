const MongoClient = require("mongodb").MongoClient;
const dbName = 'films';
const collectionName = 'film';

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');

  let page = Number(req.query.page);
  let perPage = Number(req.query.perPage);
  let sortBy = req.query.sortBy;

  if(isNaN(page)) {
    page = 1;
  }
  if(isNaN(perPage)) {
    perPage = 24;
  }
  if(isNaN(sortBy)) {
    sortBy = 'latest';
  }

  const result = await getAll(page, perPage, sortBy);
  res.json(result)
}

async function getAll(page, perPage, sortBy) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
  page = page - 1;
  const skip = page * perPage;
    try {
      const db = client.db(dbName);
      let data;
      if(sortBy === 'latest') {
        data = await db.collection(collectionName).find().skip(skip).limit(perPage).toArray();
      } else {
        data = await db.collection(collectionName).find().sort({counter:-1}).skip(skip).limit(perPage).toArray();
      }

      const counter = await db.collection(collectionName).countDocuments();

      console.log('all return data')
      return {data, counter};
    } catch (error) {
      console.log(error, 'all error')
      return error;
    } finally {
      console.log('all close connection')
      client.close()
    }
}