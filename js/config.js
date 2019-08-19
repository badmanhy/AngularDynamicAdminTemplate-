var serviceBase = 'http://localhost:27832/'
BadManAdmin
.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
})
.provider('router', function ($stateProvider) {
    var urlCollection;
    this.getTemplateJs
    var data = { "pageIndex": 1, "pageSize": 100 };
    this.$get = function ($http, $state) {
        return {
            setUpRoutes: function () {
                $http.post(serviceBase + "GetAccountMapMenuListStateProvider", data).success(function (collection) {
                    //$http.get(urlCollection).success(function (collection) {
                    for (var routeName in collection.data) {
                        if (!$state.get(routeName)) {
                            var objects = collection.data[routeName];
                            var objectJS = [];
                            var objectNullJS = ["js/controllers/table.js"];
                            $stateProvider.state(
                               objects.actionUrl,
                                //collection[routeName],
                                {
                                    url: objects.actionMenu,// "/" + routeName,
                                    //controller: routeName,
                                    templateUrl: objects.templateUrl,//'views/acount/account.html',
                                    date: objects.templateJs,
                                    resolve:
                                        {
                                            deps: ['$rootScope', "$ocLazyLoad", function ($rootScope, $ocLazyLoad) {

                                                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                                                    console.log('==================');
                                                    objectJS = toState.date == null ? objectNullJS : toState.date;
                                                    //console.log(toState);
                                                });
                                                var arr = objectJS.split(',');
                                                //var objectJSArray = new Array();

                                                return $ocLazyLoad.load([
                                                {
                                                    name: 'vendors',
                                                    insertBefore: '#app-level-js',
                                                    files: arr
                                                }]);
                                            }]
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
//配置 达到动态加载Controller
//$stateProvider, $urlRouterProvider, routerProvider 动态$stateProvider state
.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider", "$stateProvider", "$urlRouterProvider", "routerProvider",
function ($provide, $compileProvider, $controllerProvider, $filterProvider, $stateProvider, $urlRouterProvider, routerProvider) {
    //注册驱动
    BadManAdmin.controller = $controllerProvider.register;
    BadManAdmin.directive = $compileProvider.directive;
    BadManAdmin.filter = $filterProvider.register;
    BadManAdmin.factory = $provide.factory;
    BadManAdmin.service = $provide.service;
    BadManAdmin.constant = $provide.constant;

    //动态菜单部分

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home.html',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    //{
                    //    name: 'css',
                    //    insertBefore: '#app-level',
                    //    files: [
                    //        'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                    //    ]
                    //}
                    //,
                    //{
                    //    name: 'vendors',
                    //    insertBefore: '#app-level-js',
                    //    files: [
                    //        'vendors/sparklines/jquery.sparkline.min.js',
                    //        'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                    //        'vendors/bower_components/simpleWeather/jquery.simpleWeather.js'
                    //    ]
                    //}
                ])
            }
        }
    });
    routerProvider.setCollectionUrl('js/routeCollection.json');

    $urlRouterProvider.otherwise('/home');

    //动态菜单结束
}])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider, routerProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    //http 请求头验证Token
    $httpProvider.interceptors.push('authInterceptorService');
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    $httpProvider.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';

    $httpProvider.interceptors.push(['$rootScope', '$q', function ($rootScope, $q) {
        //拦截统一设置Headers
        return {
            request: function (config) {

                // Header - Token
                config.headers = config.headers || {};
                if (config.headers) {
                    config.headers['Content-Type'] = 'application/json;charset=utf-8';
                };

                return config;
            },

            response: function (response) {

                if (response.status == 200) {
                    // console.log('do something...');
                }

                return response || $q.when(response);
            },

            responseError: function (response) {

                return $q.reject(response);
            }
        }
    }]);
})
.run(['authService', function (authService) {
    authService.fillAuthData();
}])
.filter("fen2yuan", ['$filter', function ($filter) {
    return function (input) {
        if (input == 1140) {
            return $filter('currency')(input / 100, '￥')
        } else {
            return input
        }
    }
}])
.directive('dyTable', ['$http', '$filter', function ($http, $filter) {
    /**
     * 依赖angular-ui 的Pagination 因此需要引入angular-ui-bootstrap 以及bootstrap,如果你不想依赖bootstrap的话你可以自己写一个简单的分页
     */
    return {
        restrict: "E",
        templateUrl: 'js/BadmanTable_tpl.html?r=45678',
        scope: {
            url: '@',
            params: '=',
            columns: '=',
            httpTypes: '=',
            actions: '=',
            callback: "=?"
        },
        link: function (scope) {
            debugger;
            scope.trs = scope.columns;
            scope.maxSize = 5;
            var url = scope.url;
            var params = scope.params;
            //初始化
            params = angular.extend(params, scope.params);
            scope.len = params.pageSize;
            scope.bigCurrentPage = params.pageIndex;
            //监控分页的变化请求数据
            scope.$watch('bigCurrentPage', function (newVal, oldVal) {
                scope.currentNum = scope.len * newVal;
                if (scope.currentNum > scope.bigTotalItems) {
                    scope.currentNum = scope.bigTotalItems;
                }
                params.pageIndex = (scope.bigCurrentPage - 1) * scope.len + 1;
                params.pageSize = scope.currentNum;

                //调用获取数据
                scope.getData();
            });
            //获取数据方法
            scope.getData = function () {
                $http({
                    method: params.httpTypes,
                    url: url,
                    data: params,
                    params: params
                }).
                success(function (data, status, headers, config) {
                    debugger;
                    scope.originList = data.data;//data.slice(0, 10);  //我这个是自己的测试数据如果你返回的话数据结构应该类似这样{"recordsTotal":80,lists:[{}]}，这个recordsTotal是必须的
                    scope.bigTotalItems = data.total || 180; //这个后台返回的数据结构中要含有这个字段，用来计算分页的数量
                    //循环处理添加过滤器
                    angular.forEach(scope.trs, function (ele, i) {
                        if (ele.filter) {
                            var filt = ele.filter.split(":");
                            if (filt[0] == "date") {
                                filt = ["date", "yyyy-MM-dd"];
                            }
                            if (filt[0] == "datetime") {
                                filt = ["date", "yyyy-MM-dd HH:mm:ss"];
                            }
                            angular.forEach(scope.originList, function (el, index) {
                                el[ele.attribute] = $filter(filt[0])(el[ele.attribute], filt[1]);
                            });
                        }
                    });
                    //数据赋值
                    scope.lists = scope.originList;
                }).
                error(function (data, status, headers, config) {
                    //alert("获取数据出错"); //此处你可以自行撤离如果你使用toastr.error("")如果你引入了这个类库
                });
            }
            //reload
            scope.callback = function () {
                scope.getData();
            }
        }
    }
}])
.run(function (router) {
    router.setUpRoutes();
});


