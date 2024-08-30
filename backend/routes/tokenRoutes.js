const express = require('express');
const { createToken, getUserTokens, getTokenDetails } = require('../controllers/tokenController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create',authenticate, createToken);
router.get('/user-tokens', authenticate, getUserTokens);
router.get('/:id', authenticate, getTokenDetails);

module.exports = router;
