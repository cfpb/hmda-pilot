'use strict';

/**
 * Export button used on Error Summary and Error Detail views
 *
 * @namespace hmdaPilotApp
 * @module {Directive} HmdaExport
 */
module.exports = /*@ngInject*/ function(HMDAEngine) {

    // Adapted from http://stackoverflow.com/questions/24080018/download-file-from-a-asp-net-web-api-method-using-angularjs/24129082#24129082
    /* istanbul ignore next: treating this like a 3rd party plugin and only test that it does get called because mocking this would be INSANE */
    function download(data, filename) {
        var success = false,
            contentType = 'text/csv;charset=utf-8;',
            blob, url;

        try { // Try using msSaveBlob if supported

            blob = new Blob([data], {type: contentType});
            if (navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                // Try using other saveBlob implementations, if available
                var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                if (saveBlob === undefined) {
                    throw 'Not supported';
                }
                saveBlob(blob, filename);
            }
            success = true;
        } catch (e) {
            // pass
        }

        if (!success) {
            // Get the blob url creator
            var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;

            if (urlCreator) {
                // Try to use a download link
                var link = document.createElement('a');
                if ('download' in link) {
                    // Try to simulate a click
                    try {
                        // Prepare a blob URL
                        blob = new Blob([data], {type: contentType});
                        url = urlCreator.createObjectURL(blob);
                        link.setAttribute('href', url);

                        // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                        link.setAttribute('download', filename);

                        // Simulate clicking the download link
                        var event = document.createEvent('MouseEvents');
                        event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                        link.dispatchEvent(event);
                        success = true;
                    } catch (e) {
                        // pass through
                    }
                }

                if (!success) { // Fallback to window.location method
                    try {
                        // Prepare a blob URL
                        // Use application/octet-stream when using window.location to force download
                        blob = new Blob([data], {type: contentType});
                        url = urlCreator.createObjectURL(blob);
                        window.location = url;
                        success = true;
                    } catch (e) {
                        // Pass through
                    }
                }
            }
        }
        return;
    }

    function getFileDate() {
        function pad(number) {
            if (number < 10) {
                return '0' + number;
            }
            return number;
        }

        var now = new Date();
        return now.getFullYear() + pad(now.getMonth() + 1) + pad(now.getDate()) + pad(now.getHours()) + pad(now.getMinutes());
    }

    function exportAll(exportType, errorType) {
        HMDAEngine.exportTypePromise(errorType).then(function(content) {
            var filename = exportType + '-' + errorType + '-' + getFileDate() + '.csv';
            download(content, filename);
        });
    }

    function exportIndividual(exportType, errorType, editId) {
        HMDAEngine.exportIndividualPromise(errorType, editId).then(function(content) {
            var filename = exportType + '-' + errorType + '-' + editId + '-' + getFileDate() + '.csv';
            download(content, filename);
        });
    }

    function link(scope, element) {
        element.bind('click', function() {
            if (scope.exportType === 'all') {
                exportAll(scope.exportType, scope.errorType);
            } else if (scope.exportType === 'individual') {
                exportIndividual(scope.exportType, scope.errorType, scope.editId);
            }
            return;
        });
    }

    return {
        restrict: 'A',
        scope: {
            exportType: '@export',
            errorType: '@type',
            editId: '@'
        },
        link: link
    };
};
