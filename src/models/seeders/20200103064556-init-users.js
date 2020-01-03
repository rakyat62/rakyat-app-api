const bcrypt = require('bcryptjs');
const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');

module.exports = {
  up: async (queryInterface /* Sequelize */) => {
    const password = await bcrypt.hash('1234', 10);

    return queryInterface.bulkInsert('users', [
      {
        username: 'gaspadat',
        email: 'gaspadat@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'biazhar',
        email: 'biazhar@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'lankkuu',
        email: 'lankkuu@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'sudahdipakai',
        email: 'sudahdipakai@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        username: 'aezakmi',
        email: 'aezakmi@example.org',
        phone: '088678789',
        password,
        createdAt: dateNow,
        updatedAt: dateNow,
      },
    ], {});
  },

  down: (queryInterface /* Sequelize */) => queryInterface.bulkDelete('users', null, {}),
};
