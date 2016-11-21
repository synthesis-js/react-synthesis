const sessionController = require('./session-controller');

let cookieController = {};

cookieController.setSSIDCookie = (err, req, res, id) => {
  if (err) {
    return console.error('error setting cookie');
  } else {
    res.cookie('ssid', id, { httpOnly: true });
    sessionController.startSession(id);
  }
};

module.exports = cookieController;
