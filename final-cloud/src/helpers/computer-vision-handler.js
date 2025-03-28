const { ComputerVisionClient } = require("@azure/cognitiveservices-computervision");
const { ApiKeyCredentials } = require("@azure/ms-rest-js");

// Load environment variables
const visionEndpoint = process.env.AZURE_VISION_ENDPOINT;
const visionKey = process.env.AZURE_VISION_KEY;

// Create a Computer Vision client
const credentials = new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": visionKey } });
const computerVisionClient = new ComputerVisionClient(credentials, visionEndpoint);

// Function to analyze an image using Azure Computer Vision API
async function analyzeImage(imageUrl) {
  try {
    const analysis = await computerVisionClient.analyzeImage(imageUrl, {
      visualFeatures: ["Description", "Color"],
    });

    const description = analysis.description?.captions[0]?.text || "No description available";
    const colors = analysis.color?.dominantColors?.join(", ") || "No dominant colors available";

    return {
        description: description,
        colors: colors,
    };
  } catch (error) {
    console.error("Error analyzing image:", error.message);
    return "Error analyzing image";
  }
}

// Function to fetch all images and analyze them
async function processImages(imageUrls) {
  const results = [];
  for (const imageUrl of imageUrls) {
    const result = await analyzeImage(imageUrl);
    results.push(result);
  }
  return results;
}

module.exports = { processImages };