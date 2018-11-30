const enumerate = require('./enumerate');
const nonEmptyStringOptions = require('./type-checking/nonEmptyString');
const positiveNumberOptions = require('./type-checking/positiveNumber');
const required = require('./type-checking/required');
const optional = require('./type-checking/optional');

module.exports = {
    enumerate: enumerate,
    options: {
        type: {
            nonEmptyString: nonEmptyStringOptions,
            positiveNumber: positiveNumberOptions,
            required: required,
            optional: optional
        }
    }
};