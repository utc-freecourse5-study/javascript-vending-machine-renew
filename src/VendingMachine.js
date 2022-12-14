const InputValidator = require("./InputValidator");
const RandomCoinGenerator = require("./RandomCoinGenerator");

class VendingMachine {
  #coins = {
    COIN_500: 0,
    COIN_100: 0,
    COIN_50: 0,
    COIN_10: 0,
  };
  #userMoney;
  #products = [];

  constructor(money) {
    this.generateCoins(money);
  }

  #insertCoin(coin) {
    if (coin === 500) this.#coins.COIN_500 += 1;
    if (coin === 100) this.#coins.COIN_100 += 1;
    if (coin === 50) this.#coins.COIN_50 += 1;
    if (coin === 10) this.#coins.COIN_10 += 1;
  }

  generateCoins(money) {
    let currentMoney = 0;
    while (currentMoney < money) {
      let coin = RandomCoinGenerator.generate();
      if (coin < money && coin + currentMoney <= money) {
        currentMoney += coin;
        this.#insertCoin(coin);
      }
    }
  }

  addProduct(product) {
    const newProduct = product.substring(1, product.length - 1).split(",");
    InputValidator.validateProductForm(newProduct);

    this.#products.push({ name: newProduct[0], price: Number(newProduct[1]), count: Number(newProduct[2]) });
  }

  purchaseProduct(productName) {
    this.#products.forEach((product) => {
      if (product.name === productName) {
        this.#userMoney -= product.price;
        product.count -= 1;
      }
    });
  }

  getCoinsCount() {
    return this.#coins;
  }

  setUserMoney(money) {
    this.#userMoney = money;
  }

  getUserMoney() {
    return this.#userMoney;
  }
}

module.exports = VendingMachine;
