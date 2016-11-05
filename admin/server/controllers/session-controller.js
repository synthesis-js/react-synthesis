const Session = require('../models/session');

var sessionController = {};

// middleware to create the token and save it to the
// database
sessionController.startSession = (cookieId, callback) => {
  var session = new Session();
  session.cookieId = cookieId;
  session.save(function(err){
      if (err) throw err;
    })
};

sessionController.isLoggedIn = (req, res, next) => {
  Session.findOne({cookieId: req.cookies.ssid}, (err, session) => {
  	if (err) throw err;
  	if (session){
  		if (session.cookieId === req.cookies.ssid){
  			next();
  		}
  		else {
			res.end();
  		}
  	}
  	else {
			res.end();
  		}
	});
  
};

module.exports = sessionController;
