const { REGEX, ERROR_MESSAGE } = require('./constants');

class InputException {
  static checkChange(input) {
    if (!REGEX.divideTenNum.test(input)) {
      throw new Error(ERROR_MESSAGE.change);
    }
  }
}

module.exports = InputException;
