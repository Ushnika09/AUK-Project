const db = require('../config/db');

const User = {
  create: (userData, callback) => {
    const query = 'INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)';
    db.query(
      query,
      [userData.username, userData.email, userData.phone, userData.password],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        callback(null, result);
      }
    );
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results[0]);
    });
  },
};

module.exports = User;
