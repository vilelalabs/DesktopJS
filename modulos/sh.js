exports.onJoin = onJoin;

var alreadyIn = []; // guarda os contatos já recebidos do Stream Holics

function onJoin(channel, username, self, client) {
    let streamers = [
        'amanditadev',
        'bug_elseif',
        'chicaocodes',
        'cp_luiz',
        'daviprm_',
        'dornellestv',
        'em1dio',
        'hugo_mesquita',
        'indice_do_conhecimento',
        'julhamarcolan',
        'julialabs',
        'jp_amis',
        'kaduzius',
        'killercoder_',
        'kindrak',
        'leo_churrasqueiro',
        'locutormobile',
        'lucas2',
        'maiattodev',
        'maikemota',
        'mateusmts',
        'meriamber',
        'oluizdequeiroz',
        'pokemaobr',
        'profbrunolopes',
        'programadorbinario',
        'project_juan',
        'renatoreboucas',
        'tairritadotio',
        'thaissacandella',
        'umprogramadoraleatorio',
        'vilelalabs',
        'vitorbgs',
        'webmat1',
        'xtecna',
    ];

    if (streamers.includes(username) && !alreadyIn.includes(username)) {
        client.say(client.channels[0], `!sh-so @${username}`);
        alreadyIn.push(username);
    }
};
