const Enumerate = require('./enumerate');
const Presence = require('./predefined-scenarios/presence');
const NonEmptyString = require('./predefined-scenarios/nonEmptyString');
const PositiveNumber = require('./predefined-scenarios/positiveNumber');
const NonEmptyArray = require('./predefined-scenarios/nonEmptyArray');
const Property = require('./predefined-scenarios/property');
const MutexProperties = require('./predefined-scenarios/mutexProperties');
const ChildElement = require('./childElement');

module.exports = {
    enumerate: Enumerate,
    scenario: {
        presence: Presence,
        nonEmptyString: NonEmptyString,
        positiveNumber: PositiveNumber,
        nonEmptyArray: NonEmptyArray,
        property: Property,
        mutexProperties: MutexProperties
    },
    helper: {
        childElement: ChildElement
    }
};