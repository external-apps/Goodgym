const { Admin } = require('../database/db-connection');

const getUserByUsername = (username, callback) => {
  var query = {username: username};
  Admin.findOne(query, callback);
};

const getUserById = (id, callback) => {
  Admin.findById(id, callback);
};

module.exports = {
  getUserByUsername,
  getUserById
};
