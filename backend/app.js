// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

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
    titulo: "Macarrão à Bolonhesa",
    ingredientes: ["Macarrão", "Carne moída", "Molho de tomate", "Cebola", "Alho"],
    preparo: "Cozinhe o macarrão, prepare o molho com carne e tomate, e misture tudo."
  }
];

// Rotas
app.get("/", (req, res) => {
  res.send("API de Receitas está rodando 🍲");
});

// Listar todas as receitas
app.get("/receitas", (req, res) => {
  res.json(receitas);
});

// Buscar receita por ID
app.get("/receitas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const receita = receitas.find(r => r.id === id);
  if (receita) {
    res.json(receita);
  } else {
    res.status(404).json({ mensagem: "Receita não encontrada" });
  }
});

// Adicionar nova receita
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
