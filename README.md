# HMDA Pilot

[![Build Status](https://travis-ci.org/cfpb/hmda-pilot.svg)](https://travis-ci.org/cfpb/hmda-pilot)
[![Coverage Status](https://coveralls.io/repos/cfpb/hmda-pilot/badge.svg)](https://coveralls.io/r/cfpb/hmda-pilot)

## This project is a work in progress
Nothing presented in the issues or in this repo is a final product unless it is marked as such.

**Description**:  The HMDA Pilot provides a client side tool to perform validation, error checking and reporting
of HMDA submitted files for the current conditions, by following the specifications found on the [FFIEC](http://www.ffiec.gov/hmda)
website. In particular, it implements the file specification and most of the edit checks for 2014.

## Requirements

The project requires [NodeJS](http://nodejs.org) (npm) to build and manage dependencies.

Technologies used include [AngularJS](http://angularjs.org), [Browserify](http://browserify.org), [Grunt](http://gruntjs.com), and the [Capital Framework](http://cfpb.github.io/capital-framework/).


## How to get this running or how to use it

Make sure you have [NodeJS](https://nodejs.org) installed (version 0.10.33), and you can use the `npm` command:

```shell
npm version
```

Install [Grunt](http://gruntjs.com) globally:

```shell
npm install -g grunt-cli
```

Then install dependencies from the project root directory:

```shell
npm install
```

### Running locally

Run locally by issuing:

```shell
grunt serve
```

### On your own server
To use on your own server:

```shell
grunt build
```

Copy the files in `dist` to your web server root

## Documentation

Documentation of is maintained within the source code using [JSDoc](http://usejsdoc.org/) tags within JavaScript block comments.

To generate the documentation, run the grunt task:
```shell
$ grunt generate-docs
```

You can then open './docs/index.html' in your browser to view the documentation.

## Getting involved

For details on how to get involved, please first read our [CONTRIBUTING](CONTRIBUTING.md) guidelines.
This project follows an adapted pull request [workflow](https://github.com/cfpb/hmda-pilot/wiki/GitHub-workflow) on top of GitHub, please consult the details before adding features to the project.


----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)


----

## Credits and references

1. Projects that inspired you
2. Related projects
3. Books, papers, talks, or other sources that have meaniginful impact or influence on this project
