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

    static expandScenario(scenario, validTestsFn, invalidTestsFn) {
        describe(scenario.desc, () => {
            if (scenario.childElements.length === 0) {
                beforeEach(() => scenario.set());
                const tests = scenario.valid ? validTestsFn : invalidTestsFn;
                tests();
            } else {
                const firstChild = scenario.childElements[0];
                describe(firstChild.desc, () => {
                    firstChild.scenarios.map(childOption => {
                        const expandedScenario = new Scenario(
                            childOption.desc,
                            scenario.childElements.slice(1),
                            scenario.value(childOption),
                            scenario.valid(childOption),
                            scenario.set(childOption)
                        );
                        Enumerate.expandScenario(expandedScenario, validTestsFn, invalidTestsFn);
                    })
                });
            }
        });
    }
}

module.exports = Enumerate;
