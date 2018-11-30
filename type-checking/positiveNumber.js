const Scenario = require('../scenario');
const TypeChecker = require('./typeChecker');

/**
 * A type checker for positive numbers
 */
class PositiveNumber extends TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     * @param validTests tests to run when the property is a positive number
     * @param invalidTests tests to run when the property not a positive number
     */
    constructor(name, setter, validTests, invalidTests) {
        super(name, setter, validTests, invalidTests);
        this.scenarios = [
            new Scenario(`${name} is a string`, () => setter('Arbitrary string'), invalidTests),
            new Scenario(`${name} is a negative number`, () => setter(-1), invalidTests),
            new Scenario(`${name} is zero`, () => setter(0), invalidTests),
            new Scenario(`${name} is one`, () => setter(1), validTests),
            new Scenario(`${name} is another positive integer`, () => setter(2), validTests),
            new Scenario(`${name} is a positive fraction`, () => setter(2.6), validTests)
        ]
    }
}

module.exports = PositiveNumber;