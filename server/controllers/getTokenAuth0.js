const rp = require('request-promise');

// Connecting and getting the Token information from Auth0
async function getTokenAuth0() {

    const optionsConnect = {
        method: 'POST',
        url: `${process.env.URL_GETTOKEN_AUTH0}`,
        headers: {
            'content-type': 'application/json'
        },
        body: {
            "client_id": `${process.env.CLIENT_ID_AUTH0}`,
            "client_secret": `${process.env.CLIENT_SECRET_AUTH0}`,
            "audience": `${process.env.AUDIENCE_CONNECT_AUTH0}`,
            "grant_type": "client_credentials"
        },
        json: true
    };

    let token = "";

    try {
        token = await rp(optionsConnect)
    }
    catch (error) {
        console.log(error);
    }

    return token;
}

module.exports = getTokenAuth0;