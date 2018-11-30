/**
 * A set of tests to confirm behaviour when the specific property is or is not a positive number
 * @param propName the name of the property under test
 * @param propSetter a function that can be used to set the property
 * @param validTests tests to run when the property is a positive number
 * @param invalidTests tests to run when the property is not a non-empty-string
 */
module.exports = (propName, propSetter, validTests, invalidTests) => [
    {desc: `${propName} is a string`, set: () => propSetter('Arbitrary string'), tests: invalidTests},
    {desc: `${propName} is negative number`, set: () => propSetter(-1), tests: invalidTests},
    {desc: `${propName} is zero`, set: () => propSetter(0), tests: invalidTests},
    {desc: `${propName} is one`, set: () => propSetter(1), tests: validTests},
    {desc: `${propName} is another positive integer`, set: () => propSetter(2), tests: validTests},
    {desc: `${propName} is a positive fraction`, set: () => propSetter(2.6), tests: validTests}
];
