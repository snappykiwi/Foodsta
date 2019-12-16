const
    Sequelize = require('sequelize'),
    db = require('../models'),
    apiHelpers = require('../controllers/apiHelpers'),
    Op = Sequelize.Op;



const dbController = {

    findOnePostByIdOrAll: function (req, res) {

        if (req.params.id) {

            db.Post
                .findOne({
                    where: {
                        id: req.params.id
                    }
                })
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        } else {
            db.Post
                .findAll({
                    order: [['createdAt', 'DESC']]
                })
                .then(data => {
                    res.json(data);
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        };
    },
    createPost: function (req, res) {
        const post = req.body;

        db.Post.create({
            "userId": post.userId,
            "userName": post.userName,
            "title": post.title,
            "caption": post.caption,
            "cuisine": post.cuisine,
            "image": post.image,
            "rating": post.rating,
            "gf": post.gf,
            "vegan": post.vegan,
            "vegetarian": post.vegetarian,
            "restaurantId": post.restaurantId,
            "restaurantName": post.restaurantName
        }).then((response) => {
            res.json(response);
        }).catch(err => {
            GET
            console.log(err);
            throw err;
        });
    },
    deletePost: function (req, res) {
        db.Post
            .findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((foundPost) => {
                if (!foundPost) {
                    res.status(500).send("Could not find the requested post");
                    return
                } else foundPost.destroy()
            })
            .then((response) => {
                res.status(200).send("post deleted");
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    findUserPost: function (req, res) {
        db.Post
            .findAll({
                where: {
                    userId: req.params.id
                },
                order: [['createdAt', 'DESC']]
            })
            .then((data) => {
                res.json(data);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    },
    findRestaurantPost: function (req, res) {
        console.log("am here", req.query);
        const
            { restaurantId } = req.params,
            queryParameters = Object.keys(req.query),
            queryParam = queryParameters[0],
            queryValue = req.query[queryParameters],
            orderBy = apiHelpers.sequelizeOrderBy(queryParam, queryValue);

        let sortParametersArray = [];

        (orderBy) && sortParametersArray.push(orderBy)

        db.Post
            .findAll({
                where: {
                    restaurantId: restaurantId
                },
                order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });

    },
    partialSearchPost: function (req, res) {

        let sortParametersArray = [];
        const
            searchString = req.params.searchString.toLowerCase().trim(),
            queryParameters = Object.keys(req.query);

        queryParameters.forEach((param) => {

            const orderBy = apiHelpers.sequelizeOrderBy(param, req.query[param]);

            (orderBy) && sortParametersArray.push(orderBy)
        })

        db.Post
            .findAll({
                where: {

                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${searchString}%`
                            }
                        }, {
                            cuisine: {
                                [Op.like]: `%${searchString}%`
                            }
                        }, {
                            restaurantName: {
                                [Op.like]: `%${searchString}%`
                            }
                        }
                    ]
                },
                order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
            })
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    getPostBy: function (req, res) {

        const queryParameters = Object.keys(req.query);
        let dietParametersArray = [];
        let postNamesArray = [];
        let sortParametersArray = [];

        queryParameters.forEach((param) => {

            switch (param) {
                case 'restaurantId':
                case 'gf':
                case 'vegan':
                case 'vegetarian':
                    if (req.query[param] !== undefined) dietParametersArray.push(
                        {
                            [param]: req.query[param]
                        }
                    )
                    break;
                case 'searchString':
                    if (req.query[param] !== undefined) postNamesArray =
                        {
                            title: {
                                [Op.like]: `%${req.query[param]}%`
                            },
                            cusine: {
                                [Op.like]: `%${req.query[param]}%`
                            },
                            restaurantName: {
                                [Op.like]: `%${req.query[param]}%`
                            }
                        }
                    return
            }

            const orderBy = apiHelpers.sequelizeOrderBy(param, req.query[param]);

            (orderBy) && sortParametersArray.push(orderBy)
        })
        db.Post
            .findAll({
                where: apiHelpers.sortbyParameters(Op, dietParametersArray, postNamesArray),

                order: sortParametersArray.length ? sortParametersArray : [['createdAt', 'DESC']]
            })
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                throw err;
            });
    },
    updatePost: function (req, res) {

        const post = req.body;
        db.Post.update({
            "title": post.title,
            "caption": post.caption,
            "cuisine": post.cuisine,
            "image": post.image,
            "rating": post.rating,
            "gf": post.gf,
            "vegan": post.vegan,
            "vegetarian": post.vegetarian,
            "RestaurantId": post.RestaurantId
        }, {
            where: {
                id: req.params.id
            }
        }).then((response) => res.json(response))
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

};

module.exports = dbController;




