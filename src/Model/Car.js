import { Random } from '@woowacourse/mission-utils';
import { throwError, ERROR_MESSAGES } from './Error.js';
import CAR_SETTINGS from '../Config/SettingValues.js';

export default class Car {
  #carName;

  #position;

  constructor(carName) {
    if (typeof carName !== 'string') {
      throwError(ERROR_MESSAGES.INVALID_NAME);
    }
    this.#carName = carName;
    this.#position = 0;
  }

  get carName() {
    return this.#carName;
  }

  get position() {
    return this.#position;
  }

  moveForward() {
    if (
      Random.pickNumberInRange(
        CAR_SETTINGS.MIN_RANDOM_VALUE,
        CAR_SETTINGS.MAX_RANDOM_VALUE,
      ) >= CAR_SETTINGS.MIN_MOVE_THRESHOLD
    ) {
      this.#position += 1;
    }
  }

  #getPositionString() {
    return '-'.repeat(this.#position); // 위치가 0일 경우에도 빈 문자열을 반환함
  }

  toString() {
    return `${this.#carName} : ${this.#getPositionString()}`;
  }
}
