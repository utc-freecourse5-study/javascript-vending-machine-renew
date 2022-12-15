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

  // -- Item
  static removeItemBracket(item) {
    return item.split(';').map((value) => value.replace(/\[\]/g, '').trim());
  }

  static makeItemData(item) {
    const itemList = VendingMachine.removeItemBracket(item);
    // console.log(itemList);

    return itemList.reduce((acc, itemString) => {
      const [name, price, count] = itemString.split(',');
      return { ...acc, [name]: { price, count } };
    }, {});
  }

  putItem(item) {
    // console.log(VendingMachine.makeItemData(item))
    this.#repo.update(MODEL_KEY.item, VendingMachine.makeItemData(item));
  }

  // -- Money
  putMoney(money) {
    this.#repo.update(MODEL_KEY.money, Number(money));
  }

  #moneyTemplate() {
    const money = this.#repo.read(MODEL_KEY.money);
    // console.log(money);

    return `투입금액: ${money}원`;
  }

  getMoney() {
    // console.log(this.#moneyTemplate());
    return this.#moneyTemplate();
  }
}

module.exports = VendingMachine;
