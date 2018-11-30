/**
 * For each option:
 *   - create a 'describe' block
 *   - call 'set'
 *   - executes tests()
 * @param options an array of options where each option is an object with the properties
 *   - desc: the description the scenario (the title of the describe block)
 *   - set: a function that instantiates the scenario
 */
module.exports = (options) => {
    options.map(option => {
        describe(option.desc, () => {
            beforeEach(() => option.set());

            option.tests();
        });
    });
};

