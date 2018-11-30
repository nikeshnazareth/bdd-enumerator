const Scenario = require('./scenario');

/**
 * A classes that augments property scenarios with the case where the property is undefined
 */
class Presence {

    /**
     * Add the property.validTests to the case where the property is undefined
     * @param property the property under test
     */
    static optional(property) {
        return [
            new Scenario(`${property.name} is undefined`, () => null, property.validTests),
            ...property.scenarios
        ];
    }

    /**
     * Add the property.invalidTests to the case where the property is undefined
     * @param property the property under test
     */
    static required(property) {
        return [
            new Scenario(`${property.name} is undefined`, () => null, property.invalidTests),
            ...property.scenarios
        ];
    }
}

module.exports = Presence;