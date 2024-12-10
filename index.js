import express from 'express';

const app = express();

// Roting
app.get('/', (req, res) => {
  res.send('hola mundo en express');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Servidor Funcionando en el puerto:', PORT);
});
