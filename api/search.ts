const MongoClient = require("mongodb").MongoClient;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');

  let searchTerm = req.query.searchTerm;

  const result = await getResults(searchTerm);
  res.json(result)
}

async function getResults(searchTerm) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
    try {
      const db = client.db(dbName);
      const data = await db.collection(collectionName).find({
        "$or": [
            { title: { '$regex': searchTerm, '$options': 'i' } },
            { description: { '$regex': searchTerm, '$options': 'i' } }
        ]
    }).toArray();
      console.log('get search result return data')
      return data;
    } catch (error) {
      console.log(error, 'get search result error')
      return error;
    } finally {
      console.log('get search result close connection')
      client.close()
    }
}