# BDD Enumerator

## Overview

Often, my BDD (mocha or jasmine) unit tests involve running similar tests with minor tweaks.

Depending on the complexity, this can either involve manually duplicating and tweaking individual tests,
or enumerating over ever-increasing-in-complexity-and-recursion functions to generate the tests.

This project is intended to simplify the second method, and increase code clarity, by abstracting and reusing
the enumeration logic.

## Usage

1. Clone this repo into your project
```
git submodule add https://github.com/nikeshnazareth/bdd-enumerator
```
  
  
1. Add the enumerator module to your test file
```javascript
const Enumerator = require ('bdd-enumerator.module')
```
  
1. Instantiate the options
```javascript
// For example
let myString;
const options = Enumerator.options.type.nonEmptyString(
  'myString', // the name of the property
  (val) => { myString = val }, // a setter function 
  () => { ... }, // any tests that should be run when myString is a non-empty string
  () => { ... } // any tests that should be run when myString is not a non-empty string
)
```
  
1. Enumerate over the options
```javascript
  Enumerator.enumerate(options) // creates BDD test blocks in place
```