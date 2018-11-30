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
const Enumerator = require ('bdd-enumerator.module');
```
  
Create an array of options, each with the properties
* `desc`: a description of the user case (the title of the describe block)
* `set`: a function that produces the situation under test
* `tests`: the tests to run under this situation

In many cases, you can generate options using a predefined function.

For example,
```javascript
let myString;
const options = Enumerator.options.type.nonEmptyString(
  'myString', // the name of the property
  (val) => { myString = val }, // a setter function 
  () => { ... }, // any tests that should be run when myString is a non-empty string
  () => { ... } // any tests that should be run when myString is not a non-empty string
);
```
  
Enumerate over the options
```javascript
  Enumerator.enumerate(options); // creates BDD test blocks in place
```

### Predefined Options

#### Primitive type-checking
* `options.type.nonEmptyString`
* `options.type.positveNumber`

#### Required / Optional
* `options.type.required`
* `options.type.optional`

These are wrappers around other functions to create a new test for when the property is undefined.

For example,
```javascript
const Enumerator = require ('bdd-enumerator.module');

let myString;
const options = Enumerator.options.type.optional(
  Enumerator.options.type.nonEmptyString,
  'myString', // the name of the property
  (val) => { myString = val }, // a setter function 
  () => { ... }, // any tests that should be run when myString is a non-empty string OR UNDEFINED
  () => { ... } // any tests that should be run when myString is not a non-empty string
)
```