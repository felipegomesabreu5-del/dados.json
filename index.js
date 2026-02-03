const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let db = { pedidos: [] };

app.get('/dados', (req, res) => res.json(db));

app.post('/enviar', (req, res) => {
    const novo = { ...req.body, id: Date.now(), status: 'PENDENTE' };
    db.pedidos.push(novo);
    res.json({ sucesso: true });
});

app.post('/decidir', (req, res) => {
    const { id, status } = req.body;
    const p = db.pedidos.find(x => x.id === id);
    if (p) p.status = status;
    res.json({ sucesso: true });
});

app.listen(process.env.PORT || 3000);
