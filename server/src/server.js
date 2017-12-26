import express from 'express';

const app = express();

app.get('/api', (req, res) => {
  res.send({
    message: 'I am a fucking genioussssssssss!',
  });
});

export default app;
