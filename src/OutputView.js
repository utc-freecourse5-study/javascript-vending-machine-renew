const MissionUtils = require("@woowacourse/mission-utils");

const OutputView = {
  printVendingMachineCoin(COIN_500, COIN_100, COIN_50, COIN_10) {
    MissionUtils.Console.print("자판기가 보유한 동전");
    MissionUtils.Console.print(`500원 - ${COIN_500}개`);
    MissionUtils.Console.print(`100원 - ${COIN_100}개`);
    MissionUtils.Console.print(`50원 - ${COIN_50}개`);
    MissionUtils.Console.print(`10원 - ${COIN_10}개`);
  },

  printCurrentVendingMachineMoney(money) {
    MissionUtils.Console.print(`투입 금액: ${money}원`);
  },

  printChanges(COIN_500, COIN_100, COIN_50, COIN_10) {
    MissionUtils.Console.print("잔돈");
    COIN_500 && MissionUtils.Console.print(`500원 - ${COIN_500}개`);
    COIN_100 && MissionUtils.Console.print(`100원 - ${COIN_100}개`);
    COIN_50 && MissionUtils.Console.print(`50원 - ${COIN_50}개`);
    COIN_10 && MissionUtils.Console.print(`10원 - ${COIN_10}개`);
  },
};

module.exports = OutputView;
