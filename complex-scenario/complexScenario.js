const Scenario = require('../scenario');

/**
 * A class to recursively describe a complex BDD scenario
 */
class ComplexScenario extends Scenario {

    /**
     * @param desc a description of the scenario
     * @param childElements an array of ChildElement objects to be combined in a cross product
     *   (ie. Enumerate.complex will create a test block for every possible combination of children )
     * @param value a Curried function of degree (childElements.length) that accepts possible scenarios
     *   for each child element (in order) and produces the combined property value.
     *   If childElements is empty, it is the direct value (ie. ComplexScenario behaves like Scenario)
     * @param valid a Curried function of degree (childElements.length) that accepts possible scenarios
     *   for each child element (in order) and produces the combined validity.
     *   If childElements is empty, it is the direct validity boolean (ie. ComplexScenario behaves like Scenario)
     */
    constructor(desc, childElements, value, valid) {
        super(desc, value, valid);
        this.childElements = childElements;
    }
}

module.exports = ComplexScenario;