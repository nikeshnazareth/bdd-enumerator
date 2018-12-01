const Scenario = require('./scenario');

/**
 * A class that composes tests associated with sub-properties into more complicated scenarios
 */
class Composition {

    /**
     * @param propertyA any property where the property is defined in all scenarios
     * @param propertyB any property where the property is defined in all scenarios
     * @returns an array of scenarios corresponding to the combinations:
     *   - only propertyA is defined ( equivalent to propertyA.scenarios with a modified description )
     *   - only propertyB is defined ( equivalent to propertyB.scenarios with a modified description )
     *   - both properties are defined ( invalid )
     */
    static mutuallyExclusive(propertyA, propertyB) {
        const A_defined_B_undefined = propertyB.scenarios.map(scenario =>
            new Scenario(`${propertyA.name} is undefined; ${scenario.desc}`, scenario.set, scenario.valid)
        );

        const B_defined_A_undefined = propertyA.scenarios.map(scenario =>
            new Scenario(` ${scenario.desc}; ${propertyB.name} is undefined`, scenario.set, scenario.valid)
        );

        const both_defined = propertyA.scenarios.map(A_scenario =>
            propertyB.scenarios.map(B_scenario => new Scenario(
                `${A_scenario.desc}; ${B_scenario.desc}`,
                () => {
                    A_scenario.set();
                    B_scenario.set();
                },
                false
            ))
        ).reduce((L0, L1) => L0.concat(L1));

        return [
            ...A_defined_B_undefined,
            ...B_defined_A_undefined,
            ...both_defined
        ];
    }
}

module.exports = Composition;