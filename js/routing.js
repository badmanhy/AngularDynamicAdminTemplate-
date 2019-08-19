'use strict'

angular.module('Routing', ['ui.router'])
    .provider('router', function ($stateProvider) {
        var urlCollection;
        this.$get = function ($http, $state) {
            return {
                setUpRoutes: function () {

                    $http.get(urlCollection).success(function (collection) {
                        for (var routeName in collection) {
                            if (!$state.get(routeName)) {
                                var objects = collection[routeName];
                                $stateProvider.state(
                                   objects.action,
                                    //collection[routeName],
                                    {
                                        url: objects.url,// "/" + routeName,
                                        //controller: routeName,
                                        templateUrl: objects.templateUrl,//'views/acount/account.html',
                                        date: objects.templateJs,
                                        resolve:
                                            {
                                                deps: ['$rootScope', "$ocLazyLoad", function ($rootScope, $ocLazyLoad) {

                                                    $rootScope.objectJS = [];
                                                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                                                        console.log('successfully changed states');

                                                        console.log('toState', toState);
                                                        $rootScope.objectJS = toState.date;
                                                        //return 
                                                        //$ocLazyLoad.load([
                                                        //{
                                                        //    name: 'vendors',
                                                        //    insertBefore: '#app-level-js',
                                                        //    files: $rootScope.objectJS
                                                        //}]);
                                                    });
                                                    return $ocLazyLoad.load($rootScope.objectJS);
                                                }]
                                                //,deps1: ['$rootScope', "$ocLazyLoad", function ($rootScope, $ocLazyLoad, deps) {

                                                //    return $ocLazyLoad.load($rootScope.objectJS);
                                                //}]
                                            }
                                    }

                                );
                            }
                        }
                    });
                }
            }
        };


        this.setCollectionUrl = function (url) {
            urlCollection = url;
        }
    })

//.run(function (router) {

//    router.setUpRoutes();
//})
