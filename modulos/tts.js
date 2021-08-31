
const gTTS = require('gtts');
const sound = require('sound-play');


function LerTexto(texto, cb_play) {

    //TODO: habilitar para escolha de linguas diferentes
    var gtts = new gTTS(texto, 'pt-br');

    try {
        gtts.save(`${__dirname}/../recursos/audio.mp3`, () => {
            console.log("texto Convertido com sucesso!");
        });
    } catch (err) {
        console.log(err);
    }


}
function TocarSom() {
    try {
        sound.play(`${__dirname}/../recursos/audio.mp3`);
    } catch (error) {
        console.log('erro ao tocar o som');
        console.log(error);
    }
}

module.exports = { LerTexto, TocarSom };
