import { BlobServiceClient } from "@azure/storage-blob";

const accountName = "your-storage-account-name";
const containerName = "your-container-name";
const sasToken = "your-sas-token"; 

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net?${sasToken}`
);

const containerClient = blobServiceClient.getContainerClient(containerName);

async function uploadFile(file) {
    const blobName = file.name;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadBrowserData(file);
}

async function getBlobURL(blobName) {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    return blockBlobClient.url;
}

async function uploadImagesToBlob(files) {
    for (const file of files) {
        await uploadFile(file);
    }
    return getBlobURLs(files.map(file => file.name));
}

async function getBlobURLs(blobNames) {
    const urls = [];
    for (const blobName of blobNames) {
        const url = await getBlobURL(blobName);
        urls.push(url);
    }
    return urls;
}