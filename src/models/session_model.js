const { Schema, model } = require('mongoose');


const ResumeResultSchema = new Schema({
    originalName: String,
    filename: String,
    textSnippet: String,
    score: Number,
    topKeywords: [String]
}, { _id: false });


const SessionSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    jobDescriptionName: String,
    jobDescriptionFilename: String,
    jobDescriptionText: String,
    results: [ResumeResultSchema]
});


module.exports = model('Session', SessionSchema);