
const Session = require('../models/session_model');

const checkSessions = async (req, res, next) => {
    console.log('active checkSessions');
    try {
        const sessionId = req.cookies.sessionId;

        if (!sessionId) {
            return res.status(400).json({
                error: "sessionId missing. Upload once to create a new session."
            });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(401).json({ error: "Invalid sessionId" });
        }

        req.sessionData = session;
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Session validation failed" });
    }
    next();
}


const requestInterceptor = async (req, res, next) => {
    console.log('active request interceptor');
    next();
}


module.exports = { requestInterceptor, checkSessions };