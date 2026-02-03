// Rota para receber pedido de pontos com print
app.post('/pedir-pontos', (req, res) => {
    const { gmail, nomeUsuario, nomeItem, valor, print } = req.body;
    let pedidos = [];
    if (fs.existsSync('pedidos.json')) pedidos = JSON.parse(fs.readFileSync('pedidos.json'));
    
    pedidos.push({ idPedido: Date.now(), gmail, nomeUsuario, nomeItem, valor, print });
    fs.writeFileSync('pedidos.json', JSON.stringify(pedidos, null, 2));
    res.json({ success: true });
});

// Rota para o Admin listar os pedidos de print
app.get('/listar-pedidos', (req, res) => {
    if (fs.existsSync('pedidos.json')) {
        res.json(JSON.parse(fs.readFileSync('pedidos.json')));
    } else {
        res.json([]);
    }
});

// Rota para o Admin salvar pontos/horas manualmente
app.post('/atualizar-membro-admin', (req, res) => {
    const { gmail, add, rem, horas } = req.body;
    let usuarios = JSON.parse(fs.readFileSync('usuarios.json'));
    const idx = usuarios.findIndex(u => u.gmail === gmail);
    
    if (idx !== -1) {
        usuarios[idx].pontos = (usuarios[idx].pontos || 0) + (add || 0) - (rem || 0);
        usuarios[idx].horas = horas;
        fs.writeFileSync('usuarios.json', JSON.stringify(usuarios, null, 2));
        res.json({ success: true });
    } else {
        res.status(404).json({ error: "Usuário não encontrado" });
    }
});
