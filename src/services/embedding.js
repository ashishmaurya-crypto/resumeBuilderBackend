// services/embedding.js
const { pipeline } = require("@xenova/transformers");

let extractor;

async function loadModel() {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L12-v2" // ✔ supported & works without errors
    );
  }
  return extractor;
}

module.exports.getEmbedding = async function (text) {
  const model = await loadModel();
  const output = await model(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
};
