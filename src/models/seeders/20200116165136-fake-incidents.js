const faker = require('faker');
const moment = require('moment');

const dateNow = moment().format('YYYY-MM-DD HH:mm');

const getRandomNumber = (from, to, fixed = 0) => {
  const num = Math.random() * (to - from) + from;
  return num.toFixed(fixed) * 1;
};

const getRandomStatus = () => {
  const statuses = ['OPEN', 'CLOSED'];
  return statuses[getRandomNumber(0, 1)];
};

const data = new Array(600).fill({}).map(() => ({
  information: faker.random.words(getRandomNumber(15, 40)),
  status: getRandomStatus(),
  locationAddress: faker.address.city(),
  locationLat: getRandomNumber(-8, -7, 7),
  locationLng: getRandomNumber(110, 111, 7),
  images: '["https://res.cloudinary.com/sharofuddin/image/upload/v1579108469/rakyat62/td5aeumusxl8bnmqs8zu.jpg","https://res.cloudinary.com/sharofuddin/image/upload/v1579108469/rakyat62/gpedzxq63u5rvxhyppr1.png","https://res.cloudinary.com/sharofuddin/image/upload/v1579108469/rakyat62/gar88dckzsxctumjxxba.png"]',
  createdBy: getRandomNumber(4, 11),
  label: getRandomNumber(1, 3),
  createdAt: moment().subtract(getRandomNumber(2880, 219999), 'minutes').format('YYYY-MM-DD HH:mm'),
  updatedAt: dateNow,
}));

const sortedData = data.sort((a, b) => {
  if (a.createdAt < b.createdAt) {
    return -1;
  }
  if (a.createdAt > b.createdAt) {
    return 1;
  }
  return 0;
});

module.exports = {
  up: (queryInterface/* , Sequelize */) => queryInterface.bulkInsert('incidents', sortedData, {}),
  down: (queryInterface/* , Sequelize */) => queryInterface.bulkDelete('incidents', null, {}),
};
