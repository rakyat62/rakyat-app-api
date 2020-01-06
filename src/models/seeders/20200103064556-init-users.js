const bcrypt = require('bcryptjs');
const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');

module.exports = {
  up: async (queryInterface /* Sequelize */) => {
    const password = await bcrypt.hash('1234', 10);

    return queryInterface.bulkInsert('users', [
      {
        username: 'udin',
        email: 'udin@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'andre',
        email: 'andre@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'mona',
        email: 'mona@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'lia',
        email: 'lia@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'karina',
        email: 'karina@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'mirna',
        email: 'mirna@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'agus',
        email: 'agus@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'harto',
        email: 'harto@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'yamin',
        email: 'yamin@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'yusuf',
        email: 'yusuf@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'lorena',
        email: 'lorena@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    ], {});
  },

  down: (queryInterface /* Sequelize */) => queryInterface.bulkDelete('users', null, {}),
};
