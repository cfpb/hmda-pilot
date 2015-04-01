#!/bin/bash

if [ "${TRAVIS_BRANCH}" == "master" ]; then
    grunt build:production
else
    grunt build
fi
