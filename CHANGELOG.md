# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) 
and this project adheres to [Semantic Versioning](http://semver.org/).

## 0.4.0 - UNRELEASED

### Changed

* Replaced Unidragger with AllowFinger, that provides more touch capacities, such pinch.
* API change: removed `drag()` and create `touch()` and `untouch()`
* `reset()` no longer unbind touch events. Use `untouch()`.

### Added

* New method `limits()` to define the transform limits (for example: min/max scale)

## 0.3.0 - 2017-06-05

### Changed

* API change: removed `zoom` method for more flexibility. Added the methods `transform()`, `drag()` and `reset()`.
* Removed the events support, since the unique event provided (zoom) was deleted.

### Fixed

* Keep the translate position on zoom the elements

## 0.2.1 - 2017-06-04

### Fixed

* Improved demo
* Improved README

## 0.2.0 - 2017-06-03

### Changed

* Write the code to ES6 and use Babel

## 0.1.0 - 2017-06-03

First version with basic features
