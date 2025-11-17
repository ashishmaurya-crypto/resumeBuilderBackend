// function dot(a, b) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; }
// function norm(a) { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * a[i]; return Math.sqrt(s); }
// function cosineSimilarity(a, b) {
//     const d = dot(a, b);
//     const n = norm(a) * norm(b);
//     return n === 0 ? 0 : d / n;
// }
// module.exports = { cosineSimilarity };

function dot(a, b) {
  return a.reduce((sum, val, i) => sum + val * b[i], 0);
}

function magnitude(a) {
  return Math.sqrt(dot(a, a));
}

module.exports.cosineSimilarity = function (a, b) {
  return dot(a, b) / (magnitude(a) * magnitude(b));
};