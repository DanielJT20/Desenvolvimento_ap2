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

   
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));
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


const manipulaUrl1 = () => {
   
    pegaJson(`${url}masculino`).then((r) => {
        
        if (r) {

            r.forEach((ele) => container.appendChild(montacard(ele)));
        }

    });
    
};
document.getElementById('masculino').onclick = manipulaUrl1;


const manipulaUrl2 = () => {
    pegaJson(`${url}feminino`).then((r) => {
        if (r) {
            r.forEach((ele) => container.appendChild(montacard(ele)));
        }

    });

};
document.getElementById('feminino').onclick = manipulaUrl2;


const manipulaUrl3 = () => {
    pegaJson(`${url}all`).then((r) => {
        if (r) {
            r.forEach((ele) => container.appendChild(montacard(ele)));
        }

    });

};
document.getElementById('all').onclick = manipulaUrl3;


const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '5029cc9dd0295ded2f500084635c18c1') {
        localStorage.setItem('logado', 'sim');
        document.getElementById("box").style.display = "none";
        document.getElementById("protegido").style.display = "block";
        container.style.display = "flex";
    } else {
        alert('Você errou a senha!!');
    }
};
document.getElementById('botao').onclick = manipulaBotao;


document.getElementById('logout').onclick = () => {
    document.getElementById("box").style.display = "block";
    document.getElementById("protegido").style.display = "none";
    localStorage.removeItem('logado');
    container.style.display = "none";
    document.getElementById('senha').value = '';
};