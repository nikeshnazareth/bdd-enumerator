const Enumerate = require('./enumerate');
const NonEmptyString = require('./type-checking/nonEmptyString');
const PositiveNumber = require('./type-checking/positiveNumber');
const Presence = require('./presence');
const Composition = require('./composition');

module.exports = {
    enumerate: Enumerate,
    property: {
        type: {
            nonEmptyString: NonEmptyString,
            positiveNumber: PositiveNumber
        },
        presence: Presence,
        composition: Composition
    }
};