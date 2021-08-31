exports.tabuada = tabuada;
exports.hello = hello;
exports.prime = prime;

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

function hello(alvo, mensagem, comando, client) {
    if (comando == "!hello") {
        client.say(alvo, 'Hello World!');
        return;
    }
    else if (comando == "!world") {
        client.say(alvo, 'Você não deveria começar isto com um !hello???');
        return;
    }
}

function prime(alvo, mensagem, comando, client) {
    if (comando == "!prime" || comando == "!Prime") {
        client.say(alvo, '1. Acesse https://gaming.amazon.com |-| 2. Faca login na sua conta da amazon.com.br |-| 3. Selecione vincular conta da Twitch |-| 4. Faca login na sua conta da Twitch e selecione Confirmar. |-| 5. aqui no canal Henrique Vilela Music, clique em Inscrever-se!');
        return;
    }
}