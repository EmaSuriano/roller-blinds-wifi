import { DEBUG } from './constants';

const STEPPER_MOTOR_STEPS_ONE_LAP = 4096;
const TOTAL_STEPS_FULL_BLINDS = STEPPER_MOTOR_STEPS_ONE_LAP * 8;

const MIN_POSITION = 0;
const MAX_POSITION = 100;

const positionToSteps = position =>
  position * TOTAL_STEPS_FULL_BLINDS / MAX_POSITION;

const calculateSteps = (newPosition, currentPosition) =>
  positionToSteps(newPosition) - positionToSteps(currentPosition);

const functionCallLoggerHOF = func => params => {
  const functionCall = `function called: ${func.name}`;
  const paramsDescription = params ? `, with params: ${params}` : '';
  console.log(`FUNCTION_LOGGER: ${functionCall}${paramsDescription}`);

  return func(params);
};

const noop = () => {};

const withDebugHOF = func => (DEBUG ? functionCallLoggerHOF(func) : func);

export default {
  calculateSteps,
  withDebugHOF,
  noop,
};
