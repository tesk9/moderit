module.exports = function() {
  return function(req, res, callback) {
    var data = "";
    req.on("data", function(chunk) {
      data += chunk;
    });
    req.on("end", function() {
      callback(req, res, data);
    });
  };
};
