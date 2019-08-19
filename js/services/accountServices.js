BadManAdmin
    .service('accountService', ['$http', '$q', function ($http, $q, $scope) {

        var accountServiceFactory = {};
        var _getAccountList = function (postData) {
            var data = { "pageIndex": postData.pageIndex, "pageSize": postData.pageSize };
            var deferred = $q.defer();
            $http.post(serviceBase + 'GetAccountList', data).success(function (response) {
                      //this.datalist = response;
                      deferred.resolve(response);

                  }).error(function (data, status) {
                      //toastr["warning"](data + " " + status);
                  });

            return deferred.promise;
        }
        //var list = function (postData) {
        //    return $http.post('/Employee/GetAllEmployee', postData);
        //}

        //return {
        //    list: function (postData) {
        //        return list(postData);
        //    }
        //}
        accountServiceFactory.getAccountList = _getAccountList;

        return accountServiceFactory;
    }])