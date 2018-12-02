const Enumerate = require('./enumerate');
const Property = require('./property');
const Presence = require('./type-checking/presence');
const NonEmptyString = require('./type-checking/nonEmptyString');
const PositiveNumber = require('./type-checking/positiveNumber');
const NonEmptyArray = require('./type-checking/nonEmptyArray');

module.exports = {
    enumerate: Enumerate,
    scenario: {
        presence: Presence,
        nonEmptyString: NonEmptyString,
        positiveNumber: PositiveNumber,
        nonEmptyArray: NonEmptyArray,
        property: Property
    }
};