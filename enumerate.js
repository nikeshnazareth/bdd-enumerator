/**
 * Expand all scenarios into BDD style blocks
 * @param scenarios an array of scenarios to test
 */
module.exports = scenarios => {
    scenarios.map(scenario => {
        describe(scenario.desc, () => {
            beforeEach(() => scenario.set());

            scenario.tests();
        });
    })
};
