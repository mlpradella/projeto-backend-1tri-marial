// server.js
const express = require("express");
const app = express();
const PORT = 3000;
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

// Middleware para interpretar JSON
app.use(express.json());

// servir arquivos estáticos da pasta public (onde está o admin.html)
app.use(express.static(path.join(__dirname, "public")));

// Mock de dados - receitas
let receitas = [
  {
    id: 1,
    titulo: "Bolo de Cenoura",
    ingredientes_massa: ["Massa: óleo, 1/2 xícara (chá) de óleo, cenoura, 3 cenouras médias raladas, ovo, 4 ovos, açúcar, 2 xícaras (chá) de açúcar, farinha de trigo, 2 e 1/2 xícaras (chá) de farinha de trigo, fermento em pó químico, 1 colher (sopa) de fermento em pó."],
    ingredientes_cobertura: ["Cobertura: manteiga, 1 colher (sopa) de manteiga, chocolate em pó, 3 colheres (sopa) de chocolate em pó, açúcar, 1 xícara (chá) de açúcar, leite, 1 xícara (chá) de leite"],
    preparo_massa: ["Massa: Em um liquidificador, adicione a cenoura, os ovos e o óleo, depois misture. Acrescente o açúcar e bata novamente por 5 minutos. Em uma tigela ou na batedeira, adicione a farinha de trigo e depois misture novamente. Acrescente o fermento e misture lentamente com uma colher. Asse em um forno preaquecido a 180° C por aproximadamente 40 minutos."],
    preparo_cobertura: ["Cobertura: Despeje em uma tigela a manteiga, o chocolate em pó, o açúcar e o leite, depois misture. Leve a mistura ao fogo e continue misturando até obter uma consistência cremosa, depois despeje a calda por cima do bolo."]
  },
  {
    id: 2,
    titulo: "Bolo de Prestígio",
    ingredientes_massa: ["Massa: ovo, 3 ovos, óleo, 1/2 xícara (chá) de óleo, leite, 1 xícara (chá) de leite, açúcar, 1 xícara (chá) de açúcar, chocolate em pó, 1 xícara (chá) de chocolate em pó, farinha de trigo, 2 xícaras (chá) de farinha de trigo, fermento, 1 colher (sopa) de fermento, coco ralado, coco ralado a gosto"],
    ingredientes_calda: ["Calda: leite de coco, 1 garrafa de leite de coco, leite, 1 xícara (chá) de leite, açúcar, 3 colheres (sopa) de açúcar"],
    ingredientes_recheio: ["Massa: leite condensado, 1 lata de leite condensado, margarina, 1 colher (sopa) de margarina, coco ralado, 100 g de coco ralado"],
    ingredientes_cobertura: ["Cobertura: margarina, 3 colheres (sopa) de margarina, açúcar, 8 colheres (sopa) de açúcar, chocolate em pó, colheres (sopa) de chocolate em pó, leite, 2 xícaras (chá) de leite"],
    preparo_massa: ["Massa: Bata no liquidificador, os ovos, o óleo e o leite por 3 minutos e reserve. Em um recipiente, misture o açúcar, o trigo, o fermento, o chocolate e o coco ralado a gosto. Despeje sobre a mistura do liquidificador e mexa até que a massa fique consistente. Despeje a massa em uma forma untada e leve ao forno médio, preaquecido, por 30 minutos ou até que ao enfiar um garfo, este saia limpo. Deixe esfriar, corte ao meio e reserve."],
    preparo_calda: ["Calda: Em um recipiente, misture o leite de coco, o leite e o açúcar e despeje sobre a massa cortada ao meio para umedecê-la."],
    preparo_recheio: ["Recheio: Em uma panela, leve o leite condensado, a margarina e o coco ralado ao fogo até desgrudar do fundo."],
    preparo_cobertura: ["Leve a margarina, o açúcar, o chocolate em pó e o leite ao fogo até obter uma consistência firme. Fure a parte de baixo do bolo com um garfo e despeje com parte da calda."],
    preparo_montagem: ["Aplique o recheio sobre a metade de baixo do bolo. Coloque a outra metade do bolo sobre o recheio. Cubra o bolo com a cobertura de chocolate. Leve à geladeira por 45 minutos."],
  },
  {
    id: 3,
    titulo: "Bolo de Coco",
    ingredientes_massa: ["Massa: 2 xícaras (chá) de açúcar, 2 xícaras (chá) de farinha de trigo, 4 ovos, 1 xícara (chá) leite, 2 colheres (sopa) coco ralado, 1 colher (sopa) fermento em pó, 2 colheres (sopa) margarina sem sal"],
    ingredientes_calda: ["Calda: 1 lata de leite condensado, 1 vidro (200 ml) leite de coco, 1 xícara de coco ralado"],
    preparo_massa: ["Massa: Bata no liquidificador os ovos, o leite, a margarina, o açúcar e o coco. Coloque o trigo em uma vasilha, despeje a massa batida e misture até que fique homogêneo. Adicione o coco e misture. Por último, acrescente o fermento. Coloque em forma untada e enfarinhada. Asse em forno médio, preaquecido, por cerca de 40 minutos, ou até dourar."],
    preparo_calda: ["Calda: Misture tudo (não precisa levar ao fogo), coloque sobre o bolo ainda quente e polvilhe coco ralado. Leve para gelar."],
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

// Rotas para fluxo de aprovação (admin.html)
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

const path = require("path");

// servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
