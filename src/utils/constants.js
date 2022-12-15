const REGEX = Object.freeze({
  divideTenNum: /^\d*0$/,
  item: /^\[[가-힣a-z]*,(\d*0),(\d*)\]$/,
});

const ERROR_MESSAGE = Object.freeze({
  singleton: '[ERROR] 이 생성자 함수는 하나의 인스턴스만 생성 가능합니다.',
  change: '[ERROR] 금액은 숫자여야 하고 10으로 나눌 수도 있어야 합니다.',
  item: '[ERROR] 상품명, 가격, 수량은 쉼표로, 개별 상품은 대괄호([])로 묶어 세미콜론(;)으로 구분, 상품 가격은 100원 부터 시작하며, 10원으로 나눠떨어져야한다.',
  money: '[ERROR] 금액은 10으로 나눌 수 있는 숫자여야합니다.',
});

const MODEL_KEY = Object.freeze({
  change: 'VENDING_CHANGE',
  item: 'VENDING_ITEM',
  money: 'VENDING_MONEY',
});

const GAME_TEXT = Object.freeze({
  change: '자판기가 보유하고 있는 금액을 입력해 주세요.\n',
  item: '상품명과 가격, 수량을 입력해 주세요.\n',
  money: '투입 금액을 입력해 주세요.\n',
});

module.exports = {
  REGEX,
  ERROR_MESSAGE,
  MODEL_KEY,
  GAME_TEXT,
};
