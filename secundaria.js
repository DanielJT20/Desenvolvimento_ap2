const params = new URLSearchParams(window.location.search);
const id = params.get("id")


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


const montaPagina = (dados) =>{
    const body = document.body;

    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome;
    body.appendChild(nome);

    const imagem = document.createElement("img");
    imagem.src = dados.imagem;
    body.appendChild(imagem);

    const descri = document.createElement("p");
    descri.innerHTML = dados.detalhes;
    body.appendChild(descri);
    const posi = document.createElement("p");
    posi.innerHTML = dados.posicao;
    body.appendChild(posi);
}
 if(sessionStorage.getItem('logado')){

    pegaJson(`https://botafogo-atletas.mange.li/2024-1/${id}`).then( (r) => montaPagina(r));
 }else{
    document.body.innerHTML = "<h2>você não tem a senha</h2>"
}


const dadosSessionStorage = sessionStorage.getItem('dados');
const obj = JSON.parse(dadosSessionStorage)

