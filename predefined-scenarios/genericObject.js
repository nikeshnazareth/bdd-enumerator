const Scenario = require('../scenario');

const combineChildren = (properties, accumulator) =>
    properties.length === 0 ?
        accumulator :
        scenario => {
            const result = Object.assign({}, accumulator);
            result[properties[0]] = scenario.value;
            return combineChildren(properties.slice(1), result);
        };

const allValid = (N, valid) =>
    N === 0 ?
        valid :
        scenario => allValid(N - 1, valid && scenario.valid);

const resolveToUndefined = (N) =>
    N === 0 ?
        () => undefined :
        () => resolveToUndefined(N - 1);


const GenericObject = (childElements) => [
    new Scenario(
        null,
        childElements,
        combineChildren(childElements.map(element => element.desc), {}),
        allValid(childElements.length, true),
        resolveToUndefined(childElements.length)
    )
];

module.exports = GenericObject;