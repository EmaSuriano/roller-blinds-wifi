import rollerBlind from './rollerBlind';
import express from 'express';

const server = express();

// const router = express.Router();

// router
//   .route('/position')
//   .get(async (req, res) => {
//     try {
//       const position = await rollerBlind.getPosition();
//       return res.json({ position });
//     } catch (error) {
//       res.statusMessage = error;
//       return res.sendStatus(400).end();
//     }
//   })
//   .put(async (req, res) => {
//     try {
//       const pos = await rollerBlind.setPosition(req.position);
//       return res.sendStatus(200);
//     } catch (error) {
//       res.statusMessage = error;
//       return res.sendStatus(400).end();
//     }
//   });

// router.get('/', (req, res) => res.sendFile(__dirname + '/src/index.html'));

// router.get('/status', (req, res) => {
//   const status = rollerBlind.getStatus();
//   console.log('one time');
//   return res.send({ status: 123 });
// });

// const a = 3;

// server.use(router);

// server.get('/status', (req, res) => {
//   const status = rollerBlind.getStatus();
//   res.send({ status: 2 });
// });

server.get('/api', (req, res) => {
  res.send({
    message: 'I am a server route and can alasdasdso asd be hot reloaded!',
  });
});

// export default router;
export default server;
