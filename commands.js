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

    if (comm.indexOf('!') != -1 || comm.indexOf(' ') != -1 || comm.indexOf('<') != -1) {
        client.say(target, "Comando NÃO salvo! Você não pode/precisa usar [!], espaço[ ] ou [<] nos seus comandos!");
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

    client.say(target, `Seu comando, ${comm} , foi criado com sucesso! Você já pode testar ele agora!`);

}

//verifica quando o comando foi chamado pelo chat
function AtivarComandos(commandName, client, target) {
    // indica como fazer para criar os comandos personalizados
    if (commandName == "!CCom") {
        client.say(target, "Entre nos Pontos do canal (a bolinha abaixo no chat) e compre a recomensa \"Crie seu Comando!\" Se estiver com 0 pontos, dê um Seguir e ganhe 300 pontos!");
    }
    else {
        //comandos criados pelo chat:
        for (let i = 0; i < 9; i++) {
            if (commandName == arrayCom[i]) {
                if (arrayRes[i] !== undefined) {
                    client.say(target, arrayRes[i]);
                    console.log(`* Comando ${arrayCom[i]} executado!`);
                }
                else
                    client.say(target, "Entre nos Pontos do canal (a bolinha abaixo no chat) e compre a recomensa \"Crie seu Comando!\" Se estiver com 0 pontos, dê um Seguir e ganhe 300 pontos!");
            }
        }
    }
}

module.exports = { CriarComandos, AtivarComandos, AtualizaCom, AtualizaRes };