import Car from '../Model/Car.js';
import { getInput, printWinners, printCarPositions } from '../View/View.js';
import { validateCarNames, validateRounds } from './Validation.js';
import { getWinners } from '../Util/util.js';

let shouldStop = false; // 타임아웃 시 중단을 위한 플래그

async function runRounds(cars, rounds) {
  for (let i = 0; i < rounds; i++) {
    if (shouldStop) {
      console.log('Operation was stopped due to timeout');
      return; // 타임아웃 발생 시 중단
    }

    cars.forEach((car) => car.moveForward());
    printCarPositions(cars); // 자동차 위치 출력

    // 지연 없이 바로 다음 라운드로 진행하되, 비동기적으로 대기
    await new Promise((resolve) => setTimeout(resolve, 0)); // 비동기적 처리
  }
}

async function executeWithTimeout(cars, rounds, timeout) {
  return Promise.race([
    runRounds(cars, rounds), // 라운드 실행
    new Promise(
      (_, reject) =>
        setTimeout(() => {
          shouldStop = true; // 타임아웃 발생 시 플래그 설정
          reject(new Error('Operation timed out'));
        }, timeout), // 지정된 타임아웃 시간 내에 실행되지 않으면 타임아웃
    ),
  ]);
}

class Controller {
  async run() {
    try {
      const carNames = await getInput('자동차 이름을 입력해 주세요');
      const carNamesSplit = validateCarNames(carNames);

      const roundsInput = await getInput('시도할 횟수는 몇 회인가요?');
      const rounds = validateRounds(roundsInput);
      const cars = carNamesSplit.map((carName) => new Car(carName)); // Car 객체 생성
      const timeout = 5000;

      await executeWithTimeout(cars, rounds, timeout);

      if (!shouldStop) {
        const maxPosition = Math.max(...cars.map((car) => car.position));
        const winners = getWinners(cars, maxPosition);

        printWinners(winners); // 우승자 출력
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default Controller;
