const j5 = require('johnny-five');

const DIRECTION = {
  UP: 1,
  DOWN: 0,
};

const validateStepPhase = (stepPhase, direction) => {
  let result = direction === DIRECTION.UP ? stepPhase + 1 : stepPhase - 1;
  if (result > 7) return 0;
  if (result < 0) return 7;
  return result;
};

const Stepper = (m1, m2, m3, m4) => {
  const motor1 = new j5.Pin(m1);
  const motor2 = new j5.Pin(m2);
  const motor3 = new j5.Pin(m3);
  const motor4 = new j5.Pin(m4);

  let stepPhase = 0;

  const moveOneStep = () => {
    switch (stepPhase) {
      case 0:
        motor1.low();
        motor2.low();
        motor3.low();
        motor4.high();
        break;
      case 1:
        motor1.low();
        motor2.low();
        motor3.high();
        motor4.high();
        break;
      case 2:
        motor1.low();
        motor2.low();
        motor3.high();
        motor4.low();
        break;
      case 3:
        motor1.low();
        motor2.high();
        motor3.high();
        motor4.low();
        break;
      case 4:
        motor1.low();
        motor2.high();
        motor3.low();
        motor4.low();
        break;
      case 5:
        motor1.high();
        motor2.high();
        motor3.low();
        motor4.low();
        break;
      case 6:
        motor1.high();
        motor2.low();
        motor3.low();
        motor4.low();
        break;
      case 7:
        motor1.high();
        motor2.low();
        motor3.low();
        motor4.high();
        break;
      default:
        motor1.low();
        motor2.low();
        motor3.low();
        motor4.low();
        break;
    }
  };

  const moveMotor = (steps, direction) => {
    setInterval(() => {
      console.log('Moving one Step');
      moveOneStep();
      stepPhase = validateStepPhase(stepPhase, direction);
      steps--;
    }, 30);
  };

  return {
    stepPhase,
    moveMotor,
  };
};

module.exports = Stepper;
