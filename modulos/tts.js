//https://swapi.dev/api/planets/1/
//https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json

const gTTS = require('gtts');
const sound = require('sound-play');


function LerTexto(texto, cb_play) {

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
