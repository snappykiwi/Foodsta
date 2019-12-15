function ApiHelpers() {

    this.sequelizeOrderBy = function (queryParam, queryValue) {

        if (queryValue !== undefined) {

            switch (queryParam) {
                case 'date':
                    return ['createdAt', queryValue]

                case 'rating':
                    return ['rating', queryValue]

                default: return undefined;
            }
        } else {
            return undefined;
        }
    },

        this.sortbyParameters = function (Op, dietParametersArray, postNamesArray) {
            console.log(dietParametersArray, postNamesArray);
            if (!postNamesArray.length) {
                return {
                    [Op.or]: dietParametersArray
                }
            } else if (!dietParametersArray.length) {
                return {
                    [Op.or]: postNamesArray
                }
            }
            else {
                return {
                    [Op.or]: dietParametersArray,

                    [Op.and]: {
                        [Op.or]: postNamesArray
                    }
                }
            }
        }
}

module.exports = new ApiHelpers();