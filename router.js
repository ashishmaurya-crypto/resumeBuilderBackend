const express = require('express');
const router = express.Router();
const uploadRouter = require('./src/routes/upload');



// Define your routes here
router.get("/", (req, res) => {
    res.send("Welcome to the Home Page");
});

// router.use('/users', tokenAuth, userRouter);
router.use('/upload', uploadRouter)



module.exports = router;