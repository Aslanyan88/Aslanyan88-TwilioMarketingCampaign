const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

exports.handleVoice = (req, res) => {
  const twiml = new VoiceResponse();

  twiml.say('Hello, this is {companyName}. We have an exciting offer for you. Please press 1 to hear more about our services, press 2 to connect with a sales representative, or press 3 to unsubscribe from future calls.');

  twiml.gather({
    numDigits: 1,
    action: '/gather',
    method: 'POST'
  });

  res.type('text/xml');
  res.send(twiml.toString());
};

exports.handleGather = (req, res) => {
  const digit = req.body.Digits;
  const twiml = new VoiceResponse();

  switch (digit) {
    case '1':
      twiml.say('Our services include web development, digital marketing, and automation solutions. Visit our website for more details. Thank you!');
      break;
    case '2':
      twiml.say('Please wait while we connect you to a sales representative.');
      twiml.dial('+1234567890'); // sales representative phone
      break;
    case '3':
      twiml.say('You have been unsubscribed from future calls. Thank you!');
      break;
    default:
      twiml.say('Invalid input. Please press 1 to hear more about our services, press 2 to connect with a sales representative, or press 3 to unsubscribe from future calls.');
      twiml.gather({
        numDigits: 1,
        action: '/gather',
        method: 'POST'
      });
      break;
  }

  res.type('text/xml');
  res.send(twiml.toString());
};
