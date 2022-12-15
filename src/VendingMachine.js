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
    return item.split(';').map((value) => value.replace(/[\\[\]]/g, '').trim());
  }

  static makeItemData(item) {
    const itemList = VendingMachine.removeItemBracket(item);

    return itemList.reduce((acc, itemString) => {
      const [name, price, count] = itemString.split(',');
      return { ...acc, [name]: { price: +price, count: +count } };
    }, {});
  }

  putItem(item) {
    this.#repo.update(MODEL_KEY.item, VendingMachine.makeItemData(item));
  }

  // -- Money
  putMoney(money) {
    this.#repo.update(MODEL_KEY.money, Number(money));
  }

  #moneyTemplate() {
    const money = this.#repo.read(MODEL_KEY.money);

    return `투입금액: ${money}원`;
  }

  getMoney() {
    return this.#moneyTemplate();
  }

  // -- choice Item
  // 해당 항목이 있는지 + 수량이 있는지, + 가격은 충분한지 (거래 가능한지)
  #isVendingItem(choiceItem) {
    const itemDic = this.#repo.read(MODEL_KEY.item);

    return (
      Object.keys(itemDic).includes(choiceItem) && itemDic[choiceItem].count > 0
    );
  }

  #isEnoughPrice(choiceItem) {
    const itemDic = this.#repo.read(MODEL_KEY.item);
    const money = this.#repo.read(MODEL_KEY.money);

    return itemDic[choiceItem].price <= money;
  }

  isPossibleTrade(item) {
    return this.#isVendingItem(item) && this.#isEnoughPrice(item);
  }

  minusPutMoney(choiceItem) {
    const choiceItemInfo = this.#repo.read(MODEL_KEY.item)[choiceItem];
    const money = this.#repo.read(MODEL_KEY.money);

    this.#repo.update(MODEL_KEY.money, money - choiceItemInfo.price);
    this.#repo.update(MODEL_KEY.item, {
      ...this.#repo.read(MODEL_KEY.item),
      choiceItemInfo: {
        price: choiceItemInfo.price,
        count: choiceItemInfo.count - 1,
      },
    });
  }

  #sumAllChangeCount() {
    const changeDic = this.#repo.read(MODEL_KEY.change);

    return Object.values(changeDic).reduce((acc, count) => acc + count, 0);
  }

  #isChangeFor(coin, money) {
    const changeDic = this.#repo.read(MODEL_KEY.change);

    return changeDic[coin] > 0 && money >= coin;
  }

  #setChangeCountMinusOne(coin) {
    const changeDic = this.#repo.read(MODEL_KEY.change);
    const changeFinalDic = this.#repo.read(MODEL_KEY.final) || {};

    this.#repo.update(MODEL_KEY.change, {
      ...changeDic,
      [coin]: changeDic[coin] - 1,
    });

    this.#repo.update(MODEL_KEY.final, {
      ...changeFinalDic,
      [coin]: (changeFinalDic[coin] || 0) + 1,
    });
  }

  #changeMoneyEvent() {
    while (
      this.#repo.read(MODEL_KEY.money) > 0 &&
      this.#sumAllChangeCount() !== 0
    ) {
      const money = this.#repo.read(MODEL_KEY.money);
      if (this.#isChangeFor('500', money)) this.#setChangeCountMinusOne('500');
      else if (this.#isChangeFor('100', money))
        this.#setChangeCountMinusOne('100');
      else if (this.#isChangeFor('50', money))
        this.#setChangeCountMinusOne('50');
      else if (this.#isChangeFor('10', money))
        this.#setChangeCountMinusOne('10');
    }
  }

  #changeFinalData() {
    const changeData = this.#repo.read(MODEL_KEY.final);

    return Object.entries(changeData)
      .reverse()
      .map(([coin, count]) => {
        return `${coin}원 - ${count}개`;
      });
  }

  changeMoney() {
    this.#changeMoneyEvent();
    return this.#changeFinalData();
  }
}

module.exports = VendingMachine;
