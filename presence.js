const Scenario = require('./scenario');

/**
 * A classes that augments property scenarios with the case where the property is undefined
 */
class Presence {

    /**
     * Add the scenario where the property is undefined (and valid)
     * @param property the property under test
     */
    static optional(property) {
        return [
            new Scenario(`${property.name} is undefined`, () => null, true),
            ...property.scenarios
        ];
    }

    /**
     * Add the scenario where the property is undefined (and invalid)
     * @param property the property under test
     */
    static required(property) {
        return [
            new Scenario(`${property.name} is undefined`, () => null, false),
            ...property.scenarios
        ];
    }
}

module.exports = Presence;