const SimpleScenario = require('../simpleScenario');
const Scenario = require('../scenario');
const ChildElement = require('../childElement');

const NonEmptyArray = (itemScenarios) => [
    new SimpleScenario('is a string', 'Arbitrary string', false),
    new SimpleScenario('is a number', 1, false),
    new SimpleScenario('is an empty array', [], false),
    new Scenario(
        'has a single element',
        [new ChildElement('element', itemScenarios)],
        element => [element.value],
        element => element.valid,
        () => undefined
    ),
    new Scenario(
        'has two elements',
        [new ChildElement('first element', itemScenarios), new ChildElement('second element', itemScenarios)],
        first => second => [first.value, second.value],
        first => second => first.valid && second.valid,
        () => undefined
    )
];

module.exports = NonEmptyArray;