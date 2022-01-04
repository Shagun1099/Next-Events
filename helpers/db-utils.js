import { MongoClient } from 'mongodb';

export const UseMONGO = async (cb) => {
    const client = await MongoClient.connect(process.env.mongodb_URL);

    const db = client.db();

    try {
        await cb(db);
    } catch (e) {
        console.log(e.response);
    }

    client.close();

}

export const insertDocument = async (db, collection, document) => {
    const result = await db.collection(collection).insertOne(document);
    return result;
}

export const getAllDocuments = async (db, collection, sort, filter) => {
    const result = await db.collection(collection).find().sort(sort).filter(filter).toArray();
    return result;
}

