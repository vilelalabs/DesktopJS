
const auth = require('../auth.js');
const OBSWebSocket = require('obs-websocket-js');

const obs = new OBSWebSocket();


function OBSConnection() {
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
            //console.log(data.scenes[2]);

            /* obs.send('SetCurrentScene', {
                 'scene-name': 'Principal 02 - Mesa'
             });*/

            //console.log(data.scenes[2].sources[1]);
            //console.log(data.scenes[2].name);

            /* obs.send('SetSourceName', {
                 sourceName: data.scenes[2].sources[1].name,
                 newName: 'TESTE2'
             })*/

            obs.send('SetSourceSettings', {
                sourceName: data.scenes[2].sources[1].name,
                sourceSettings: {
                    muted: false
                }

            }).then(messageID => {

                console.log(messageID);
            })
                .catch(err => {
                    console.log(err);
                })

            // obs.disconnect();
        })
        .catch(err => {
            console.log(`Erro: ${err}`);
        })

    obs.on('error', err => {
        console.error('socket error:', err);
    });
    console.log('teste');




}

OBSConnection();
