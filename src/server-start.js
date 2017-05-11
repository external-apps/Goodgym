const server = require('./server.js');

if (!module.parent) {
  server.listen(3000, () => {
    console.log('Our app listening on port 3000!');
  });
}
