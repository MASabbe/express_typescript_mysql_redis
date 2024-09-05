import express from 'express';

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

export default router;