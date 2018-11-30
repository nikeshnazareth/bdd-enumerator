/**
 * A set of tests to confirm behaviour when the specific property is or is not a non-empty-string
 * @param propName the name of the property under test
 * @param propSetter a function that can be used to set the property
 * @param validTests tests to run when the property is a non-empty-string
 * @param invalidTests tests to run when the property is not a non-empty-string
 */
module.exports = (propName, propSetter, validTests, invalidTests) => [
    {desc: `${propName} is a number`, set: () => propSetter(1), tests: invalidTests},
    {desc: `${propName} is an empty string`, set: () => propSetter(''), tests: invalidTests},
    {desc: `${propName} is a non empty string`, set: () => propSetter('Arbitrary string'), tests: validTests}
];

