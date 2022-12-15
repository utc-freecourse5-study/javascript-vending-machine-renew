const GameRepo = require('./GameRepo');
const { MODEL_KEY } = require('./utils/constants');
const { makeRandomChange } = require('./utils/makeRandomChange');

class VendingMachine {
  #repo;

  constructor() {
    this.#repo = new GameRepo();
  }

  static makeChangeData(change) {
    const randomChange = makeRandomChange(change);

    return randomChange.reduce(
      (acc, coin) => {
        return { ...acc, [coin]: acc[coin] + 1 };
      },
      { 500: 0, 100: 0, 50: 0, 10: 0 }
    );
  }

  putChange(change) {
    this.#repo.update(MODEL_KEY.change, VendingMachine.makeChangeData(change));
  }

  #changeTemplate() {
    const changeData = this.#repo.read(MODEL_KEY.change);

    return Object.entries(changeData)
      .reverse()
      .map(([coin, count]) => {
        return `${coin}원 - ${count}개`;
      });
  }

  getChange() {
    return this.#changeTemplate();
  }
}

module.exports = VendingMachine;
