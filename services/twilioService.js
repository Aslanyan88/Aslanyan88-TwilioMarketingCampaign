const twilio = require('twilio');
const twilioConfig = require('../config/twilioConfig');

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

exports.makeCall = (toNumber) => {
  client.calls
    .create({
      url: 'https://hello-voice-3243-cmjm0m.twil.io/hello-voice',  // Replace with server URL
      to: toNumber, 
      from: twilioConfig.twilioNumber
    })
    .then(call => console.log(call.sid))
    .catch(error => console.error(error));
};
