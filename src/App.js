import Controller from './Controller/Controller.js';
import RaceService from './Service/RaceService.js';
import InputService from './Service/InputService.js';

// App에서 Controller의 run 메서드를 실행
class App {
  async run() {
    const raceService = new RaceService();
    const inputService = new InputService();

    const controller = new Controller(raceService, inputService);
    await controller.run();
  }
}

export default App;
