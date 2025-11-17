const fs2 = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path2 = require('path');


async function extractTextFromFile(fp) {
    const ext = path2.extname(fp).toLowerCase();


    if (ext === '.pdf') {
        const data = fs2.readFileSync(fp);
        const parsed = await pdfParse(data);
        return parsed.text.replace(/\s+/g, ' ');
    }


    if (ext === '.docx') {
        const parsed = await mammoth.extractRawText({ path: fp });
        return parsed.value.replace(/\s+/g, ' ');
    }


    if (ext === '.txt') return fs2.readFileSync(fp, 'utf8').replace(/\s+/g, ' ');


    return '';
}


module.exports = { extractTextFromFile };