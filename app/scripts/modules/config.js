'use strict';

angular.module('services.config', [])
    .constant('Configuration', {
        apiUrl: 'http://localhost:8000',
        confirmSessionReset: false,
        progressDialog: {
            name: 'progress',
            controller: 'ProgressBarCtrl',
            template: 'partials/progressBar.html',
            showClose: false,
            closeByDocument: false,
            closeByEscape: false,
        }
    });
