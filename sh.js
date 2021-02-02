exports.onJoin = onJoin;

var alreadyIn = []; // guarda os contatos já recebidos do Stream Holics

function onJoin(channel, username, self, client) {
    let streamers = [
        'bug_elseif',
        'chicaocodes',
        'dornellestv',
        'henriquevilelamusic',
        'indice_do_conhecimento',
        'julhamarcolan',
        'julialabs',
        'kaduzius',
        'maikemota',
        'pokemaobr',
        'profbrunolopes',
        'project_juan',
        'tairritadotio',
        'vilelabot',
        'vitorbgs',
        'webmat1',
    ];

    if (streamers.includes(username) && !alreadyIn.includes(username)) {
        client.say(client.channels[0], `!sh-so @${username}`);
        alreadyIn.push(username);
    }
};
