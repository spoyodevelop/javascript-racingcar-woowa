import App from '../src/App.js';

import { ERROR_PREFIX, ERROR_MESSAGES } from '../src/Model/Error.js';
import {
  mockQuestions,
  mockRandoms,
  getLogSpy,
  validateLogs,
} from '../src/Test/Test.js';

// Test cases for winners
const winnerTestCases = [
  {
    description: '우승자가 여러 명일 때 테스트',
    inputs: ['pobi,woni,honux', '3'],
    randoms: [8, 8, 8, 8, 8, 8, 8, 8, 8],
    expectedLogs: [
      'pobi : -',
      'woni : -',
      'honux : -',
      'pobi : --',
      'woni : --',
      'honux : --',
      'pobi : ---',
      'woni : ---',
      'honux : ---',
      '최종 우승자 : pobi, woni, honux',
    ],
  },
  // 추가할 테스트 케이스는 여기서 추가 가능
];

// Test cases for exceptions
const exceptionTestCases = [
  {
    description: '이름이 공백일 경우 예외 처리 테스트',
    inputs: ['pobi, ,woni'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.names.EMPTY_NAME}`,
  },
  {
    description: '시도 횟수가 0일 때 예외 처리 테스트',
    inputs: ['pobi,woni,honux', '0'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.rounds.ONLY_POSITIVE_ALLOWED}`,
  },
  {
    description: '빈 이름을 입력할 경우 예외 처리 테스트',
    inputs: [''],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.names.EMPTY_NAME}`,
  },
  {
    description: '시도 횟수가 음수일 경우 예외 처리 테스트',
    inputs: ['pobi,woni,honux', '-3'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.rounds.ONLY_POSITIVE_ALLOWED}`,
  },
  {
    description: '이름에 공백만 포함될 경우 예외 처리 테스트',
    inputs: [' , , '],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.names.EMPTY_NAME}`,
  },
  {
    description: '시도 횟수가 숫자가 아닌 문자열일 경우 예외 처리 테스트',
    inputs: ['pobi,woni,honux', 'three'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.rounds.ONLY_NUMBER_ALLOWED}`,
  },
  {
    description: '이름에 길이가 너무 긴 경우 예외 처리 테스트',
    inputs: ['pobi12345678901234567890,woni,honux'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.names.NAME_TOO_LONG}`,
  },
  {
    description: '쉼표로만 구분된 빈 이름들이 입력될 경우 예외 처리 테스트',
    inputs: [',,'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.names.CONSECUTIVE_DELIMITERS}`,
  },
  {
    description: '시도 횟수가 소수일 경우 예외 처리 테스트',
    inputs: ['pobi,woni,honux', '3.5'],
    expectedError: `${ERROR_PREFIX}${ERROR_MESSAGES.rounds.ONLY_INTEGER_ALLOWED}`,
  },
];

describe('자동차 경주 추가 테스트', () => {
  test.each(winnerTestCases)(
    '$description',
    async ({ inputs, randoms, expectedLogs }) => {
      // given
      const logSpy = getLogSpy();
      mockQuestions(inputs);
      mockRandoms(randoms);

      // when
      const app = new App();
      await app.run();

      // then
      validateLogs(logSpy, expectedLogs);
    },
  );

  test.each(exceptionTestCases)(
    '$description',
    async ({ inputs, expectedError }) => {
      // given
      mockQuestions(inputs);

      // when
      const app = new App();

      // then
      await expect(app.run()).rejects.toThrow(expectedError);
    },
  );
});
