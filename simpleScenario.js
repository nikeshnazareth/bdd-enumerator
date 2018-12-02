const Scenario = require('./scenario');

/**
 * A class to describe a BDD scenario
 */
class SimpleScenario extends Scenario {

    /**
     * @param desc a description of the scenario
     * @param value the property value in this scenario
     * @param valid a boolean indicating whether the scenario is valid or invalid
     * ( which affects which set of tests should be run in this scenario )
     */
    constructor(desc, value, valid) {
        super(desc, [], value, valid, () => undefined);
    }
}

module.exports = SimpleScenario;