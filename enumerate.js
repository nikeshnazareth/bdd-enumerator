const Scenario = require('./scenario');

/**
 * A class that accepts properties and expands the possible options into a set of BDD tests
 */
class Enumerate {

    /**
     * Creates tests for all combinations of properties, where the combination is only valid when
     * all individual properties are valid
     * @param properties a list of properties to test
     * @param validTestsFn the tests to run when all properties are valid
     * @param invalidTestsFn the tests to run when any property is invalid
     */
    static all(properties, validTestsFn, invalidTestsFn) {
        if (properties.length === 0) {
            validTestsFn();
            return;
        }

        const property = properties[0];

        describe(property.name, () => {
            property.scenarios.map(scenario => {
                describe(scenario.desc, () => {
                    beforeEach(() => {
                        if (scenario.value !== undefined) {
                            let obj = property.baseObjFn();
                            const path = property.name.split('.');
                            while (path.length > 1) {
                                const intermediate = path.shift();
                                if (obj[intermediate] === undefined)
                                    obj[intermediate] = {};
                                obj = obj[intermediate];
                            }
                            obj[path] = scenario.value;
                        }
                    });

                    if (scenario.valid)
                        Enumerate.all(properties.slice(1), validTestsFn, invalidTestsFn);
                    else
                        Enumerate.all(properties.slice(1), invalidTestsFn, invalidTestsFn);
                });
            });
        });
    }

    static expandScenario(scenario, validTestsFn, invalidTestsFn, parents = []) {
        // the contents of this scenario expansion is wrapped in a function to because it may not require a describe block
        const wrapper = () => {
            if (scenario.childElements.length === 0) {
                beforeEach(scenario.set);

                if (parents.length > 0) {
                    const parent = parents[0];
                    const partialParent = new Scenario(
                        null,
                        parent.childElements.slice(1),
                        parent.value(scenario),
                        parent.valid(scenario),
                        parent.set(scenario)
                    );
                    Enumerate.expandScenario(partialParent, validTestsFn, invalidTestsFn, parents.slice(1))
                } else {
                    const tests = scenario.valid ? validTestsFn : invalidTestsFn;
                    tests();
                }
            } else {
                const nextProperty = scenario.childElements[0];
                describe(nextProperty.desc, () => {
                    nextProperty.scenarios.map(subScenario =>
                        Enumerate.expandScenario(subScenario, validTestsFn, invalidTestsFn, [scenario, ...parents]));
                });
            }
        };

        const contents = scenario.desc ? () => describe(scenario.desc, wrapper) : wrapper;
        contents();
    }
}

module.exports = Enumerate;
