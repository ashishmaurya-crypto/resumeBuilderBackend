// utils/keywords.js
const sw = require('stopword');

function extractKeywords(text, k = 10) {
  // Clean text → lowercase, remove special chars
  const tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .split(/\s+/);

  // Remove stopwords (the, a, an, is, with, etc.)
  const clean = sw.removeStopwords(tokens);

  // Count frequency
  const freq = {};
  clean.forEach(t => {
    if (t.trim().length > 1) {      // ignore single-letter noise
      freq[t] = (freq[t] || 0) + 1;
    }
  });

  // Sort by frequency → pick top k
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])    // highest count first
    .slice(0, k)
    .map(([word]) => word);
}

module.exports = { extractKeywords };
