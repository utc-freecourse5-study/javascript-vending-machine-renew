const InputView = require('./InputView');

class App {
  play() {
    InputView.readVendingChange();

    return this;
  }
}

module.exports = App;
