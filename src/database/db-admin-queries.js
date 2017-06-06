const { Admin } = require('../database/db-connection');

const getUserByUsername = (username, cb) => {
  var query = {username: username};
  Admin.findOne(query, cb);
};

const getUserById = (id, cb) => {
  Admin.findById(id, cb);
};

module.exports = {
  getUserByUsername,
  getUserById
};
