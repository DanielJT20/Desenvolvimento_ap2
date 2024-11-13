const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pegaJson = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        return await resposta.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch data. Please try again later.');
    }
};

const montaPagina = (dados) => {
    const body = document.body;
    const container = document.createElement("div");
    container.className = "container";

    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome;
    container.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.src = dados.imagem;
    imagem.alt = dados.nome;
    container.appendChild(imagem);

    const n_jogos = document.createElement("p");
    n_jogos.innerHTML = `Jogos jogados: ${dados.n_jogos}`;
    container.appendChild(n_jogos);

    const altura = document.createElement("p");
    altura.innerHTML = `Medindo: ${dados.altura}`;
    container.appendChild(altura);

    const nascimento = document.createElement("p");
    nascimento.innerHTML = `Nascido em: ${dados.nascimento}`;
    container.appendChild(nascimento);

    const naturalidade = document.createElement("p");
    naturalidade.innerHTML = `Natural de ${dados.naturalidade}`;
    container.appendChild(naturalidade);

    const posi = document.createElement("p");
    posi.innerHTML = `Posição: ${dados.posicao}`;
    container.appendChild(posi);
    
    const descri = document.createElement("p");
    descri.innerHTML = dados.detalhes;
    container.appendChild(descri);

    const botaoVoltar = document.createElement("button");
    botaoVoltar.innerHTML = "Voltar";
    botaoVoltar.onclick = () => {
        window.location.href = "index.html";
  
    };
    container.appendChild(botaoVoltar);

    body.appendChild(container);
};

if (localStorage.getItem('logado')) {
    pegaJson(`https://botafogo-atletas.mange.li/2024-1/${id}`).then((r) => montaPagina(r));
} else {
    document.body.innerHTML = "<h2>Você não tem a senha</h2>";
}

const dadosLocalStorage = localStorage.getItem('dados');
const obj = JSON.parse(dadosLocalStorage);