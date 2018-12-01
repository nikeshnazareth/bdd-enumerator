/**
 * A base class for type checkers
 * Subclasses should overwrite this.scenarios
 */
class TypeChecker {

    /**
     * @param name the name of the property under test
     * @param setter a function that can be used to set the property
     */
    constructor(name, setter) {
        this.name = name;
        this.setter = setter;
        this.scenarios = [];
    }
}

module.exports = TypeChecker;