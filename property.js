const ComplexScenario = require('./complex-scenario/complexScenario');
const ChildElement = require('./complex-scenario/childElement');

const Property = (name, baseObjectFn, scenarios) =>
    new ComplexScenario(
        'property',
        [new ChildElement(name, scenarios)],
        scenario => undefined,
        scenario => scenario.valid,
        scenario => {
            if (scenario.value !== undefined) {
                const baseObj = baseObjectFn();
                baseObj[name] = scenario.value;
            }
        },
    );

module.exports = Property;