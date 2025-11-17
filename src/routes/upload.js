const express = require('express');
const uploadRouter = express.Router();
const {requestInterceptor, checkSessions} = require('./../middelware/interceptor')
//controllers
const {uploadFileGenerateScore} = require('./../controllers/upload_controllers')


//middleware
// uploadRouter.use(checkSessions);
// userRouter.use(requestInterceptor);

uploadRouter.post("/upload_file_generate_score", uploadFileGenerateScore);

module.exports = uploadRouter ;