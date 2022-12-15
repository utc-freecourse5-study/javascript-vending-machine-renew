const GameRepo = require('./GameRepo');

class VendingMachine {
  #repo;

  constructor() {
    this.#repo = new GameRepo();
  }
}

module.exports = VendingMachine;
