require('env2')(`${__dirname}/../../.env`);
const apiKey = process.env.API_KEY;

const home = (req, res) => {
  res.render('home', {
    apiKey: apiKey
  });
};

module.exports = home;
