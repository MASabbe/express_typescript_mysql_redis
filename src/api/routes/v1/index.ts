import express from 'express';
import authRoute from "./auth.route";
const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.json({
    upTime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
}));
router.use('/auth', authRoute);
export default router;