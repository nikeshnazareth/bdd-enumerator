/**
 * Add a test to the result of optionGeneratorFn to confirm behaviour when the property is undefined
 * @param optionGeneratorFn a function that produces test options using the remaining arguments
 * @param propName the name of the property under test
 * @param propSetter a function that can be used to set the property
 * @param validTests tests to run when the property is valid (or undefined)
 * @param invalidTests tests to run when the property is not valid
 */
module.exports = (optionGeneratorFn, propName, propSetter, validTests, invalidTests) => {
    const options = optionGeneratorFn(propName, propSetter, validTests, invalidTests);
    options.unshift({desc: `${propName} is undefined`, set: () => null, tests: validTests});
    return options;
};
