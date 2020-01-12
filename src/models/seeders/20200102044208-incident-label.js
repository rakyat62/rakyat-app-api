const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');


module.exports = {
  up: (queryInterface /* Sequelize */) => queryInterface.bulkInsert('incident_label', [
    {
      name: 'Kecelakaan',
      icon: 'mdi-car-back',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Jalan/Trotoar Rusak',
      icon: 'mdi-road-variant',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    {
      name: 'Kebakaran',
      icon: 'mdi-fire',
      createdAt: dateNow,
      updatedAt: dateNow,
    },
    // {
    //   name: 'Saluran air',
    //   icon: 'mdi-pipe-leak',
    //   createdAt: dateNow,
    //   updatedAt: dateNow,
    // },
    // {
    //   name: 'Lampu PJU',
    //   icon: 'mdi-railroad-light',
    //   createdAt: dateNow,
    //   updatedAt: dateNow,
    // },
  ], {}),

  down: (queryInterface /* Sequelize */) => queryInterface.bulkDelete('incident_label', null, {}),

};
