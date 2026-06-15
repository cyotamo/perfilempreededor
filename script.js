const perguntas = [
  "Identifico oportunidades de negócio mesmo em situações de dificuldade.",
  "Tenho iniciativa para transformar ideias em acções concretas.",
  "Assumo riscos calculados quando acredito que uma oportunidade pode gerar bons resultados.",
  "Consigo planear actividades, definir metas e organizar recursos para alcançar objectivos.",
  "Sou persistente quando enfrento obstáculos ou fracassos.",
  "Procuro formas criativas e inovadoras de resolver problemas.",
  "Tenho facilidade em comunicar, convencer e apresentar ideias a outras pessoas.",
  "Consigo gerir dinheiro com disciplina e tomar decisões financeiras responsáveis.",
  "Trabalho bem em equipa e consigo mobilizar pessoas em torno de uma ideia.",
  "Aprendo com os erros e adapto-me rapidamente a novas situações."
];

const opcoes = [
  { texto: "Nunca", valor: 0 },
  { texto: "Raramente", valor: 1 },
  { texto: "Às vezes", valor: 2 },
  { texto: "Muitas vezes", valor: 3 },
  { texto: "Sempre", valor: 4 }
];

const form = document.getElementById("perfilForm");
const questionsContainer = document.getElementById("questionsContainer");
const resultado = document.getElementById("resultado");
const percentagemResultado = document.getElementById("percentagemResultado");
const classificacaoResultado = document.getElementById("classificacaoResultado");
const descricaoResultado = document.getElementById("descricaoResultado");
const recomendacaoResultado = document.getElementById("recomendacaoResultado");
const scoreCircle = document.getElementById("scoreCircle");
const limparBtn = document.getElementById("limparBtn");
const novoTesteBtn = document.getElementById("novoTesteBtn");
const imprimirBtn = document.getElementById("imprimirBtn");

function criarPerguntas() {
  questionsContainer.innerHTML = perguntas.map((pergunta, index) => {
    const numero = index + 1;
    const optionsHtml = opcoes.map(opcao => `
      <label class="option-label">
        <input type="radio" name="q${numero}" value="${opcao.valor}" required>
        <span class="option-text">${opcao.texto}</span>
      </label>
    `).join("");

    return `
      <article class="question-card">
        <div class="question-title">
          <span class="question-number">${numero}</span>
          <span>${pergunta}</span>
        </div>
        <div class="options-grid">
          ${optionsHtml}
        </div>
      </article>
    `;
  }).join("");
}

function mostrarAviso(mensagem) {
  const avisoAnterior = document.querySelector(".toast");
  if (avisoAnterior) avisoAnterior.remove();

  const aviso = document.createElement("div");
  aviso.className = "toast";
  aviso.textContent = mensagem;
  document.body.appendChild(aviso);

  setTimeout(() => aviso.remove(), 3200);
}

function obterResultado(percentagem) {
  if (percentagem < 40) {
    return {
      classe: "Perfil empreendedor baixo",
      descricao: "O resultado indica que ainda existem competências empreendedoras importantes a desenvolver, sobretudo iniciativa, persistência, planeamento e capacidade de assumir riscos calculados.",
      recomendacao: "Participe em formações de empreendedorismo, observe negócios locais, pratique a criação de pequenas ideias de negócio e procure mentoria."
    };
  }

  if (percentagem < 60) {
    return {
      classe: "Perfil empreendedor moderado",
      descricao: "O resultado mostra que possui algumas características empreendedoras, mas ainda precisa de fortalecer a autoconfiança, a inovação e a capacidade de transformar ideias em acções práticas.",
      recomendacao: "Desenvolva um pequeno plano de negócio, participe em desafios de inovação e treine a apresentação das suas ideias."
    };
  }

  if (percentagem < 80) {
    return {
      classe: "Bom perfil empreendedor",
      descricao: "O resultado indica uma boa orientação empreendedora, com sinais positivos de iniciativa, planeamento, persistência e identificação de oportunidades.",
      recomendacao: "Aprofunde competências de gestão financeira, marketing, liderança e validação de ideias no mercado."
    };
  }

  return {
    classe: "Perfil empreendedor elevado",
    descricao: "O resultado revela forte potencial empreendedor, com boa capacidade de iniciativa, inovação, liderança, persistência e orientação para oportunidades.",
    recomendacao: "Transforme esse potencial em acção: valide uma ideia, teste um produto ou serviço e procure parcerias estratégicas."
  };
}

function calcularResultado(event) {
  event.preventDefault();

  const respostas = perguntas.map((_, index) => {
    return document.querySelector(`input[name="q${index + 1}"]:checked`);
  });

  const incompletas = respostas.some(resposta => !resposta);
  if (incompletas) {
    mostrarAviso("Responda a todas as questões antes de ver o resultado.");
    return;
  }

  const pontuacao = respostas.reduce((total, resposta) => total + Number(resposta.value), 0);
  const pontuacaoMaxima = perguntas.length * 4;
  const percentagem = Math.round((pontuacao / pontuacaoMaxima) * 100);
  const resultadoFinal = obterResultado(percentagem);

  percentagemResultado.textContent = `${percentagem}%`;
  classificacaoResultado.textContent = resultadoFinal.classe;
  descricaoResultado.textContent = resultadoFinal.descricao;
  recomendacaoResultado.textContent = resultadoFinal.recomendacao;

  const graus = Math.round((percentagem / 100) * 360);
  scoreCircle.style.background = `conic-gradient(var(--primary) ${graus}deg, #e8efec ${graus}deg)`;

  resultado.classList.remove("hidden");
  resultado.scrollIntoView({ behavior: "smooth", block: "start" });
}

function limparFormulario() {
  form.reset();
  resultado.classList.add("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

criarPerguntas();
form.addEventListener("submit", calcularResultado);
limparBtn.addEventListener("click", limparFormulario);
novoTesteBtn.addEventListener("click", limparFormulario);
imprimirBtn.addEventListener("click", () => window.print());
