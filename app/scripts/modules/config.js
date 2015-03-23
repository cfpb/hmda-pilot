'use strict';

angular.module('services.config', [])
    .constant('Configuration', {
        apiUrl: 'http://localhost:8000',
        confirmSessionReset: false
    });
