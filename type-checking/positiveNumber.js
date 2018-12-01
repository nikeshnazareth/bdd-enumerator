const Scenario = require('../scenario');

const PositiveNumber = [
    new Scenario('is a string', 'Arbitrary string', false),
    new Scenario('is a negative number', -1, false),
    new Scenario('is zero', 0, false),
    new Scenario('is one', 1, true),
    new Scenario('is another positive integer', 2, true),
    new Scenario('is a positive fraction', 2.6, true)
];

module.exports = PositiveNumber;