
const { extractTextFromFile } = require('../services/pdfExtractor');
const { getEmbedding } = require('../services/embedding');
const { cosineSimilarity } = require('../services/similarity');
const { extractKeywords } = require('../services/keywords');
const Session = require('../models/session_model');

const uploadFileGenerateScore = async (req, res, next) => {
    try {
        console.log('running====>>>>')
        const resumes = req.files?.resumes;
        const jobDescFile = req.files?.jobDesc?.[0];  // will be undefined
        const jobDescTextInput = req.body.jobDescText;


        console.log('req.files==>>', req.files, req.body)

        if (!resumes || resumes.length === 0) {
            return res.status(400).json({ error: "Upload at least one resume file." });
        }

        // Get job description text
        let jobText = "";

        if (jobDescFile) {
            jobText = await extractTextFromFile(jobDescFile.path);
        } else if (jobDescTextInput) {
            jobText = jobDescTextInput;
        } else {
            return res.status(400).json({
                error: "Provide jobDesc file OR jobDescText field."
            });
        }

        const jobEmbed = (await getEmbedding(jobText));

        console.log('jobEmbed', jobEmbed)

        const resumeResults = await Promise.all(
            resumes.map(async file => {
            const text = await extractTextFromFile(file.path);
            const embedding = await getEmbedding(text);
            const score = cosineSimilarity(jobEmbed, embedding);

            return {
                originalName: file.originalname,
                filename: file.filename,
                textSnippet: text.slice(0, 800),
                score,
                topKeywords: extractKeywords(text, 8),
            };
            })
);

        resumeResults.sort((a, b) => b.score - a.score);

        const session = await Session.create({
            jobDescriptionName: jobDescFile?.originalname || "text-input",
            jobDescriptionFilename: jobDescFile?.filename || null,
            jobDescriptionText: jobText.slice(0, 1500),
            results: resumeResults
        });

        // res.cookie("sessionId", session._id.toString(), {
        //     httpOnly: true, 
        //     sameSite: "lax",
        //     secure: false,    // true if using https
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });

        // res.json({ sessionId: session._id, results: resumeResults });
        res.status(200).send({
                data: { sessionId: session._id, results: resumeResults },
                success: true,
                message: resumeResults.length > 0 ? 'resume proccessed, score generated !!!.' : 'No score found !!!.'
            });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadFileGenerateScore };
