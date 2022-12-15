const REGEX = Object.freeze({
  // divideTenNum: /^\d*0$/,
  // item: /^\[[가-힣a-z]*,(\d*0),(\d*)\]$/,
});

const ERROR_MESSAGE = Object.freeze({
  singleton: '[ERROR] 이 생성자 함수는 하나의 인스턴스만 생성 가능합니다.',
});

const MODEL_KEY = Object.freeze({
  // change: 'VENDING_CHANGE',
});

const GAME_TEXT = Object.freeze({
  // change: '자판기가 보유하고 있는 금액을 입력해 주세요.\n',
});

module.exports = {
  REGEX,
  ERROR_MESSAGE,
  MODEL_KEY,
  GAME_TEXT,
};
