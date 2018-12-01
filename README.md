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
* `set`: a function that produces the situation under test
* `valid`: whether or not the scenario is valid ( ie. which set of tests to run )

In many cases, you can generate scenarios using a predefined function.

For example,
```javascript
let myString;
const myStringScenarios = Enumerator.property.type.nonEmptyString(
  'myString', // the name of the property
  (val) => { myString = val }, // a setter function 
);
```
  
Enumerate over the scenarios
```javascript
// create BDD test blocks in place
const validTestsFn = () => { ... }; // any tests to be run in valid scenarios
const invalidTestsFn = () => { ... }; // any tests to be run in invalid scenarios
Enumerator.enumerate(myStringScenarios, validTestsFn, invalidTestsFn); 
```

### Predefined Scenarios

#### Primitive type-checking
* `property.type.nonEmptyString`
* `property.type.positiveNumber`

#### Presence
* `property.presence.required`
* `property.presence.optional`

These are wrappers around scenarios to create a new scenario for when the property is undefined.

For example,
```javascript
// using the myStringScenarios object from the Usage example
const augmentedScenarios = Enumerator.property.presence.required(myStringScenarios); 
Enumerator.enumerate(augmentedScenarios, validTestsFn, invalidTestsFn);
```

#### Composition
* `property.composition.mutuallyExclusive`

Produces scenarios corresponding to all combinations of two properties 
where the scenario is invalid if both properties are defined

For example
```javascript
const foo = Enumerator.property.type.nonEmptyString( ... );
const bar = Enumerator.property.type.positiveNumber( ... );
const combinedScenarios = Enumerator.property.composition.mutuallyExclusive(foo, bar);
Enumerator.enumerate(combinedScenarios, validTestsFn, invalidTestsFn);
```