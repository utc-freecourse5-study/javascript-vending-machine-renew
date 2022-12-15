const InputException = require('../src/utils/InputException');

describe('(잔돈) InputException 입력값 테스트', () => {
  test.each([['aaa'], [' 10'], ['11'], ['1000 ']])(
    '(실패) 숫자 입력값 확인',
    (input) => {
      expect(() => InputException.checkChange(input)).toThrow('[ERROR]');
    }
  );

  test('(성공) 재시작/종료 입력값 확인', () => {
    const input = '1000';
    expect(() => InputException.checkChange(input)).not.toThrow();
  });
});
