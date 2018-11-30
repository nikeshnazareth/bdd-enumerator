const enumerate = require('./enumerate');
const nonEmptyStringOptions = require('./type-checking/nonEmptyString');
const required = require('./type-checking/required');
const optional = require('./type-checking/optional');

module.exports = {
    enumerate: enumerate,
    options: {
        type: {
            nonEmptyString: nonEmptyStringOptions,
            required: required,
            optional: optional
        }
    }
};