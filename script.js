//variáveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.divisao--2');
let lateral = document.querySelector('.divisao--1--direita');
let numeros = document.querySelector('.d-1-3');

//variavéis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = true;

function comecarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        } else {
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface () {
    let etapa = etapas[etapaAtual];
    //busca candidato
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
    });
    //mostra informações do candidato
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome ${candidato.nome}<br/>Partido ${candidato.partido}`;
        //mostra foto do candidato
        let fotosHTML = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-img small"><img src="images/${candidato.fotos[i].url}" alt="Foto prefeito 84" />${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHTML += `<div class="d-1-img"><img src="images/${candidato.fotos[i].url}" alt="Foto prefeito 84" />${candidato.fotos[i].legenda}</div>`
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        //voto nulo
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

//funções do teclado
function clicou (n) {
    let elNumero = document.querySelector('.numero.pisca');
    if (elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca'); //remove pisca do número preenchido
        if (elNumero.nextElementSibling !== null) {
        elNumero.nextElementSibling.classList.add('pisca'); //adiciona pisca no número ao lado enquanto houver
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
    lateral.innerHTML = '';
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco === true) {
        votoConfirmado = true;
     
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) { //se houver mais etapas
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
        }
    }
}

comecarEtapa();