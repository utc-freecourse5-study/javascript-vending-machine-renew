const InputValidator = {
  validateVendingMachineMoney(money) {
    if (isNaN(money)) {
      throw new Error("[ERROR] 금액은 숫자로 입력해야 합니다.");
    }
    if (Number(money) % 10 !== 0) {
      throw new Error("[ERROR] 금액은 10원 단위로 입력해야 합니다.");
    }
  },
};

module.exports = InputValidator;
