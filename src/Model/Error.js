const ERROR_PREFIX = '[ERROR] ';

const ERROR_MESSAGES = Object.freeze({
  rounds: {
    INVALID_INPUT_ROUND: '시도 횟수는 1 이상이어야 합니다.',
    ONLY_INTEGER_ALLOWED: '시도 횟수는 무조건 정수여야합니다.',
    ONLY_POSITIVE_ALLOWED: '시도 횟수는 무조건 양수여야합니다.',
    ONLY_NUMBER_ALLOWED: '시도 횟수는 무조건 숫자여야합니다.',
  },

  names: {
    INVALID_INPUT: '입력이 올바르지 않습니다.',
    INVALID_NAME: '이름이 올바르지 않습니다',
    NAME_TOO_LONG: '자동차 이름은 5자를 초과할 수 없습니다.',
    DUPLICATED_NAMES: '중복된 이름은 사용할수 없습니다.',
    EMPTY_NAME: '공백을 이름으로 사용할수 없습니다',
    CONSECUTIVE_DELIMITERS: '구분자(,)를 중복되서 사용할수 없습니다.',
    WRONG_FORMAT: '포멧팅이 올바르지 않습니다.',
  },

  cars: {
    ILLEGAL_CAR: '생성된 차량 객체가 정의되지 않았습니다.',
    ILLEGAL_CAR_ARRAY: '차량 배열이 올바르지 않습니다.',
  },
});

function throwError(message) {
  throw new Error(ERROR_PREFIX + message);
}

export { throwError, ERROR_MESSAGES, ERROR_PREFIX };
