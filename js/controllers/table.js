BadManAdmin
    .controller('tableCtrl', function($filter, $sce, ngTableParams, tableService) {
        var data = tableService.data;
        
        //基础示例
        this.tableBasic = new ngTableParams({
            page: 1,            // 显示第一页
            count: 10           // 每页条数
        }, {
            total: data.length, // 总数
            getData: function ($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //排序
        this.tableSorting = new ngTableParams({
            page: 1,            // 显示第一页
            count: 10,           // 每页条数
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: data.length, // 总数
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
    
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        })
        
        //Filtering
        this.tableFilter = new ngTableParams({
            page: 1,            // 显示第一页
            count: 10
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;

                this.id = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.name = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.email = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.username = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
                this.contact = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve(this.id, this.name, this.email, this.username, this.contact);
            }
        })
        
        //编辑
        this.tableEdit = new ngTableParams({
            page: 1,            // 显示第一页
            count: 10           // 每页条数
        }, {
            total: data.length, // 总数
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    })
