const Scenario = require('../scenario');
const TypeChecker = require('./typeChecker');

/**
 * A type checker for non-empty strings
 */
class NonEmptyString extends TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     * @param validTests tests to run when the property is a non-empty string
     * @param invalidTests tests to run when the property is not a non-empty string
     */
    constructor(name, setter, validTests, invalidTests) {
        super(name, setter, validTests, invalidTests);
        this.scenarios = [
            new Scenario(`${name} is a number`, () => setter(1), invalidTests),
            new Scenario(`${name} is an empty string`, () => setter(''), invalidTests),
            new Scenario(`${name} is an non-empty string`, () => setter('Arbitrary string'), validTests)
        ]
    }
}

module.exports = NonEmptyString;