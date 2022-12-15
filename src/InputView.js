const { Console } = require('@woowacourse/mission-utils');

const controller = require('./GameController');
const OutputView = require('./OutputView');

const { GAME_TEXT } = require('./utils/constants');
const { errorCheckFor } = require('./utils/errorCheckFor');
const InputException = require('./utils/InputException');

const InputView = {
  // -- ChangeInput
  successVendingChangeEvent(input) {
    InputException.checkChange(input);
    controller.inputChange(input);
    OutputView.printChange(input);

    this.readVendingItem();
  },

  readVendingChangeEvent(input) {
    errorCheckFor(
      () => this.successVendingChangeEvent(input),
      () => this.readVendingChange()
    );
  },

  readVendingChange() {
    Console.readLine(GAME_TEXT.change, (input) => {
      this.readVendingChangeEvent(input);
    });
  },

  // -- ItemInput
  successVendingItemEvent(input) {
    InputException.checkItem(input);
    controller.inputItem(input);

    this.readVendingMoney();
  },

  readVendingItemEvent(input) {
    errorCheckFor(
      () => this.successVendingItemEvent(input),
      () => this.readVendingItem()
    );
  },

  readVendingItem() {
    Console.readLine(GAME_TEXT.item, (input) => {
      this.readVendingItemEvent(input);
    });
  },

  // -- MoneyInput
  successVendingMoneyEvent(input) {
    InputException.checkChange(input);
    controller.inputMoney(input);

    this.readVendingChoiceItem();
  },

  readVendingMoneyEvent(input) {
    errorCheckFor(
      () => this.successVendingMoneyEvent(input),
      () => this.readVendingMoney()
    );
  },

  readVendingMoney() {
    Console.readLine(GAME_TEXT.money, (input) => {
      this.readVendingMoneyEvent(input);
    });
  },

  // -- ChoiceItem
  tradePossible(input) {
    if (controller.checkItem(input)) {
      OutputView.printMoney();
      controller.subTrackMoney(input);
      this.readVendingChoiceItem();
    }

    return this;
  },

  tradeImmposible(input) {
    if (!controller.checkItem(input)) {
      OutputView.printMoney();
      OutputView.printFinalChange();
      Console.close();
    }
  },

  readVendingChoiceItemEvent(input) {
    this.tradePossible(input);
  },

  readVendingChoiceItem() {
    Console.readLine(GAME_TEXT.choiceItem, (input) => {
      this.readVendingChoiceItemEvent(input);

      this.tradeImmposible(input);
    });
  },
};

module.exports = InputView;
