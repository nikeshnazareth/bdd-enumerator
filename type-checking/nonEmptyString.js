const Scenario = require('../scenario');

const NonEmptyString = [
    new Scenario('is a number', 1, false),
    new Scenario('is an empty string', '', false),
    new Scenario('is a non-empty string', 'Arbitrary string', true)
];

module.exports = NonEmptyString;