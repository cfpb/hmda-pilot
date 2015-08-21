# HMDA Pilot

[![Build Status](https://travis-ci.org/cfpb/hmda-pilot.svg)](https://travis-ci.org/cfpb/hmda-pilot)
[![Coverage Status](https://coveralls.io/repos/cfpb/hmda-pilot/badge.svg)](https://coveralls.io/r/cfpb/hmda-pilot)

## This project is a work in progress

Nothing presented in the issues or in this repo is a final product unless it is marked as such.

**Description**: The HMDA Pilot provides a client side tool to perform validation, error checking and reporting of HMDA submitted files for the current conditions, by following the specifications found on the [FFIEC](http://www.ffiec.gov/hmda) website. In particular, it implements the file specification and most of the edit checks for 2014.

## Additional Information

* [About the HMDA Pilot](ABOUT.md)
* [Common Questions](COMMON_QUESTIONS.md)
* [Developer Docs](DEVELOPERS.md)

## Requirements

The project requires [NodeJS](http://nodejs.org) (npm) to build and manage dependencies and the [HMDA Edit Check API](https://github.com/cfpb/hmda-edit-check-api).

Technologies used include [AngularJS](http://angularjs.org), [Browserify](http://browserify.org), [Grunt](http://gruntjs.com), and the [Capital Framework](http://cfpb.github.io/capital-framework/).

## How to get this running or how to use it

### First Steps

1. Make sure you have [NodeJS](https://nodejs.org) installed (currently, version 0.10.33), and you can use the `npm` command:
    ```shell
    $ npm version
    ```
1. Install [Grunt](http://gruntjs.com) globally:
    ```shell
    $ npm install -g grunt-cli
    ```
1. Then install dependencies from the project root directory:
    ```shell
    $ npm install
    ```
1. Running the tests:
    ```shell
    $ grunt test
    ```
1. Download or clone the HMDA Edit Check API and following the instructions for [running the API locally](https://github.com/cfpb/hmda-edit-check-api#running-locally) or for using the Docker container.

### Running locally

Start the server with a grunt task:

```shell
$ grunt serve
```

This will make the application listen on `localhost:8000` for requests, and will watch the source code for changes and reload the application as necessary.

### Deploying

The HMDA Pilot is currently configured to run in a local, development and production environments. Each environment is configured by a JSON file located in `config/environments` which is then included in then copied into the app during build time via a grunt task. By default, the HMDA Pilot is configured to run locally.

To build the HMDA Pilot for deployment

```shell
$ grunt build
```

By default, this will build the HMDA Pilot for deployment to a development server. An optional environment target may be submitted to the build task that matches the filename of an environment configuration. For example,

```shell
$ grunt build:production
```

Would build the application for deployment to a production environment using the `config/environments/production.json` for the config file.

Now you can run a grunt task to build an archive of the application:

```shell
$ grunt zip
```

This task produces `dist/hmda-pilot.zip`, which can then be deployed by your continuous integration platform, or manually deployed into your server environment.

### Using Docker

You can also deploy using a Docker container. You can simply run the `build-docker-container.sh` script to build the container image, or, use the following steps:

```shell
$ grunt build:docker
$ docker build -t hmda-pilot .
```

Now that you have a container image, you have to run it. This requires setting some environment variables for the container:
 - `HMDA_PILOT_API_HOST`
 - `HMDA_PILOT_API_PORT`
These environment variables configure the proxy configuration in `nginx` to point to the proper API to alleviate issues with CORS (Cross-Origin Resource Sharing) requests, so that the API is accessible via the same URL as the pilot.

An example of using these variables in your run looks like:
```
docker run -d --name hmda-pilot -p 80:80 -e "HMDA_PILOT_API_HOST=my.api.server" -e "HMDA_PILOT_API_PORT=8000" hmda-pilot
```

You can also use the `run-docker-container.sh` script, which will use Docker `--link` to run the API and the pilot on the same machine and automatically configures the envrironment variables for you.

#### Per-Environment Configuration

The HMDA Pilot is currently configured to build and deploy to a Development and Production instance. The config files are written in JSON notation and are located in `config/environments`. Currently, the most important feature of the configuration files is the `apiUrl` which specifies the URL where the HMDA Edit Check API is currently running. This information is required by the application to avoid [CORS](http://enable-cors.org/) errors when the UI tries to talk to the API.

## Documentation

Documentation of is maintained within the source code using [JSDoc](http://usejsdoc.org/) tags within JavaScript block comments.

To generate the documentation, run the grunt task:

```shell
$ grunt generate-docs
```

You can then open `./docs/index.html` in your browser to view the documentation.

## Functional Tests

HMDA Pilot includes a suite of functional tests written using [Cucumber](https://cukes.info/docs/reference#gherkin) and run via [Protractor](http://angular.github.io/protractor/#/), an end-to-end testing tool for AngularJS.

### Configuring the functional tests

To run the tests in a different browser or change the base URL used by the functional tests, you must update the appropriate sections of `test/functional/conf.js`.

### Running the functional tests locally

To run the functional tests,

```shell
$ grunt functional
```

This will run the tests against the DEV environment in Google Chrome.

### Running the functional tests via SauceLabs

To run the functional tabs via SauceLabs, you'll first need a SauceLabs account. Once you have one then you'll need to export your username and accesskey as local variables before running the grunt task.

```shell
$ export SAUCE_USERNAME=<Username>
$ export SAUCE_ACCESS_KEY=<Accesskey>
$ grunt functional:sauceLabs
```

### Running the edit check functional tests

The functional testing framework has also been setup to test edit checks themselves by testing to make sure that known errors appear with a given DAT files. To run these tests use the following

```shell
$ grunt functional:editChecks
```

This will run the edit check tests locally against the DEV environment in Google Chrome.

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
3. Books, papers, talks, or other sources that have meaningful impact or influence on this project
