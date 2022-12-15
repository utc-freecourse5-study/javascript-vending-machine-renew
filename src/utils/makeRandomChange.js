const RandomCoinGenerator = require('../RandomCoinGenerator');

const makeRandomChange = (change) => {
  let changeNum = Number(change);
  const result = [];

  while (changeNum > 0) {
    const randomCoin = RandomCoinGenerator.generate();
    if (randomCoin <= changeNum) {
      result.push(randomCoin);
      changeNum -= randomCoin;
    }
  }

  return result;
};

module.exports = {
  makeRandomChange,
};
