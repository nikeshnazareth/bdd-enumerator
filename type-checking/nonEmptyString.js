const Scenario = require('../scenario');
const TypeChecker = require('./typeChecker');

/**
 * A type checker for non-empty strings
 */
class NonEmptyString extends TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     */
    constructor(name, setter) {
        super(name, setter);
        this.scenarios = [
            new Scenario(`${name} is a number`, () => setter(1), false),
            new Scenario(`${name} is an empty string`, () => setter(''), false),
            new Scenario(`${name} is an non-empty string`, () => setter('Arbitrary string'), true)
        ]
    }
}

module.exports = NonEmptyString;