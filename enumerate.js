const Scenario = require('./scenario');
const ComplexScenario = require('./complex-scenario/complexScenario');

/**
 * A class that accepts properties and expands the possible options into a set of BDD tests
 */
class Enumerate {

    /**
     * Directly expand the single property scenarios into a set of tests for that property
     * @param property the property under test
     * @param validTestsFn the tests to run when the property is valid
     * @param invalidTestsFn the tests to run when the property is invalid
     */
    static simple(property, validTestsFn, invalidTestsFn) {
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

                    const tests = scenario.valid ? validTestsFn : invalidTestsFn;
                    tests();
                });
            });
        });
    }

    /**
     * Create tests for all combinations of two property scenarios where the combination
     * is invalid if both properties are defined
     * @param propA the first property under test ( any property that is defined in all scenarios )
     * @param propB the second property under test ( any property that is defined in all scenarios )
     * @param validTestsFn the tests to run when both properties are undefined, or one is defined and valid
     * @param invalidTestsFn the tests to run when the defined property is invalid, or both are defined
     */
    static mutex(propA, propB, validTestsFn, invalidTestsFn) {
        describe(`${propA.name} and ${propB.name} are both undefined`, validTestsFn);
        describe(`${propA.name} is undefined`, () => Enumerate.simple(propB, validTestsFn, invalidTestsFn));
        describe(`${propB.name} is undefined`, () => Enumerate.simple(propA, validTestsFn, invalidTestsFn));
        const invalidInnerFn = () => Enumerate.simple(propB, invalidTestsFn, invalidTestsFn);
        Enumerate.simple(propA, invalidInnerFn, invalidInnerFn);
    }

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

    /**
     * Recursively expand all property scenarios into a set of tests for the property
     * @param property the property under test
     * @param validTestsFn the tests to run when the property is valid
     * @param invalidTestsFn the tests to run when the property is invalid
     */
    static complex(property, validTestsFn, invalidTestsFn) {
        describe(property.name, () => {
            property.scenarios.map(scenario => Enumerate.expandScenario(property, scenario, validTestsFn, invalidTestsFn));
        });
    }

    static expandScenario(scenario, validTestsFn, invalidTestsFn) {
        describe(scenario.desc, () => {
            if (scenario.childElements.length === 0) {
                beforeEach(scenario.set);
                const tests = scenario.valid ? validTestsFn : invalidTestsFn;
                tests();
            } else {
                const firstChild = scenario.childElements[0];
                describe(firstChild.desc, () => {
                    firstChild.scenarios.map(childOption => {
                        const expandedScenario = new ComplexScenario(
                            childOption.desc,
                            scenario.childElements.slice(1),
                            scenario.value(childOption),
                            scenario.valid(childOption),
                            () => {
                                childOption.set();
                                scenario.set(childOption);
                            }
                        );
                        Enumerate.expandScenario(expandedScenario, validTestsFn, invalidTestsFn);
                    })
                });
            }
        });
    }
}

module.exports = Enumerate;
