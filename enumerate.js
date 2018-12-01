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
                            const obj = property.baseObjFn();
                            obj[property.name] = scenario.value;
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
}

module.exports = Enumerate;
