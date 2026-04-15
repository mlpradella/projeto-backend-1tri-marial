// server.js
const express = require("express");
const app = express();
const PORT = 3000;
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Middleware para interpretar JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public (onde está o admin.html)
app.use(express.static(path.join(__dirname, "public")));

// Mock de dados - receitas iniciais
let receitas = [
  {
    id: 1,
    titulo: "Bolo de Cenoura",
    ingredientes_massa: ["óleo, cenoura, ovos, açúcar, farinha de trigo, fermento"],
    preparo_massa: ["Bata os ingredientes no liquidificador e leve ao forno por 40 minutos."],
    ingredientes_cobertura: ["manteiga, chocolate em pó, açúcar, leite"],
    preparo_cobertura: ["Misture tudo no fogo até ficar cremoso e cubra o bolo."]
  },
  {
    id: 2,
    titulo: "Bolo de Prestígio",
    ingredientes_massa: ["ovos, óleo, leite, açúcar, chocolate em pó, farinha de trigo, fermento, coco ralado"],
    preparo_massa: ["Misture os ingredientes e asse por 30 minutos."],
    ingredientes_recheio: ["leite condensado, margarina, coco ralado"],
    preparo_recheio: ["Leve ao fogo até desgrudar do fundo da panela."]
  }
];

// Rotas principais
app.get("/", (req, res) => {
  res.send("API de Receitas está rodando");
});

app.get("/receitas", (req, res) => {
  res.json(receitas);
});

app.get("/receitas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const receita = receitas.find(r => r.id === id);
  if (receita) {
    res.json(receita);
  } else {
    res.status(404).json({ mensagem: "Receita não encontrada" });
  }
});

app.post("/receitas", (req, res) => {
  const novaReceita = {
    id: receitas.length + 1,
    titulo: req.body.titulo,
    ingredientes: req.body.ingredientes,
    preparo: req.body.preparo
  };
  receitas.push(novaReceita);
  res.status(201).json(novaReceita);
});

app.put("/receitas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const receitaIndex = receitas.findIndex(r => r.id === id);

  if (receitaIndex !== -1) {
    receitas[receitaIndex] = {
      ...receitas[receitaIndex],
      ...req.body,
      id: id
    };
    res.json(receitas[receitaIndex]);
  } else {
    res.status(404).json({ mensagem: "Receita não encontrada" });
  }
});

app.delete("/receitas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const receitaIndex = receitas.findIndex(r => r.id === id);

  if (receitaIndex !== -1) {
    const receitaRemovida = receitas.splice(receitaIndex, 1);
    res.json({ mensagem: "Receita removida com sucesso", receita: receitaRemovida });
  } else {
    res.status(404).json({ mensagem: "Receita não encontrada" });
  }
});

// Fluxo de aprovação (receitas pendentes)
app.post("/enviar-receita", (req, res) => {
  const { titulo, ingredientes, preparo } = req.body;
  const novaReceita = {
    id: Date.now(),
    titulo,
    ingredientes,
    preparo,
    status: "pendente"
  };

  let receitasPendentes = [];
  if (fs.existsSync("receitasPendentes.json")) {
    const data = fs.readFileSync("receitasPendentes.json");
    receitasPendentes = JSON.parse(data);
  }

  receitasPendentes.push(novaReceita);
  fs.writeFileSync("receitasPendentes.json", JSON.stringify(receitasPendentes, null, 2));

  res.status(200).json({ mensagem: "Receita enviada para revisão!" });
});

app.get("/receitas-pendentes", (req, res) => {
  if (fs.existsSync("receitasPendentes.json")) {
    const data = fs.readFileSync("receitasPendentes.json");
    res.json(JSON.parse(data));
  } else {
    res.json([]);
  }
});

app.put("/receitas-pendentes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (fs.existsSync("receitasPendentes.json")) {
    const data = fs.readFileSync("receitasPendentes.json");
    let receitas = JSON.parse(data);

    const idx = receitas.findIndex(r => r.id === id);
    if (idx !== -1) {
      receitas[idx].status = req.body.status; // "aprovada" ou "recusada"
      fs.writeFileSync("receitasPendentes.json", JSON.stringify(receitas, null, 2));
      res.json(receitas[idx]);
    } else {
      res.status(404).json({ mensagem: "Receita não encontrada" });
    }
  } else {
    res.status(404).json({ mensagem: "Nenhuma receita pendente" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
