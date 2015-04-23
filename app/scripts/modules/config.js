'use strict';

/**
 * An Angular constant is used to configure elements of the application. Combined with
 * a Grunt task, this allows for per-enviroment configurations to be defined and deployed
 * with each build.
 *
 * @module Configuration
 *
 * @property {string}  apiUrl The URL for the HMDA Edit Check API. Note that in
 * order to avoid CORS errors, the HMDA Pilot and the API **MUST** be hosted
 * under the same domain.
 *
 * @property {boolean} confirmSessionReset Determines if a confirmation dialog
 * should be displayed when an action is taken by the user that might destroy
 * information contained within the current session.
 *
 * @property {object}  progressDialog Configuration options used by the progress
 * dialog. See [ngDialog](https://github.com/likeastore/ngDialog) for more options.
 */
angular.module('services.config', [])
    .constant('Configuration', {
        apiUrl: 'http://dev.hmda-pilot.ec2.devis.com/api',
        confirmSessionReset: true,
        progressDialog: {
            name: 'progress',
            controller: 'ProgressBarCtrl',
            template: 'partials/progressBar.html',
            showClose: false,
            closeByDocument: false,
            closeByEscape: false
        }
    });
