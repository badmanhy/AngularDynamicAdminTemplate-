BadManAdmin
    .service('menuService', ['$http', '$q', function ($http, $q, $scope) {

        var menuServiceFactory = {};
        var _createdMenu = function (menuView, apiAction) {
            //var data = { "pageIndex": menuView.pageIndex, "pageSize": menuView.pageSize };
            var deferred = $q.defer();
            $http.post(apiAction, menuView).success(function (response) {
                //this.datalist = response;
                deferred.resolve(response);

            }).error(function (data, status) {
                //toastr["warning"](data + " " + status);
            });

            return deferred.promise;
        }
        menuServiceFactory.createdMenu = _createdMenu;

        return menuServiceFactory;
    }])