const VendingMachine = require('./VendingMachine'); // 파일명 확인하고 변경

const { ERROR_MESSAGE } = require('./utils/constants');

let instance = null;

class GameController {
  #service;

  constructor() {
    if (instance) {
      throw new Error(ERROR_MESSAGE.singleton);
    }

    instance = this;

    this.#service = new VendingMachine();
  }

  inputChange(change) {
    this.#service.putChange(change);
  }

  outputChange() {
    return this.#service.getChange();
  }
}

module.exports = Object.freeze(new GameController());
