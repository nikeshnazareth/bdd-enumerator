const enumerate = require('./enumerate');
const nonEmptyStringOptions = require('./type-checking/nonEmptyString');
const positiveNumberOptions = require('./type-checking/positiveNumber');
const required = require('./type-checking/required');
const optional = require('./type-checking/optional');
const mutuallyExclusive = require('./composition/mutuallyExclusive');

module.exports = {
    enumerate: enumerate,
    options: {
        type: {
            nonEmptyString: nonEmptyStringOptions,
            positiveNumber: positiveNumberOptions,
            required: required,
            optional: optional
        },
        composition: {
            mutex: mutuallyExclusive
        }
    }
};