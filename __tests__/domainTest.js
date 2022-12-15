const MissionUtils = require('@woowacourse/mission-utils');

const controller = require('../src/GameController');

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInList = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInList);
};

describe('잔돈 출력 테스트', () => {
  test('잔돈이 제대로 저장되는지 확인 - 무작위 랜덤 함수', () => {
    const input = '450';
    const randoms = [100, 100, 100, 100, 50];
    mockRandoms(randoms);

    controller.inputChange(input);

    expect(controller.outputChange()).toEqual([
      '500원 - 0개',
      '100원 - 4개',
      '50원 - 1개',
      '10원 - 0개',
    ]);
  });
});
