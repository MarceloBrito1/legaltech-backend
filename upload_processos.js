const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const db = require('./db');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/importar-processos', upload.single('arquivo'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dados = xlsx.utils.sheet_to_json(sheet);

    let total = 0;
    for (const p of dados) {
      const {
        numero_processo, foro, cliente, status,
        ultima_atualizacao, responsavel, fase, tags
      } = p;
      try {
        await db.query(
          `INSERT INTO banca_processos 
           (numero_processo, foro, cliente, status, ultima_atualizacao, responsavel, fase, tags)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
           ON CONFLICT (numero_processo) DO NOTHING`,
          [numero_processo, foro, cliente, status, ultima_atualizacao, responsavel, fase, tags]
        );
        total++;
      } catch (err) {
        console.error("Erro ao inserir:", p.numero_processo);
      }
    }

    fs.unlinkSync(filePath);
    res.status(200).json({ mensagem: "Importados", total });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ erro: "Falha ao importar" });
  }
});

module.exports = router;
