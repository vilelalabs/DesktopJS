
function getAuth(_from) {
    let auth = '';

    switch (_from) {
        case 'twitch':
            auth = 'TWITCH_OAUTH';
            break;
        case 'anotherAPI':
            auth = 'ANOTHER_API_OAUTH';
            break;
        default:
            break;
    }

    return auth;
}

module.exports = { getAuth };