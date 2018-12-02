const Scenario = require('../scenario');
const ChildElement = require('../childElement');

const Property = (name, baseObjectFn, scenarios) =>
    new Scenario(
        'property',
        [new ChildElement(name, scenarios)],
        child => undefined,
        child => child.valid,
        child => () => {
            if (child.value !== undefined) {
                const baseObj = baseObjectFn();
                baseObj[name] = child.value;
            }
        },
    );

module.exports = Property;