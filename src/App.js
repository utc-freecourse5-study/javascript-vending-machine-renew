const InputValidator = require("./InputValidator");
const InputView = require("./InputView");
const OutputView = require("./OutputView");
const VendingMachine = require("./VendingMachine");

class App {
  #vendingMachine;

  play() {
    this.requestVendingMachineCoin();
  }

  requestVendingMachineCoin() {
    InputView.readVendingMachineMoney((money) => {
      if (!this.tryValidate(InputValidator.validateVendingMachineMoney, money)) {
        this.requestVendingMachineCoin();
        return;
      }
      this.#vendingMachine = new VendingMachine(money);
      OutputView.printVendingMachineCoins(this.#vendingMachine.getCoinsCount());
      this.requestProducts();
    });
  }

  requestProducts() {
    InputView.readProductList((products) => {
      try {
        products.split(";").forEach((product) => this.#vendingMachine.addProduct(product));
      } catch (error) {
        OutputView.printErrorMessage(error);
        this.requestProducts();
      }
      this.requestUserMoney();
    });
  }

  requestUserMoney() {
    InputView.readUserMoney((money) => {
      if (!this.tryValidate(InputValidator.validateUserMoney, money)) {
        this.requestUserMoney();
        return;
      }
      this.#vendingMachine.setUserMoney(money);
    });
  }

  requestProductName() {
    OutputView.printCurrentUserMoney(this.#vendingMachine.getUserMoney());
    InputView.readProductName((productName) => {
      this.#vendingMachine.purchaseProduct(productName);
      if (this.#vendingMachine.isAvailablePurchase()) this.requestProductName();
      if (!this.#vendingMachine.isAvailablePurchase()) this.end();
    });
  }

  end() {}

  tryValidate(validate, input) {
    try {
      validate(input);
      return true;
    } catch (error) {
      OutputView.printErrorMessage(error);
      return false;
    }
  }
}

const app = new App();
app.play();

module.exports = App;
