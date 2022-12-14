const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  printVendingMachineCoin(fiveHundred, oneHundred, fifty, ten) {
    MissionUtils.Console.print("자판기가 보유한 동전");
    MissionUtils.Console.print(`500원 - ${fiveHundred}개`);
    MissionUtils.Console.print(`100원 - ${oneHundred}개`);
    MissionUtils.Console.print(`50원 - ${fifty}개`);
    MissionUtils.Console.print(`10원 - ${ten}개`);
  },

  printCurrentVendingMachineMoney(money) {
    MissionUtils.Console.print(`투입 금액: ${money}원`);
  },

  printChanges(fiveHundred, oneHundred, fifty, ten) {
    MissionUtils.Console.print("잔돈");
    fiveHundred && MissionUtils.Console.print(`500원 - ${fiveHundred}개`);
    oneHundred && MissionUtils.Console.print(`100원 - ${oneHundred}개`);
    fifty && MissionUtils.Console.print(`50원 - ${fifty}개`);
    ten && MissionUtils.Console.print(`10원 - ${ten}개`);
  },
};

module.exports = OutputView;
