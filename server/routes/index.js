
/*
 * GET home page.
 */
var eightpuzzle = require('../public/javascripts/eightpuzzle');

module.exports = function(app) {
  app.get('/eightpuzzle', function(req, res) {
    var sState = decodeURIComponent(req.query.sState).split(",");
    var eState = decodeURIComponent(req.query.eState).split(",");
    sState = sState.map(function(val){
      return parseInt(val);
    });
    eState = eState.map(function(val){
      return parseInt(val);
    });
    console.log(sState);
    console.log(eState);
    var result = eightpuzzle.startEightPuzzle(sState, eState);
    console.log(result);
    res.jsonp(result);
  })
};
