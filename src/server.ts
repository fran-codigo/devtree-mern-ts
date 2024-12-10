import express from 'express';

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('hola mundo en express TS');
});


export default app