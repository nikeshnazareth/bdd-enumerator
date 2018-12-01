const Enumerate = require('./enumerate');
const Property = require('./property');
const NonEmptyString = require('./type-checking/nonEmptyString');
const PositiveNumber = require('./type-checking/positiveNumber');
const Presence = require('./presence');

module.exports = {
    enumerate: Enumerate,
    property: Property,
    scenario: {
        nonEmptyString: NonEmptyString,
        positiveNumber: PositiveNumber,
        presence: Presence,
    }
};