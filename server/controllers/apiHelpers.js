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
    }
}

module.exports = new ApiHelpers();