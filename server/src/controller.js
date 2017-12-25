import rollerBlind from './rollerBlind';
import { Router } from 'express';

const router = Router();

router
  .route('/position')
  .get(async (req, res) => {
    try {
      const position = await rollerBlind.getPosition();
      return res.json({ position });
    } catch (error) {
      res.statusMessage = error;
      return res.sendStatus(400).end();
    }
  })
  .put(async (req, res) => {
    try {
      const pos = await rollerBlind.setPosition(req.position);
      return res.sendStatus(200);
    } catch (error) {
      res.statusMessage = error;
      return res.sendStatus(400).end();
    }
  });

router.get('/', (req, res) => res.sendFile(__dirname + '/src/index.html'));

router.get('/status', (req, res) => {
  const status = rollerBlind.getStatus();
  return res.json({ status });
});

export default router;
