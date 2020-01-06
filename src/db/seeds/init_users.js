const bcrypt = require('bcryptjs');
const { tableNames } = require('../../constants');

exports.seed = async (knex) => {
  // Deletes ALL existing entries
  const password = await bcrypt.hash('1234', 10);

  return knex(tableNames.USER).del()
    .then(() => knex(tableNames.USER).insert([
      {
        username: 'gaspadat',
        email: 'gaspadat@example.org',
        phone: '088678789',
        password,
      },
      {
        username: 'biazhar',
        email: 'biazhar@example.org',
        phone: '088678789',
        password,
      },
      {
        username: 'lankkuu',
        email: 'lankkuu@example.org',
        phone: '088678789',
        password,
      },
      {
        username: 'sudahdipakai',
        email: 'sudahdipakai@example.org',
        phone: '088678789',
        password,
      },
      {
        username: 'aezakmi',
        email: 'aezakmi@example.org',
        phone: '088678789',
        password,
      },
    ]));
};
