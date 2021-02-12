exports.onJoin = onJoin;

var alreadyIn = []; // guarda os contatos já recebidos do Stream Holics

function onJoin(channel, username, self, client) {
    let streamers = [
        'binhacogumelo',
        'bug_elseif',
        'chicaocodes',
        'dornellestv',
        'henriquevilelamusic',
        'indice_do_conhecimento',
        'julhamarcolan',
        'julialabs',
        'kaduzius',
        'kindrak',
        'locutormobile',
        'maiattodev',
        'maikemota',
        'meriamber',
        'pokemaobr',
        'profbrunolopes',
        'programadorbinario',
        'project_juan',
        'renatoreboucas',
        'tairritadotio',
        'umprogramadoraleatorio',
        'vitorbgs',
        'webmat1',
    ];

    if (streamers.includes(username) && !alreadyIn.includes(username)) {
        client.say(client.channels[0], `!sh-so @${username}`);
        alreadyIn.push(username);
    }
};
