import { printCarPositions, printWinners } from '../View/View.js';
import { getWinners } from '../Util/util.js';

class RaceService {
  runRounds(cars, rounds) {
    for (let i = 0; i < rounds; i++) {
      cars.forEach((car) => car.moveForward());
      printCarPositions(cars);
    }
  }

  declareWinners(cars) {
    const maxPosition = Math.max(...cars.map((car) => car.position));
    const winners = getWinners(cars, maxPosition);
    printWinners(winners);
  }
}

export default RaceService;
