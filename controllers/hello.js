const alive = (req, res) => {
  var data = {
    isAlive: true,
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  };
  res.status(200).json(data);
};

const ping = (req, res) =>
  res.status(200).json({
    message: "pong",
    timestamp: new Date().toISOString(),
    path: req.path,
    method: req.method,
  });

module.exports = {
  alive,
  ping,
};
