'use strict';

angular.module('services.config', [])
    .constant('Configuration', {
        apiUrl: '@@apiUrl',
        confirmSessionReset: @@confirmSessionReset
    });
