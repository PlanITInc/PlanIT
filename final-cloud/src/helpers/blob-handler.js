const { BlobServiceClient } = require("@azure/storage-blob");
const crypto = require('crypto');

const connectionString = process.env.STORAGE_CONNECTION_STRING;
const containerName = process.env.BLOB_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadFile(file) {
    const blobName = crypto.randomBytes(32).toString('hex');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
        // Upload the file buffer to Azure Blob Storage
        console.log("File length is", file.buffer.length);
        await blockBlobClient.uploadData(file.buffer, {
            blobHTTPHeaders: { blobContentType: file.type }, // Set the content type
        });
        console.log(`File "${blobName}" uploaded successfully.`);
        return blockBlobClient.url; // Return the URL of the uploaded file
    } catch (error) {
        console.error(`Error uploading file "${blobName}":`, error.message);
        throw error;
    }
}

async function getBlobURL(blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    return blockBlobClient.url;
}

async function uploadImagesToBlob(files) {
    const urls = [];
    for (const file of files) {
        const url = await uploadFile(file);
        urls.push(url);
    }
    return urls;
}

async function getBlobURLs(blobNames) {
    const urls = [];
    for (const blobName of blobNames) {
        try {
            const url = await getBlobURL(blobName);
            urls.push(url);
        } catch (error) {
            console.error(`Error getting URL for blob "${blobName}":`, error.message);
        }
    }
    return urls;
}

async function checkContainerExists() {
    try {
        const exists = await containerClient.exists();
        if (exists) {
            console.log(`Container "${containerName}" exists.`);
        } else {
            console.log(`Container "${containerName}" does not exist.`);
        }
        return exists;
    } catch (error) {
        console.error("Error checking container existence:", error.message);
        throw error;
    }
}

module.exports = {
    uploadImagesToBlob,
    getBlobURLs,
    checkContainerExists,
    containerClient
};