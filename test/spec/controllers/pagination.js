'use strict';

require('angular');
require('angular-mocks');

describe('Controller: PaginationCtrl', function () {

    var scope;

    beforeEach(angular.mock.module('hmdaPilotApp'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.error = {
            errors: []
        };
        for (var i = 0; i < 100; i++) {
            scope.error.errors.push(i);
        }

        $controller('PaginationCtrl', {
            $scope: scope
        });
    }));

    describe('Initial scope', function() {
        it('should set the currentPage to 1', function() {
            expect(scope.currentPage).toBe(1);
        });

        it('should set the pageSize to 10', function() {
            expect(scope.pageSize).toBe(10);
        });
    });

    describe('start', function() {
        it('should return the offset index at which to begin displaying results on the current page', function() {
            expect(scope.start()).toBe(1);
            scope.currentPage = 3;
            expect(scope.start()).toBe(21);
        });
    });

    describe('end', function() {
        it('should return the final index to display on the current page of results', function() {
            expect(scope.end()).toBe(10);
            scope.pageSize = 30;
            expect(scope.end()).toBe(30);
            scope.currentPage = 2;
            expect(scope.end()).toBe(60);
        });

        it('should return the length of the errors if the end would otherwise be greater than it', function() {
            scope.currentPage = 20;
            expect(scope.end()).toBe(scope.error.errors.length);
        });
    });

    describe('total', function() {
        it('should return the length of the errors array', function() {
            expect(scope.total()).toBe(100);
        });

        it('should return 0 if there is no error object', function() {
            scope.error = null;
            expect(scope.total()).toBe(0);
        });

        it('should return 0 if the error object has no errors array', function() {
            scope.error = {};
            expect(scope.total()).toBe(0);
        });
    });

    describe('totalPages', function() {
        it('should return the total divided by the page size rounded up', function() {
            expect(scope.totalPages()).toBe(10);
            scope.pageSize = 33;
            expect(scope.totalPages()).toBe(4);
        });
    });

    describe('hasPrev', function() {
        it('should return false if on the first page', function() {
            expect(scope.hasPrev()).toBe(false);
        });

        it('should return true if not on the first page', function() {
            scope.currentPage = 2;
            expect(scope.hasPrev()).toBe(true);
        });
    });

    describe('onPrev', function() {
        it('should decrement the current page', function() {
            scope.currentPage = 5;
            scope.onPrev();
            expect(scope.currentPage).toBe(4);
        });
    });

    describe('hasNext', function() {
        it('should return true if there are more pages', function() {
            expect(scope.hasNext()).toBe(true);
        });

        it('should return false if on the last page', function() {
            scope.currentPage = 10;
            expect(scope.hasNext()).toBe(false);
        });
    });

    describe('onNext', function() {
        it('should increment the current page', function() {
            scope.currentPage = 5;
            scope.onNext();
            expect(scope.currentPage).toBe(6);
        });
    });

    describe('isLastPage', function() {
        it('should return true if on the last page', function() {
            scope.currentPage = 10;
            expect(scope.isLastPage()).toBe(true);
        });

        it('should return false if not on the last page', function() {
            expect(scope.isLastPage()).toBe(false);
        });
    });

    describe('setCurrentPage', function() {
        it('should set the current page to the given value', function() {
            expect(scope.currentPage).toBe(1);
            scope.setCurrentPage(7);
            expect(scope.currentPage).toBe(7);
        });
    });

    describe('setPageSize', function() {
        it('should set the page size to the given value', function() {
            expect(scope.pageSize).toBe(10);
            scope.setPageSize(20);
            expect(scope.pageSize).toBe(20);
        });
    });

    describe('showPagination', function() {
        it('should return true if there is more than one page', function() {
            expect(scope.showPagination()).toBe(true);
        });

        it('should return false if there is only one page', function() {
            scope.pageSize = 100;
            expect(scope.showPagination()).toBe(false);
        });
    });
});

