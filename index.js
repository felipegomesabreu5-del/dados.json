const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// O banco de dados agora começa com o seu admin padrão
let usuarios = [
    {
        nome: "admin",
        gmail: "admin@gmail.com",
        senha: "1234",
        status: "aprovado",
        cargo: "ADMINISTRADOR"
    }
];

// Rota para o Login e Dashboard buscarem a lista
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Rota para o Registro (Finalizar Registro)
app.post('/usuarios', (req, res) => {
    const novoUsuario = req.body;
    
    // Verifica se já existe
    if (usuarios.find(u => u.nome === novoUsuario.nome)) {
        return res.status(400).json({ erro: "Usuário já existe" });
    }
    
    usuarios.push(novoUsuario);
    res.status(201).json({ sucesso: true });
});

// Rota para aprovar/reprovar (se precisar no futuro)
app.post('/decidir', (req, res) => {
    const { nome, status } = req.body;
    const u = usuarios.find(x => x.nome === nome);
    if (u) u.status = status;
    res.json({ sucesso: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
