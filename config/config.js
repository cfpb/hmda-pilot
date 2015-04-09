'use strict';

angular.module('services.config', [])
    .constant('Configuration', {
        apiUrl: '@@apiUrl',
        confirmSessionReset: @@confirmSessionReset,
        progressDialog: {
            name: 'progress',
            controller: 'ProgressBarCtrl',
            template: 'partials/progressBar.html',
            showClose: false,
            closeByDocument: false,
            closeByEscape: false,
        }
    });
