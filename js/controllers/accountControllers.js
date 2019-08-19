BadManAdmin
 .controller('accountCtrl', function ($http, $filter, $scope, ngTableParams, accountService) {

     //accountService.getAccountList().then(function (response) {
     //    $scope.tableEdit = response.data;
     //}, function (err) {
     //    $scope.message = err.message;
     //});
     //获取列表的请求的参数位置
     //$scope.params = {};
     $scope.params = {
         "httpTypes": "POST",
         "pageIndex": 1,
         "pageSize": 10
     };
     //表格展示的设置，可以设置宽度过滤器等，如果是最后的操作可以使用type="action" 按钮具有action属性，你可以设置操作的方法，如果action="delete"这个你可以在
     //controller里面写删除方法，其余的一次类推，还可以设置按钮的显示条件来做到对按钮的显示控制，这个就是visible方法，里面写判断表达式
     $scope.columns = [
         {
             "type": "data", "title": "用户名", "attribute": "firstName", "filter": "fen2yuan"
         },
         {
             "type": "data", "title": "密码", "attribute": "lastName"
         },
         {
             "type": "action", "title": "操作", "width": "200", "buttons": [
                 {
                     "title": "删除", "className": "btn-sm btn-info", "action": "delete",
                     "visible": "list.name != '1140'"
                 },
                 {
                     "title": "查看", "className": "btn-sm btn-danger", "action": "view"
                 }
             ]
         }
     ];

     $scope.httpTypes = 'POST';
     //如果有按钮按钮的操作在这里
     $scope.actions = {
         //第一个参数list是ngrepeat的循环的列表，第二个参数是buttons的循环体
         clicks: function (list, btn) {
             switch (btn.action) {
                 case "delete":
                     //如果你删除后想重新加载列表，只需要在这里调用reload方法
                     $scope.reload();
                     break;
                 case "view":
                     alert("view");
                     break
             }
         }
     };
     
     

     $scope.GetAllEmployee = function () {
         $scope.postData = {
             pageIndex: $scope.paginationConf.currentPage,
             pageSize: $scope.paginationConf.itemsPerPage
         }
         accountService.getAccountList($scope.postData).then(function (response) {
             $scope.paginationConf.totalItems = response.total;
             $scope.tableEdit = response.data;
         },
         function (err) {
             $scope.message = err.message;
         });

     }

     //配置分页基本参数
     $scope.paginationConf = {
         currentPage: 1,
         itemsPerPage: 5
     };

     /***************************************************************
     当页码和页面记录数发生变化时监控后台查询
     如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。 
     ***************************************************************/
     $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.GetAllEmployee());

 })