const dadosIniciais = [
  {
    nome: "Andressa Alves",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://cdn.meutimao.com.br/_upload/noticia/2025/07/13/andressa-alves-da-passe-decisivo-e-sobe-em-dl.jpg",
    gols: 15,
    assistencias: 10,
    jogos: 28,
    favorita: false,
  },
  {
    nome: "Dayana Rodríguez",
    posicao: "Meio-campo",
    clube: "Corinthians",
    foto: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1KAObr.img?w=614&h=462&m=6&x=237&y=107&s=63&d=63",
    gols: 5,
    assistencias: 12,
    jogos: 30,
    favorita: false,
  },
  {
    nome: "Mariza",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://cdn.meutimao.com.br/_upload/noticia/2023/11/04/mariza-foi-eleita-a-craque-da-partida-pela-1z.jpg",
    gols: 2,
    assistencias: 1,
    jogos: 32,
    favorita: false,
  },
  {
    nome: "Thaís Regina",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://cdn.meutimao.com.br/fotos-do-corinthians/w941/2025/03/27/thais_regina_com_a_bola_diante_do_juventude_s5tm.jpg",
    gols: 1,
    assistencias: 2,
    jogos: 25,
    favorita: false,
  },
  {
    nome: "Letícia Teles",
    posicao: "Zagueira",
    clube: "Corinthians",
    foto: "https://www.meutimao.com.br/fotos-do-corinthians/w364/2025/08/20/leticia_teles_em_treinamento_do_corinthians_odem.jpg",
    gols: 0,
    assistencias: 0,
    jogos: 18,
    favorita: false,
  },
];

const jogadoraForm = document.getElementById("jogadora-form");
const cancelEdit = document.getElementById("cancelar-edicao");
let editando = -1;

// Inicializa localStorage
window.onload = () => {
  if (!localStorage.getItem("jogadoras")) {
    localStorage.setItem("jogadoras", JSON.stringify(dadosIniciais));
  }
  listarJogadoras();
};

// Listar jogadoras
function listarJogadoras() {
  const lista = document.getElementById("lista-jogadoras");
  lista.innerHTML = "";

  const jogadoras = JSON.parse(localStorage.getItem("jogadoras"));

  jogadoras.forEach((jogadora, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${jogadora.foto}" alt="${jogadora.nome}">
      <h3>${jogadora.nome}</h3>
      <p>Posição: ${jogadora.posicao}</p>
      <p>Clube: ${jogadora.clube}</p>
      <p>Gols: ${jogadora.gols} | Assistências: ${jogadora.assistencias} | Jogos: ${jogadora.jogos}</p>
    `;

    // Botão de editar jogadora
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "✏️ Editar";
    btnEditar.addEventListener("click", () => editarJogadora(index));

     // Botão de excluir jogadora
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "🗑️ Excluir";
    btnRemover.addEventListener("click", () => removerJogadora(index));

    //Botão de favoritar jogadora
    const btnFavoritar = document.createElement("button");
    btnFavoritar.className = "btn-favoritar";

    const imgFavoritar = document.createElement("img");
    imgFavoritar.src = jogadora.favorita
      ? "./assets/icons/starSelect.svg"
      : "./assets/icons/star.svg";
    imgFavoritar.alt = "Favoritar";

    btnFavoritar.innerHTML = "";
    btnFavoritar.appendChild(imgFavoritar);

    btnFavoritar.addEventListener("click", () => {
      favoritarJogadora(index);
    });

    lista.appendChild(card);
    
    card.appendChild(btnEditar);
    card.appendChild(btnRemover);
    card.appendChild(btnFavoritar);
  });
}

// Adicionar / Editar jogadora
jogadoraForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome = document.getElementById("nome").value;
  const posicao = document.getElementById("posicao").value;
  const clube = document.getElementById("clube").value;
  const foto = document.getElementById("foto").value;
  const gols = document.getElementById("gols").value;
  const assistencias = document.getElementById("assistencias").value;
  const jogos = document.getElementById("jogos").value;

  const jogadoras = JSON.parse(localStorage.getItem("jogadoras"));

  if (editando === -1) {
    jogadoras.push({
      nome,
      posicao,
      clube,
      foto,
      gols,
      assistencias,
      jogos,
      favorita: false,
    });
    alert("Jogadora adicionada com sucesso!");
  } else {
    jogadoras[editando] = {
      nome,
      posicao,
      clube,
      foto,
      gols,
      assistencias,
      jogos,
      favorita: jogadoras[editando].favorita,
    };
    alert("Jogadora editada com sucesso!");
    editando = -1;
    cancelEdit.style.display = "none";
  }

  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  jogadoraForm.reset();
  listarJogadoras();
});

// Editar jogadora
function editarJogadora(index) {
  const jogadoras = JSON.parse(localStorage.getItem("jogadoras"));
  const j = jogadoras[index];

  document.getElementById("nome").value = j.nome;
  document.getElementById("posicao").value = j.posicao;
  document.getElementById("clube").value = j.clube;
  document.getElementById("foto").value = j.foto;
  document.getElementById("gols").value = j.gols;
  document.getElementById("assistencias").value = j.assistencias;
  document.getElementById("jogos").value = j.jogos;

  editando = index;
  cancelEdit.style.display = "inline-block";
}

// Cancelar edição
cancelEdit.addEventListener("click", () => {
  editando = -1;
  jogadoraForm.reset();
  cancelEdit.style.display = "none";
});

// Remover jogadora
function removerJogadora(index) {
  const jogadoras = JSON.parse(localStorage.getItem("jogadoras"));
  jogadoras.splice(index, 1);
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  alert("Jogadora removida com sucesso!");
  listarJogadoras();
}

// Favoritar jogadora
function favoritarJogadora(index) {
  const jogadoras = JSON.parse(localStorage.getItem("jogadoras"));
  jogadoras[index].favorita = !jogadoras[index].favorita;
  localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
  listarJogadoras();
}
