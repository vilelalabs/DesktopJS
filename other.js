exports.tabuada = tabuada;

function tabuada(alvo, mensagem, comando, client) {

    if (comando == "!tabuada") {
        client.say(alvo, '/me Digite !tabuada e um número a seguir por exemplo: !tabuada 9');
        return;
    }

    if (mensagem.substring(0, 9) === `!tabuada `) {
        let final = `/me `;

        let valor = mensagem.substring(9);

        valor = parseInt(valor, 10);
        if (valor >= 0 && valor <= 1000000) {
            for (let i = 1; i <= 10; i++)
                final += `[ ${valor} x ${i} = ${valor * i} ]`;
        }
        else {
            final += 'Valor incorreto. Digite um número de 1 a 1 milhão';
        }

        client.say(alvo, final);
        console.log(`* Comando ${comando} executado`);
    }
}