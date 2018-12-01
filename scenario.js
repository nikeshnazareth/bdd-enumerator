/**
 * A class to describe a BDD scenario
 */
class Scenario {

    /**
     * @param desc a description of the scenario
     * @param value the property value in this scenario
     * @param valid a boolean indicating whether the scenario is valid or invalid
     * ( which affects which set of tests should be run in this scenario )
     */
    constructor(desc, value, valid) {
        this.desc = desc;
        this.value = value;
        this.valid = valid;
    }
}

module.exports = Scenario;