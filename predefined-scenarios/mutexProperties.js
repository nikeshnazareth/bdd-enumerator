const Scenario = require('../scenario');

const MutexProperties = (baseObjFn, childElementA, childElementB) =>
    new Scenario(
        null,
        [
            childElementA,
            childElementB
        ],
        A => B => undefined,
        A => B => (A.value === undefined && B.valid) || (B.value === undefined && A.valid),
        A => B => () => {
            const baseObj = baseObjFn();
            A.set();
            B.set();
            if (A.value !== undefined)
                baseObj[childElementA.desc] = A.value;
            if (B.value !== undefined)
                baseObj[childElementB.desc] = B.value;
        }
    );

module.exports = MutexProperties;