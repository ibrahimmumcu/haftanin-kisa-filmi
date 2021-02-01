const MongoClient = require("mongodb").MongoClient;
const fetch = require("node-fetch");
const filmloverssUrl = process.env.FILMLOVERSS_JSON_URL;
const dbName = process.env.MONGODB_DB;
const collectionName = process.env.MONGODB_COLLECTION;

export default async function handler(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json');

  const result = await checkAndSave();
  res.json(result)
}


async function checkAndSave() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
    try {
      const db = client.db(dbName);
      const allCollections = await db.collection(collectionName).find().toArray();
      const filmlerFL = await getDataFromFilmloverss();
      let result;
      
      for(let i=0; i<5; i++) {
        const findIndex = allCollections.findIndex(film => film.link === filmlerFL[i].link);
        if(findIndex === -1) {
          result = await addNewFilm(filmlerFL[i]);
        }
      }

      return result;
    } catch (error) {
      console.log(error, 'all error')
      return error;
    } finally {
      console.log('all close connection')
      client.close()
    }
}

async function getDataFromFilmloverss() {
  try {
    const response = await fetch(filmloverssUrl);
    const data = await response.json();
    //console.log('got data from fl', data.length);
    return data;
  } catch (error) {
    return error;
  }
};


async function addNewFilm(film) {
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }).catch(err => { console.log(err); });
  try {
    const db = client.db(dbName)
    await db.collection(collectionName).insertOne(film);
    console.log('added item return data: ', film.link);
    return true;
  } catch (error) {
    //console.log(error);
  } finally {
    //console.log('added item close connection')
    client.close();
  }
}
