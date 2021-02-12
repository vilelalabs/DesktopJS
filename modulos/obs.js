
const auth = require('../auth.js');
const OBSWebSocket = require('obs-websocket-js');

const obs = new OBSWebSocket();


function TelaComandos(activate) {
    obs.connect({
        adress: 'localhost:4444',
        password: `${auth.getAuth('obsconnect')}`
    })
        .then(() => {
            console.log('Conectado e autenticado com sucesso no OBS!');
            return obs.send('GetSceneList');
        })
        .then(data => {
            //console.log(`${data.scenes.length} cenas disponíveis!`);

            /* obs.send('SetCurrentScene', {
                 'scene-name': 'Principal 02 - Mesa'
             });*/

            //console.log(data.scenes[2].sources[1]);
            //console.log(data.scenes[2].name);

            /*obs.send('GetSourceSettings', { sourceName: data.scenes[2].sources[1].name })
                 .then((data) => {
                     console.log(data)
                 })*/
            obs.send('SetSourceSettings', {
                sourceName: data.scenes[2].sources[1].name,
                sourceSettings: {
                    window: activate ? 'Easy Twitch Bot:Chrome_WidgetWin_1:electron.exe' : ''
                }

            }).then(messageID => {

                console.log(messageID);
            })
                .catch(err => {
                    console.log(err);
                })

            obs.disconnect();
        })
        .catch(err => {
            console.log(`Erro: ${err}`);
        })

    obs.on('error', err => {
        console.error('socket error:', err);
    });
}

module.exports = { TelaComandos }
