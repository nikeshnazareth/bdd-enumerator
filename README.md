# BDD Enumerator

## Overview

Often, my BDD (mocha or jasmine) unit tests involve running similar tests with minor tweaks.

Depending on the complexity, this can either involve manually duplicating and tweaking individual tests,
or enumerating over ever-increasing-in-complexity-and-recursion functions to generate the tests.

This project is intended to simplify the second method, and increase code clarity, by abstracting and reusing
the enumeration logic.

## Usage

Clone this repo into your project
```
git submodule add https://github.com/nikeshnazareth/bdd-enumerator
```
  
  
Add the enumerator module to your test file
```javascript
const Enumerator = require ('bdd-enumerator/module');
```
  
Create an array of `Scenario` classes with the properties
* `desc`: a description of the use case (the title of the describe block)
* `value`: the value of the property under test
* `valid`: whether or not the scenario is valid ( ie. which set of tests to run )

This project contains some predefined scenarios that can be used. 

For example,
```javascript
const myStringScenarios = Enumerator.property.type.nonEmptyString
```

Specify which property should be modified when iterating through the scenarios.
Note that the base object is identified through a function, because it may not be defined before the test begins.
```javascript
const baseObj; // the object to be modified. Each test will set baseObj.myProp to the scenario value
// for deeper properties, describe the path using dot notation (eg. firstlevel.intermediate.myProp)
const myProp = new Enumerator.property('myProp', () => baseObj, myStringScenarios);
```
  
Enumerate over the scenarios
```javascript
// create BDD test blocks in place
const validTestsFn = () => { ... }; // any tests to be run in valid scenarios
const invalidTestsFn = () => { ... }; // any tests to be run in invalid scenarios
Enumerator.enumerate.simple(myProp, validTestsFn, invalidTestsFn); 
```

### Predefined Scenarios

#### Primitive type-checking
##### `scenario.nonEmptyString`
#####`scenario.positiveNumber`

#### Presence
#####`scenario.presence.required(scenarios)`
#####`scenario.presence.optional(scenarios)`

These are wrappers around scenarios to add a new scenario for when the property is undefined.

For example,
```javascript
// [ using myStringScenarios from above ]
const augmentedScenarios = Enumerator.scenario.presence.required(myStringScenarios); 
Enumerator.enumerate(augmentedScenarios, validTestsFn, invalidTestsFn);
// as above...
const myProp = new Enumerator.property('myProp', () => baseObj, augmentedScenarios);
Enumerator.enumerate.simple(myProp, validTestsFn, invalidTestsFn); 
```

### Enumeration
#### `enumerate.simple(property, validTestFn, invalidTestsFn)`

Iterate directly over a single property's scenarios to produce BDD tests. Specifically:
1. It creates a describe block for the property
1. It creates a sub-describe block for each scenario where:
   1. the scenario is instantiated
   1. `validTestsFn` is run if the scenario is valid
   1. `invalidTestsFn` in run if the scenario is invalid

#### `enumerate.mutex(propertyA, propertyB, validTestsFn, invalidTestsFn)`

Creates tests for all combinations of two mutually exclusive properties 
( the scenario is invalid if both properties are defined )

This function assumes that both property arguments are defined in all of their scenarios
(ie. neither `scenario.presence.required` nor `scenario.presence.optional` were used to create the scenarios)
and it adds additional scenarios for when either or both of them are undefined.

For example
```javascript
const foo = new Enumerator.property('foo', () => baseObj, Enumerator.scenario.nonEmptyString);
const bar = new Enumerator.property('foo', () => baseObj, Enumerator.scenario.positiveNumber);
Enumerator.enumerate.mutex(foo, bar, validTestsFn, invalidTestsFn);
```

This produces the following structure:
1. A single test where both properties are undefined

1. A describe block when property A is undefined which contains a block of tests for all property B scenarios 

   (`validTestsFn` or `invalidTestsFn` is run, depending on the validity of property B)
   
1. A describe block when property B is undefined which contains a block of tests for all property A scenarios 

   (`validTestsFn` or `invalidTestsFn` is run, depending on the validity of property A)
   
1. All combinations of property A and property B when they are both defined, and `invalidTestsFn` is run every time