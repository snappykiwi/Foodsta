const
    getTokenAuth0 = require('../controllers/getTokenAuth0'),
    axios = require('axios').default;

const auth0Controller = {

    getUserInfo: function (req, res) {

        getTokenAuth0().then((tokenDataResponse) => {

            const
                { access_token, token_type } = tokenDataResponse,
                { userId } = req.params,
                options = {
                    url: `${process.env.AUDIENCE_USERS_AUTH0}${userId}`,
                    headers: {
                        authorization: `${token_type} ${access_token}`
                    }
                };

            axios(options)
                .then((response) => res.send(response.data))
                .catch((err) => console.log(err));
        });
    },
    updateUserInfo: function (req, res) {

        getTokenAuth0().then((tokenDataResponse) => {

            const
                { access_token, token_type } = tokenDataResponse,
                { userId } = req.params,
                user_data = req.body,
                options = {
                    method: 'PATCH',
                    url: `${process.env.AUDIENCE_USERS_AUTH0}${userId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `${token_type} ${access_token}`
                    },

                    data: datas = user_data
                };

            axios(options)
                .catch((err) => console.log(err));
        });
        res.status(200).json(req.body);
    }

};

module.exports = auth0Controller;