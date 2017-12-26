import storage from './storage';
import Board from './board';
import { calculateSteps } from './utils';

const board = new Board();

const getPosition = async () => await storage.getPosition();

const setPosition = async newPosition => {
  const position = await storage.getPosition();
  const steps = calculateSteps(newPosition, position);
  await board.moveMotor(steps);
  await storage.setPosition(newPosition);
  return newPosition;
};

const getStatus = () => board.status + 'asdasd';

export default {
  getPosition,
  setPosition,
  getStatus,
};
