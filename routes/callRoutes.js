const express = require('express');
const router = express.Router();
const callController = require('../controllers/callController');
const twilioService = require('../services/twilioService');

router.post('/voice', callController.handleVoice);
router.post('/gather', callController.handleGather);


router.post('/make-call', (req, res) => {
  const { toNumber } = req.body;
  if (!toNumber) {
    return res.status(400).send('Recipient phone number is required.');
  }
  twilioService.makeCall(toNumber);
  res.send('Call initiated.');
});

module.exports = router;
