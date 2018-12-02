const SimpleScenario = require('../simpleScenario');

const PositiveNumber = [
    new SimpleScenario('is a string', 'Arbitrary string', false),
    new SimpleScenario('is a negative number', -1, false),
    new SimpleScenario('is zero', 0, false),
    new SimpleScenario('is one', 1, true),
    new SimpleScenario('is another positive integer', 2, true),
    new SimpleScenario('is a positive fraction', 2.6, true)
];

module.exports = PositiveNumber;