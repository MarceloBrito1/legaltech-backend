const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const uploadRouter = require('./upload_processos');
const gerarPeticaoRouter = require('./gerar_peticao_ia');

app.use('/api', uploadRouter);
app.use('/api', gerarPeticaoRouter);

app.get('/', (req, res) => {
  res.send('Legaltech backend rodando!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
