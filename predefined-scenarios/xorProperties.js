const Scenario = require('../scenario');

/**
 * Attaches two properties to a base object and ensures that exactly one is valid and defined
 * @param baseObjFn a function that returns the object to be modified
 * @param propertyA the Dependent object associated with the first property
 * @param propertyB the Dependent object associated with the second property
 */
const XorProperties = (baseObjFn, propertyA, propertyB) =>
    new Scenario(
        null,
        [propertyA, propertyB],
        A => B => undefined,
        A => B => ((A.value === undefined) ^ (B.value === undefined)) && A.valid && B.valid,
        A => B => () => {
            const baseObj = baseObjFn();

            if (A.value !== undefined)
                baseObj[propertyA.desc] = A.value;
            else
                delete baseObj[propertyA.desc];

            if (B.value !== undefined)
                baseObj[propertyB.desc] = B.value;
            else
                delete baseObj[propertyB.desc];
        }
    );

module.exports = XorProperties;