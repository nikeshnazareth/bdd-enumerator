# BDD Enumerator

## Overview

Often, my BDD (mocha or jasmine) unit tests involve running similar tests with minor tweaks.

Depending on the complexity, this can either involve manually duplicating and tweaking individual tests,
or enumerating over ever-increasing-in-complexity-and-recursion functions to generate the tests.

This project is intended to simplify the second method, and increase code clarity, by abstracting and reusing
the enumeration logic.
