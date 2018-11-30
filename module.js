const enumerate = require('./enumerate');
const nonEmptyStringOptions = require('./type-checking/nonEmptyString');

module.exports = {
    enumerate: enumerate,
    options: {
        type: {
            nonEmptyString: nonEmptyStringOptions
        }
    }
};