/**
 * A class to describe a BDD scenario
 */
class Scenario {

    /**
     * @param desc a description of the scenario
     * @param setFn a function that produces the desired scenario
     * @param valid a boolean indicating whether the scenario is valid or invalid
     * ( which affects which set of tests should be run in this scenario )
     */
    constructor(desc, setFn, valid) {
        this.desc = desc;
        this.set = setFn;
        this.valid = valid;
    }
}

module.exports = Scenario;