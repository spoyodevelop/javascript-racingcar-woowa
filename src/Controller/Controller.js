class Controller {
  constructor(raceService, inputService) {
    this.raceService = raceService;
    this.inputService = inputService;
  }

  async run() {
    const carNames = await this.inputService.getValidatedCarNames();
    const rounds = await this.inputService.getValidatedRounds();
    const cars = this.inputService.createCars(carNames);

    this.startRace(cars, rounds);
  }

  startRace(cars, rounds) {
    this.raceService.runRounds(cars, rounds);
    this.raceService.declareWinners(cars);
  }
}

export default Controller;
