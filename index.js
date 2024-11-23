import express from 'express';

const app = express();

// Roting
app.get('/', (req, res) => {
  res.send('hola mundo en express');
});

app.listen(4000, () => {
  console.log('Servidor Funcionando');
});
