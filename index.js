const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let bancoDados = { pedidos: [] };

app.get('/', (req, res) => res.send("Servidor Peaky Blinders Online!"));
app.get('/dados', (req, res) => res.json(bancoDados));
app.post('/enviar', (req, res) => {
    bancoDados.pedidos.push(req.body);
    res.json({ status: "sucesso" });
});
app.post('/decidir', (req, res) => {
    const { id, novoStatus } = req.body;
    const p = bancoDados.pedidos.find(x => x.id === id);
    if(p) p.status = novoStatus;
    res.json({ status: "atualizado" });
});

app.listen(process.env.PORT || 3000);
