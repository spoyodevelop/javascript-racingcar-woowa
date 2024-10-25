import Car from '../Model/Car.js';
import { getInput } from '../View/View.js';
import {
  validateCarNames,
  validateCars,
  validateRounds,
} from '../Validation/Validation.js';
import SYSTEM_MESSAGES from '../Model/systemMessages.js';

class InputService {
  async getValidatedCarNames() {
    const carNames = await getInput(SYSTEM_MESSAGES.ASK_CARS_NAME);
    return validateCarNames(carNames);
  }

  async getValidatedRounds() {
    const roundsInput = await getInput(SYSTEM_MESSAGES.ASK_ROUNDS);
    return validateRounds(roundsInput);
  }

  createCars(carNames) {
    return validateCars(carNames.map((name) => new Car(name)));
  }
}

export default InputService;
