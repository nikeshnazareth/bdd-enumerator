/**
 * Produces options corresponding to all combinations of properties A and B with the additional
 * constraint that the situation is invalid when both A and B are defined
 * @param propA an object with the following properties:
 *   - optionGeneratorFn a function that produces test options for A. It is assumed that A is defined in all cases.
 *   - name the name of property A
 *   - setter a function that can be used to set the property A
 * @param propB an equivalent object for property B
 * @param validTests tests to run when the defined property is valid, or neither property is defined
 * @param invalidTests tests to run when the defined property is invalid, or both properties are defined
 */
module.exports = (propA, propB, validTests, invalidTests) => {
    const A_defined = propA.optionGeneratorFn(propA.name, propA.setter, validTests, invalidTests);
    const B_defined = propB.optionGeneratorFn(propB.name, propB.setter, validTests, invalidTests);

    const A_undefined_B_defined = B_defined.map(option =>
        Object.assign({}, option, {desc: `${propA.name} is undefined; ${option.desc}`})
    );
    const A_defined_B_undefined = A_defined.map(option =>
        Object.assign({}, option, {desc: `${option.desc}; ${propB.name} is undefined`})
    );

    const both_defined = A_defined.map(A_option =>
        B_defined.map(B_option => ({
            desc: `${A_option.desc}; ${B_option.desc}`,
            set: () => {
                A_option.set();
                B_option.set();
            },
            tests: invalidTests
        }))
    ).reduce((arr0, arr1) => arr0.concat(arr1));

    return A_undefined_B_defined.concat(A_defined_B_undefined).concat(both_defined);
};