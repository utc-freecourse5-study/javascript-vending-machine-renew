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

  // --ItemInput
  readVendingItem() {},
};

module.exports = InputView;
