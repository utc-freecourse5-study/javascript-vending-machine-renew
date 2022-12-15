const { REGEX, ERROR_MESSAGE } = require('./constants');

class InputException {
  // -- change
  static checkChange(input) {
    if (!REGEX.divideTenNum.test(input)) {
      throw new Error(ERROR_MESSAGE.change);
    }
  }

  // -- item
  static isCorrectPrice(item) {
    const price = item.split(',')[1];

    return REGEX.divideTenNum.test(price) && Number(price) >= 100;
  }

  static isCorrectItems(input) {
    const inputList = input.split(';');

    return inputList.every((item) => {
      return REGEX.item.test(item) && InputException.isCorrectPrice(item);
    });
  }

  static checkItem(input) {
    if (!InputException.isCorrectItems(input)) {
      throw new Error(ERROR_MESSAGE.item);
    }
  }
}

module.exports = InputException;
