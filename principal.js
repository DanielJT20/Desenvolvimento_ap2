const url = "https://botafogo-atletas.mange.li/2024-1/";

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

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhada.html?id=${id}`;
    carregandoTela();
    document.cookie = `id=${id}`;
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));

    window.location = url;
};

const montacard = (atleta) => {
    const cartao = document.createElement("article");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    imagem.src = atleta.imagem;
    descri.innerHTML = atleta.detalhes;

    cartao.appendChild(nome);
    cartao.appendChild(imagem);
    cartao.appendChild(descri);

    cartao.onclick = manipulaClick;
    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

const container = document.getElementById('container');

const carregandoTela = () => {
    const loadingDiv = document.getElementById('loading');
    loadingDiv.style.display = 'block';
    setTimeout(function() {
        loadingDiv.style.display = 'none';
    }, 450);
}; 

const limpaBody = () => {
    container.innerHTML = '';
};

const limpaInput = () =>{
    document.getElementById('pesquisa').value = '';
}

// Função para pesquisar atletas
const pesquisaAtletas = () => {
    const searchTerm = document.getElementById('pesquisa').value.toLowerCase();
    carregandoTela();
    limpaBody();
    pegaJson(`${url}all`).then((r) => {
        if (r) {
            const resultados = r.filter(atleta => atleta.nome.toLowerCase().includes(searchTerm));
            if (resultados.length > 0) {
                resultados.forEach((ele) => container.appendChild(montacard(ele)));
            } else {
                container.innerHTML = '<p>Nenhum atleta encontrado.</p>';
            }
        } else {
            alert('Você precisa estar logado');
        }
    });
};


document.getElementById('botao1').onclick = pesquisaAtletas;


const manipulaUrl1 = () => {
    carregandoTela();
    limpaBody();
    limpaInput();
    pegaJson(`${url}masculino`).then((r) => {
        if (r) {
            r.forEach((ele) => container.appendChild(montacard(ele)));
        } else {
            alert('Você precisa estar logado');
        }
    });
};
document.getElementById('masculino').onclick = manipulaUrl1;

const manipulaUrl2 = () => {
    carregandoTela();
    limpaBody();
    limpaInput();
    pegaJson(`${url}feminino`).then((r) => {
        if (r) {
            r.forEach((ele) => container.appendChild(montacard(ele)));
        } else {
            alert('Você precisa estar logado');
        }
    });
};
document.getElementById('feminino').onclick = manipulaUrl2;

const manipulaUrl3 = () => {
    carregandoTela();
    limpaBody();
    limpaInput();
    pegaJson(`${url}all`).then((r) => {
        if (r) {
            r.forEach((ele) => container.appendChild(montacard(ele)));
        } else {
            alert('Você precisa estar logado');
        }
    });
};
document.getElementById('all').onclick = manipulaUrl3;

const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === 'a54f6754415236f9bae4e0add5446d74') {
        localStorage.setItem('logado', 'sim');
        document.getElementById("box").style.display = "none";
        document.getElementById("protegido").style.display = "block";
        limpaBody();
    } else {
        alert('Você errou a senha!!');
    }
};
document.getElementById('botao').onclick = manipulaBotao;

document.getElementById('logout').onclick = () => {
    document.getElementById("box").style.display = "block";
    document.getElementById("protegido").style.display = "none";
    localStorage.removeItem('logado');
    limpaBody();
    document.getElementById('senha').value = '';
};