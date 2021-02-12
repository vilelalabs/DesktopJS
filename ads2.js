const auth = require('./auth.js');
const axios = require('axios').default;


async function teste() {
    //response = await axios.get(`https://swapi.dev/api/planets/1/`);

    let options = {
        headers: {
            'Authorization': `Bearer ${auth.getAuth('appToken')}`,
            'Client-Id': `${auth.getAuth('appID')}`,
            'Content-Type': 'application/json'
        }
    };

    /*response = await axios.get(`https://api.twitch.tv/helix/users?`, options);
    console.log(response.data);*/



    await axios.post('https://api.twitch.tv/helix/channels/commercial', {
        broadcaster_id: 545096908, length: 30
    }, options)
        .then(function (response) {
            console.log(response.data.data[0].message);
        })
        .catch(function (error) {
            console.log(error.response.data.message);
            //console.log(error);
        });



}
teste();
