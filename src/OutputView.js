const { Console } = require('@woowacourse/mission-utils');
const controller = require('./GameController');

const OutputView = {
  printChange() {
    controller.outputChange().forEach((sentence) => Console.print(sentence));
  },

  printMoney() {
    Console.print(controller.outputMoney());
  },
};

module.exports = OutputView;
