import { ERROR_MESSAGES, throwError } from '../Model/Error.js';
import { checkDuplicate } from '../Util/util.js';
import { consecutiveDelimiterPattern } from '../Util/regex.js';
import Car from '../Model/Car.js';

function validateCarNames(carNames) {
  if (consecutiveDelimiterPattern.test(carNames)) {
    throwError(ERROR_MESSAGES.names.CONSECUTIVE_DELIMITERS);
  }

  const carNamesSplit = carNames.split(',').map((name) => name.trim());

  if (carNamesSplit.some((name) => name === '')) {
    throwError(ERROR_MESSAGES.names.EMPTY_NAME);
  }

  if (carNamesSplit.some((name) => name.length > 5)) {
    throwError(ERROR_MESSAGES.names.NAME_TOO_LONG);
  }

  if (checkDuplicate(carNamesSplit)) {
    throwError(ERROR_MESSAGES.names.DUPLICATED_NAMES);
  }

  return carNamesSplit;
}

function validateRounds(input) {
  const rounds = Number(input);
  if (Number.isNaN(rounds)) {
    throwError(ERROR_MESSAGES.rounds.ONLY_NUMBER_ALLOWED);
  }

  if (!Number.isInteger(rounds)) {
    throwError(ERROR_MESSAGES.rounds.ONLY_INTEGER_ALLOWED);
  }

  if (rounds <= 0) {
    throwError(ERROR_MESSAGES.rounds.ONLY_POSITIVE_ALLOWED);
  }

  const parsedRounds = parseInt(rounds, 10);
  return parsedRounds;
}

function isCarLegit(car) {
  if (car === null || car === undefined || !(car instanceof Car)) {
    throwError(ERROR_MESSAGES.cars.ILLEGAL_CAR);
  }
}

//실제로 발생할 확률은 매우 낮지만, type sanity check
function validateCars(cars) {
  cars.forEach((car) => {
    isCarLegit(car);
  });

  return cars;
}

export { validateCarNames, validateRounds, validateCars };
