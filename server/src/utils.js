const STEPPER_MOTOR_STEPS_ONE_LAP = 4096;
const TOTAL_STEPS_FULL_BLINDS = STEPPER_MOTOR_STEPS_ONE_LAP * 8;

const MIN_POSITION = 0;
const MAX_POSITION = 100;

const positionToSteps = position => position * TOTAL_STEPS_FULL_BLINDS / MAX_POSITION;

const calculateSteps = (newPosition, currentPosition) =>
  positionToSteps(newPosition) - positionToSteps(currentPosition);

const functionCallLoggerHOF = func => params => {
  console.log(
    `FUNCTION_LOGGER: function called: ${func.name}${params ? `, with params: ${params}` : '.'}`,
  );
  return func(params);
};

const noop = () => {};

module.exports = {
  calculateSteps,
  functionCallLoggerHOF,
  noop,
};
