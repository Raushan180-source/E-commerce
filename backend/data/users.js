const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Abhishek kashyap',
    email: '230101120084@centurionuniv.edu.in',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  }
];

module.exports = users;
