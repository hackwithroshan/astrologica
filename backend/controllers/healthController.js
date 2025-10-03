const mongoose = require('mongoose');
const asyncHandler = require('../middleware/async');

// @desc      Check application health
// @route     GET /api/health
// @access    Public
exports.checkHealth = asyncHandler(async (req, res, next) => {
    const requiredEnvVars = [
        'MONGO_URI',
        'JWT_SECRET',
        'RAZORPAY_KEY_ID',
        'RAZORPAY_KEY_SECRET',
        'FRONTEND_URL',
        'PHONEPE_MERCHANT_ID',
        'PHONEPE_SALT_KEY'
    ];
    
    const checks = {};
    let isHealthy = true;

    // 1. Check for missing environment variables
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
    if (missingVars.length > 0) {
        isHealthy = false;
        checks.environmentVariables = {
            status: 'error',
            message: `The server is missing ${missingVars.length} required environment variable(s). Please add them in your Vercel project settings.`,
            missing: missingVars
        };
    } else {
        checks.environmentVariables = {
            status: 'ok',
            message: 'All required environment variables are present.'
        };
    }

    // 2. Check database connection status
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
        0: { status: 'error', message: 'Database is disconnected. Check your MONGO_URI value and ensure your IP is whitelisted in MongoDB Atlas.' },
        1: { status: 'ok', message: 'Database is connected successfully.' },
        2: { status: 'warning', message: 'Database is currently connecting...' },
        3: { status: 'error', message: 'Database is disconnecting.' },
        99: { status: 'error', message: 'Database connection state is uninitialized.' }
    };

    checks.databaseConnection = dbStatus[dbState] || dbStatus[99];
    if (checks.databaseConnection.status === 'error') {
        isHealthy = false;
    }
    
    const overallStatus = isHealthy ? 'ok' : 'error';
    const statusCode = isHealthy ? 200 : 503; // 503 Service Unavailable

    res.status(statusCode).json({
        status: overallStatus,
        message: isHealthy ? 'Backend is running and configured correctly.' : 'Backend has critical configuration errors that must be fixed.',
        timestamp: new Date().toISOString(),
        checks
    });
});
