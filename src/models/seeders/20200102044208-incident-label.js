const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');


module.exports = {
  up: (queryInterface /* Sequelize */) => queryInterface.bulkInsert('incident_label', [
    {
      name: 'Saluran air',
      icon: 'mdi-pipe-leak',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Kecelakaan',
      icon: 'mdi-car-back',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Lampu PJU',
      icon: 'mdi-rail-roal-light',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Jalan Bermasalah',
      icon: 'mdi-road-variant',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Lampu Trafik',
      icon: 'mdi-traffic-light',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
  ], {}),

  down: (queryInterface /* Sequelize */) => queryInterface.bulkDelete('incident_label', null, {}),

};
