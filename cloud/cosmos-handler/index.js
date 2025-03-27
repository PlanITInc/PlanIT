// const { MongoClient } = require('mongodb');

// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connect() {
//     try {
//         await client.connect();
//         console.log("Connected to Cosmos DB");
//     } catch (err) {
//         console.error("Failed to connect to Cosmos DB", err);
//     }
// }

// async function createDocument(database, collection, document) {
//     try {
//         const db = client.db(database);
//         const result = await db.collection(collection).insertOne(document);
//         console.log(`New document created with the following id: ${result.insertedId}`);
//     } catch (err) {
//         console.error("Failed to create document", err);
//     }
// }

// async function readDocument(database, collection, query) {
//     try {
//         const db = client.db(database);
//         const document = await db.collection(collection).findOne(query);
//         console.log("Document found:", document);
//         return document;
//     } catch (err) {
//         console.error("Failed to read document", err);
//     }
// }

// async function updateDocument(database, collection, query, update) {
//     try {
//         const db = client.db(database);
//         const result = await db.collection(collection).updateOne(query, { $set: update });
//         console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
//     } catch (err) {
//         console.error("Failed to update document", err);
//     }
// }

// async function deleteDocument(database, collection, query) {
//     try {
//         const db = client.db(database);
//         const result = await db.collection(collection).deleteOne(query);
//         console.log(`Deleted ${result.deletedCount} document(s)`);
//     } catch (err) {
//         console.error("Failed to delete document", err);
//     }
// }

// async function testConnection() {
//     try {
//         await client.connect();
//         console.log("Connected to Cosmos DB successfully!");
//         const db = client.db("planit-db"); // Replace with your database name
//         const collections = await db.listCollections().toArray();
//         console.log("Collections:", collections);
//     } catch (err) {
//         console.error("Failed to connect to Cosmos DB:", err);
//     } finally {
//         await client.close();
//     }
// }

// testConnection();

// module.exports = {
//     connect,
//     createDocument,
//     readDocument,
//     updateDocument,
//     deleteDocument
// };