const postRun = (req, res) => {
  console.log('request payload:', req.body);
  res.send('POST request to the homepage');
};

module.exports = postRun;
