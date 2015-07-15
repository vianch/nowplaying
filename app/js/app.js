import angular from 'angular';
import 'angular-route';

angular.module('NowPlayingApp', ['ngRoute'])
    .config(['$routeProvider',function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/pages/home.html'
            })
            .otherwise({ redirectTo: '/' });
}]);
