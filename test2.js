const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.json());

const TELEGRAM_API_TOKEN = '7001163493:AAFBtDRupr8eC_rJlZItaf-2wMw8yg8MLn4';
const FACEBOOK_APP_SECRET = 'YOUR_FACEBOOK_APP_SECRET';
const FACEBOOK_PAGE_ID = '100067409235113';

const telegramWebhook = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/setWebhook`;
const facebookWebhook = `https://graph.facebook.com/v11.0/${FACEBOOK_PAGE_ID}/subscribed_apps?access_token=${FACEBOOK_APP_SECRET}`;

app.post('/telegram', (req, res) => {
  const { message } = req.body;
  const { text } = message;

  if (text) {
    request.post(`https://graph.facebook.com/v11.0/${FACEBOOK_PAGE_ID}/messages`, {
      qs: {
        access_token: FACEBOOK_APP_SECRET
      },
      json: {
        recipient: {
          id: message.chat.id
        },
        message: {
          text
        }
      }
    }, (err, response, body) => {
      if (!err) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  }
});

app.post('/facebook', (req, res) => {
  const { object } = req.body;
  const { entry } = object;
  const { messaging } = entry[0];

  messaging.forEach(({ sender, message }) => {
    request.post(telegramWebhook, {
      json: {
        url: `https://your-server.herokuapp.com/telegram`,
        secret_token: TELEGRAM_API_TOKEN
      }
    }, (err, response, body) => {
      if (!err) {
        res.sendStatus(200);
      } else {
        res.sendStatus(500);
      }
    });
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port 3000');
});