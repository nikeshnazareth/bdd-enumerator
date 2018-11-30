/**
 * A base class for type checkers
 * Subclasses should overwrite this.scenarios
 */
class TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     * @param validTests tests to run when the property is valid
     * @param invalidTests tests to run when the property is invalid
     */
    constructor(name, setter, validTests, invalidTests) {
        this.name = name;
        this.setter = setter;
        this.validTests = validTests;
        this.invalidTests = invalidTests;
        this.scenarios = [];
    }
}

module.exports = TypeChecker;