const express = require('express');
const router = express.Router();

router.post('/gerar-peticao', (req, res) => {
  const dados = req.body;
  if (!dados || !dados.numero_processo || !dados.fase) {
    return res.status(400).json({ erro: "Dados insuficientes" });
  }

  const texto = `Excelentíssimo Juiz,\nProcesso: ${dados.numero_processo}\nFase: ${dados.fase}\n\n(Requerimento automático gerado)`;
  res.status(200).json({ texto_peticao: texto });
});

module.exports = router;
