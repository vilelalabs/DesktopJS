
/**************************************** PARA USO DO MAIN.JS **************************************/
var arrayCom = [];
var arrayRes = [];

function AtualizaCom(arrayC) {
    arrayCom = arrayC;
}
function AtualizaRes(arrayR) {
    arrayRes = arrayR;
}


// grava array de comandos e respostas criadas pelo chat (apenas os arrays globais)
function CriarComandos(msg, client, target, win) {
    // cria o comando e coloca-o na fila de comandos
    let comandoResposta = [];

    // trabalhando o msg para separar comando da resposta
    let comm;
    let resp;

    comm = msg.substring(0, msg.indexOf(' '));
    resp = msg.substring(msg.indexOf(' ') + 1);

    // faz correções e verificações nos comandos criados
    comm = comm.trim();
    resp = resp.trim();

    //retira exclamação do início do comando, caso tenha sido colocado
    if (comm.substring(0, 1) == "!")
        comm = comm.substring(1);


    if (comm == "" || resp == "") {
        client.say(target, " Comando NÃO salvo! Faltou digitar o comando e/ou a resposta!");
        return;
    }

    if (comm.indexOf('!') != -1 || comm.indexOf(' ') != -1 || comm.indexOf('<') != -1 || comm.indexOf('>') != -1 || comm.indexOf('&') != -1) {
        client.say(target, "Comando NÃO salvo! Você não pode/precisa usar [!], [&], espaço[ ] ou [< >] nos seus comandos!");
        return;
    }

    if (resp.indexOf('!') != -1 || resp.indexOf('/') != -1 || resp.indexOf('.') != -1) {
        client.say(target, "Engraçadinho! Tente outra vez...");
        return;
    }

    // verifica por comandos repetidos
    for (let i = 0; i < 9; i++) {
        if (`!${comm}` === arrayCom[i]) {
            client.say(target, "Nome de comando repetido. Mude o nome do comando!");
            return;
        }
    }

    if (comm.length > 10)
        comm = comm.substring(0, 10);

    // envia para o client.js
    comandoResposta.push(comm);
    comandoResposta.push(resp);

    win.webContents.send('novoComando', comandoResposta);

    client.say(target, `Seu comando [${comm}] foi criado com sucesso! Você já pode testar ele agora!`);

}

//verifica quando o comando foi chamado pelo chat
function AtivarComandos(commandName, client, target) {
    // indica como fazer para criar os comandos personalizados
    if (commandName == "!CCom") {
        client.say(target, "Entre nos Pontos do canal (a moeda abaixo no chat) e compre a recomensa \"Crie seu Comando!\" Se estiver com 0 pontos, dê um Seguir e ganhe 300 pontos!");
    }
    else {
        //comandos criados pelo chat:
        for (let i = 0; i < 9; i++) {
            if (commandName == arrayCom[i]) {
                if (arrayRes[i] !== undefined) {
                    client.say(target, `${arrayRes[i]}`);
                    console.log(`* Comando ${arrayCom[i]} executado!`);
                }
                else
                    client.say(target, "Entre nos Pontos do canal (a moeda abaixo no chat) e compre a recomensa \"Crie seu Comando!\" Se estiver com 0 pontos, dê um Seguir e ganhe 300 pontos!");
            }
        }
    }
}

/*************************************** PARA USO DO CLIENT.JS *************************************/

var resTr = [];         // resposta para transferencia para o Main.js
var novoComando = [];   // salva comando e resposta vindos do chat da Twitch
var comTxt = [];
var resTxt = [];        //envia os dados de repostas para o Main.js


// contador para os comandos
function contadorCom() {
    // Check to see if the counter has been initialized
    if (typeof contadorCom.counter == 'undefined' || contadorCom.counter == 8) {
        // It has not... perform the initialization
        contadorCom.counter = -1;
    }
    return (++contadorCom.counter);
}
//contador para as respostas
function contadorRes() {
    // Check to see if the counter has been initialized
    if (typeof contadorRes.counter == 'undefined' || contadorRes.counter == 8) {
        // It has not... perform the initialization
        contadorRes.counter = -1;
    }
    return (++contadorRes.counter);
}


function ReceberNovoComando(nComando) {
    novoComando = nComando;
}

let com = [];
function CarregaComandos(novoCom, índice) {

    let command = novoCom[0];
    let response = novoCom[1];

    com.push(document.getElementById(`com${índice + 1}`));

    com[índice].innerText = command;
    resTr[índice] = response;

}

function ExibeComandos() {
    let command = novoComando[0];
    let response = novoComando[1];

    let com = [];
    for (let i = 1; i <= 9; i++) {
        com.push(document.getElementById(`com${i}`));
    };

    let tr = [];
    for (let i = 1; i <= 9; i++) {
        tr.push(document.getElementById(`tr${i}`));
    };

    let comPos = contadorCom();
    let resPos = contadorRes();

    com[comPos].innerText = `!${command}`;

    resTr[resPos] = response;
    //envia os dados de repostas para o Main.js
    for (let i = 0; i < 9; i++) {
        resTxt.push(resTr[i]);
    };

    //envia os dados de comandos para o Main.js
    for (let i = 0; i < 9; i++) {
        comTxt.push(com[i].innerHTML);
    };

    let arrayArquivo = [];
    for (let i = 0; i < 9; i++) {
        arrayArquivo.push(`${comTxt[i]} ${resTxt[i]}`);

    }
    arrayArquivo = arrayArquivo.join('\n');

    GravarArquivo(arrayArquivo);


    for (let i = 0; i < 9; i++) {
        if (i % 2 != 0) {
            tr[i].style.backgroundColor = "#4c3beb";
            tr[i].style.color = "white";
        }
        else {
            tr[i].style.backgroundColor = "rgb(90, 28, 148)";
            tr[i].style.color = "white";
        }

        if (i == comPos) {
            tr[i].style.backgroundColor = "rgb(28, 255, 255)";
            tr[i].style.color = "black";
            tr[i].style.font.bold = "true";
        }
    }
}



function GetResTxt() {
    return resTxt;
}

function GetComTxt() {
    return comTxt;
}

function ZerarResCom() {
    while (resTxt.length) {
        resTxt.pop();
    }
    while (comTxt.length) {
        comTxt.pop();
    }
}


/*******************************  PARA USO DO LEITURA E GRAVAÇÃO EM ARQUIVO  *********************************/

//teste do acesso ao filesystem
const fs = require('fs');
var comandos = [];

function LerArquivo(cliente) {
    fs.readFile(`recursos/comandos.txt`, 'utf-8', function (err, data) {
        if (err) throw err;

        var linhas = data.split("\n");
        linhas.forEach(function (linha) {
            comandos.push(linha);
        })

        // trabalhando o msg para separar comando da resposta
        for (let i = 0; i < 9; i++) {
            let comm = '';
            let resp = '';

            comm = comandos[i].substring(0, comandos[i].indexOf(' '));
            resp = comandos[i].substring(comandos[i].indexOf(' ') + 1);
            if (cliente) {
                let nCom = [comm, resp];
                CarregaComandos(nCom, i); //usa elementos do DOM
            }
            else {
                arrayCom[i] = comm;
                arrayRes[i] = resp;
            }
        }
    });
}


// --------------------------------------------------------------------------------------------
function GravarArquivo(aCom) {
    let arquivo = aCom;

    fs.writeFile(`recursos/comandos.txt`, arquivo, { flag: 'w' }, function (err) { //encoding: 'utf-8',
        if (err) throw err;
    })
}

module.exports = {
    CriarComandos, AtivarComandos, AtualizaCom, AtualizaRes,              // main.js
    ReceberNovoComando, ExibeComandos, GetResTxt, GetComTxt, ZerarResCom, // client.js
    GravarArquivo, LerArquivo                                             // tratamento de arquivo
};
