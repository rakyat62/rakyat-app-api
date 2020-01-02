const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');


module.exports = {
  up: (queryInterface /* Sequelize */) => queryInterface.bulkInsert('incident_label', [
    {
      name: 'Saluran air macet',
      icon: 'mdi-home',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Darurat',
      icon: 'mdi-home',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Jalan',
      icon: 'mdi-home',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'La Label',
      icon: 'mdi-home',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
  ], {}),

  down: (queryInterface /* Sequelize */) => queryInterface.bulkDelete('incident_label', null, {}),

};
