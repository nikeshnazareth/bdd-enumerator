/**
 * Expand all scenarios into BDD style blocks
 * @param scenarios an array of scenarios to test
 * @param validTestsFn the tests to run on valid scenarios
 * @param invalidTestsFn the tests to run on invalid scenarios
 */
module.exports = (scenarios, validTestsFn, invalidTestsFn) => {
    scenarios.map(scenario => {
        describe(scenario.desc, () => {
            beforeEach(() => scenario.set());
            const tests = scenario.valid ? validTestsFn : invalidTestsFn;
            tests();
        });
    })
};
