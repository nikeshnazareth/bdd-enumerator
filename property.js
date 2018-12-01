/**
 * A simple class to represent a property under test
 */
class Property {
    /**
     * @param name the name of the property under test
     * @param baseObjFn a function that returns the base object where the property will be added
     *   ( a function is used instead of the object directly, because it may not be defined yet )
     * @param scenarios all possible values for the property
     */
    constructor(name, baseObjFn, scenarios) {
        this.name = name;
        this.baseObjFn = baseObjFn;
        this.scenarios = scenarios;
    }
}

module.exports = Property;