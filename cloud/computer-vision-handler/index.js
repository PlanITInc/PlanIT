AZURE_STORAGE_ACCOUNT="your-storage-account-name"
AZURE_STORAGE_CONTAINER="your-container-name"
AZURE_STORAGE_SAS="your-sas-token"

AZURE_VISION_ENDPOINT="https://your-computer-vision-resource.cognitiveservices.azure.com"
AZURE_VISION_KEY="your-computer-vision-api-key"

import { BlobServiceClient } from "@azure/storage-blob";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// Load environment variables
const visionEndpoint = process.env.AZURE_VISION_ENDPOINT;
const visionKey = process.env.AZURE_VISION_KEY;

// Function to analyze an image using Azure Computer Vision API
async function analyzeImage(imageUrl) {
  try {
    const response = await axios.post(
      `${visionEndpoint}/vision/v3.2/analyze?visualFeatures=Description,Color`,
      { url: imageUrl },
      { headers: { "Ocp-Apim-Subscription-Key": visionKey } }
    );

    const data = response.data;
    const description = data.description.captions[0]?.text || "No description available";
    const colors = data.color.dominantColors.join(", ");

    return `Image Description:${description}\nColors:${colors}`;
  } catch (error) {
    return "";
  }
}

// Function to fetch all images and analyze them
async function processImages(imageUrls) {
    results = [];
    for (const imageUrl of imageUrls) {
        const result = await analyzeImage(imageUrl);
        results.push(result);
    }
    return results;
}