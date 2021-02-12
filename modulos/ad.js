/*
  ad_time_sec: tempo do AD em si (ver função /commercial da Twitch) (em segundos)
  ad_interval_min: tempo dew intervalos entre ads (em minutos)

  Authorization e Client-id devem ser gerados em: https://twitchtokengenerator.com/ , habilitando
  os scopes (escopos): 
    Helix->
      user:read:email
      channel:edit:commercial
*/

const auth = require('.././auth.js');
const axios = require('axios').default;

async function RodarAd(ad_time_sec, ad_interval_min) {
  setInterval(async () => {
    let options = {
      headers: {
        'Authorization': `Bearer ${auth.getAuth('appToken')}`,
        'Client-Id': `${auth.getAuth('appID')}`,
        'Content-Type': 'application/json'
      }
    };

    await console.log("tentando rodar comercial...");
    //recebe o broadcater ID via GET
    response = await axios.get(`https://api.twitch.tv/helix/users?`, options);
    let broadcasterID = response.data.data[0].id;

    //solicita geração do commercial via POST
    await axios.post('https://api.twitch.tv/helix/channels/commercial', {
      broadcaster_id: broadcasterID, length: ad_time_sec
    }, options)
      .then(function (response) {
        console.log(response.data.data[0].message);
      })
      .catch(function (error) {
        console.log(error.response.data.message);
      });

  }, ad_interval_min * 60000);
}

module.exports = { RodarAd };