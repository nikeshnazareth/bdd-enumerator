const Scenario = require('../scenario');
const ComplexScenario = require('../complex-scenario/complexScenario');
const ChildElement = require('../complex-scenario/childElement');

const NonEmptyArray = (itemScenarios) => [
    new Scenario('is a string', 'Arbitrary string', false),
    new Scenario('is a number', 1, false),
    new Scenario('is an empty array', [], false),
    new ComplexScenario(
        'has a single element',
        [new ChildElement('element', itemScenarios)],
        element => [element.value],
        element => element.valid
    ),
    new ComplexScenario(
        'has two elements',
        [new ChildElement('first element', itemScenarios), new ChildElement('second element', itemScenarios)],
        first => second => [first.value, second.value],
        first => second => first.valid && second.valid
    )
];

module.exports = NonEmptyArray;