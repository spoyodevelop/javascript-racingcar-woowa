class Controller {
  constructor(raceService, inputService) {
    this.raceService = raceService;
    this.inputService = inputService;
  }

  async run() {
    const carNames = await this.inputService.getValidatedCarNames();
    const rounds = await this.inputService.getValidatedRounds();
    const cars = this.inputService.createCars(carNames);
    // 이 startRace에 promise race같은 것을 사용해 10초가 지나면 타임아웃 에러를 만들고 싶어.
    this.startRace(cars, rounds);
  }

  startRace(cars, rounds) {
    this.raceService.runRounds(cars, rounds);
    this.raceService.declareWinners(cars);
  }
}

export default Controller;
