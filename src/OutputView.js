const { Console } = require('@woowacourse/mission-utils');
const controller = require('./GameController');
const { GAME_TEXT } = require('./utils/constants');

const OutputView = {
  printChange() {
    Console.print(GAME_TEXT.changeCommand);
    controller.outputChange().forEach((sentence) => Console.print(sentence));
  },

  printMoney() {
    Console.print(controller.outputMoney());
  },

  printFinalChange() {
    Console.print(GAME_TEXT.changeTwoWord);
    controller
      .outputFinalChange()
      .forEach((sentence) => Console.print(sentence));
    Console.close();
  },
};

module.exports = OutputView;
