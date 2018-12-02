/**
 * A class to encapsulate the description of a child element in a ComplexScenario
 */
class ChildElement {
    /**
     * @param desc the description of the child element
     * @param scenarios all possible values for the child element
     */
    constructor(desc, scenarios) {
        this.desc = desc;
        this.scenarios = scenarios;
    }
}

module.exports = ChildElement;