var index_app = angular.module('angular', [
  'ngRoute']);

index_app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/basic', {
        templateUrl: 'basic.html',
        controller: 'basic_controller'
      }).
      when('/advance', {
        templateUrl: 'advance.html',
        controller: 'advance_controller'
      }).
      otherwise({
        redirectTo: '/#'
      });
}]);