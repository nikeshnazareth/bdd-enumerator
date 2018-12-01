const Scenario = require('../scenario');
const TypeChecker = require('./typeChecker');

/**
 * A type checker for positive numbers
 */
class PositiveNumber extends TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     */
    constructor(name, setter) {
        super(name, setter);
        this.scenarios = [
            new Scenario(`${name} is a string`, () => setter('Arbitrary string'), false),
            new Scenario(`${name} is a negative number`, () => setter(-1), false),
            new Scenario(`${name} is zero`, () => setter(0), false),
            new Scenario(`${name} is one`, () => setter(1), true),
            new Scenario(`${name} is another positive integer`, () => setter(2), true),
            new Scenario(`${name} is a positive fraction`, () => setter(2.6), true)
        ]
    }
}

module.exports = PositiveNumber;