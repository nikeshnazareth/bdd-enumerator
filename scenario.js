/**
 * A class to describe a BDD scenario
 */
class Scenario {

    /**
     * @param desc a description of the scenario
     * @param setFn a function that produces the desired scenario
     * @param testsFn the tests to execute in the given scenario
     */
    constructor(desc, setFn, testsFn) {
        this.desc = desc;
        this.set = setFn;
        this.tests = testsFn;
    }
}

module.exports = Scenario;