const { MongoClient } = require('mongodb');
// import { MongoClient } from 'mongodb';

const uri = process.env.COSMOS_DB_CONNECTION_STRING;

if (!uri) {
    throw new Error("COSMOS_DB_CONNECTION_STRING is not defined!");
}
const client = new MongoClient(uri);

async function connect() {
    try {
        console.log("Attempting to connect to Cosmos DB");
        await client.connect();
        console.log("Connected to Cosmos DB");
    } catch (err) {
        console.error("Failed to connect to Cosmos DB", err);
    }
}

async function closeConnection(params) {
    try {
        await client.close();
        console.log("Connection to Cosmos DB closed");
    } catch (err) {
        console.error("Failed to close connection to Cosmos DB", err);
    }
}

async function createDocument(database, collection, document) {
    try {
        const db = client.db(database);
        const result = await db.collection(collection).insertOne(document);
        console.log(`New document created with the following id: ${result.insertedId}`);
    } catch (err) {
        console.error("Failed to create document", err);
    }
}

async function readDocument(database, collection, query) {
    try {
        const db = client.db(database);
        const document = await db.collection(collection).findOne(query);
        console.log("Document found:", document);
        return document;
    } catch (err) {
        console.error("Failed to read document", err);
    }
}

async function updateDocument(database, collection, query, update) {
    try {
        const db = client.db(database);
        const result = await db.collection(collection).updateOne(query, { $set: update });
        console.log(`Matched ${result.matchedCount} document(s) and modified ${result.modifiedCount} document(s)`);
    } catch (err) {
        console.error("Failed to update document", err);
    }
}

async function deleteDocument(database, collection, query) {
    try {
        const db = client.db(database);
        const result = await db.collection(collection).deleteOne(query);
        console.log(`Deleted ${result.deletedCount} document(s)`);
    } catch (err) {
        console.error("Failed to delete document", err);
    }
}

async function testConnection() {
    try {
        console.log(uri);
        await client.connect();
        console.log("Connected to Cosmos DB successfully!");
        const db = client.db("planit-db"); // Replace with your database name
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
    } catch (err) {
        console.error("Failed to connect to Cosmos DB:", err);
    } finally {
        await client.close();
    }
}

module.exports = {
    connect,
    createDocument,
    readDocument,
    updateDocument,
    deleteDocument
};