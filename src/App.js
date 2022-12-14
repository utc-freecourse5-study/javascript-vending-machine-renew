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
    });
  }

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
