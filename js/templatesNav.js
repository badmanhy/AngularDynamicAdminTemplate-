//angular.module('BadManAdmin')
BadManAdmin.run(['$templateCache', '$http', function ($templateCache, $http, $scope) {
    'use strict';
    var postData = { "pageIndex": 1, "pageSize": 100 };
    var htmlStr = "<div class=\"sidebar-inner c-overflow\">";
    htmlStr = htmlStr + "<ul class=\"main-menu\">";
    htmlStr = htmlStr + "<li data-ui-sref-active=\"active\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i>控制面板</a></li>";
    $http.post(serviceBase + 'GetAccountMapMenuListAllFild', postData).success(function (response) {


        $.each(response.data, function (i, n) {

            //if (n.parentMenuId = "18115178-1818-1818-1818-181151716178") {
                htmlStr = htmlStr + "<li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('account') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-view-compact\"></i> 账户</a>";

            //    $.each(response.data, function (j, m) {

            //        if (m.parentMenuId == n.menuId)
            //            htmlStr = htmlStr + "<li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.accountList\" data-ng-click=\"mactrl.sidebarStat($event)\">用户列表</a></li>";
            //    })
            //    htmlStr = htmlStr + "</li>";

            //}
            htmlStr = htmlStr + "</li>";
            //$.each(n, function (j, o) {

            //    //menulist += '<li><div ><a ref="' + o.menuid + '" href="#" rel="' + o.url + '" ><span class="icon ' + o.icon + '" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div> ';

            //    //if (o.child && o.child.length > 0) {
            //    //    console.log(o);
            //    //    menulist += '<ul class="third_ul">';
            //    //    $.each(o.child, function (k, p) {
            //    //        menulist += '<li><div><a ref="' + p.menuid + '" href="#" rel="' + p.url + '" ><span class="icon ' + p.icon + '" >&nbsp;</span><span class="nav">' + p.menuname + '</span></a></div> </li>';
            //    //    });
            //    //    menulist += '</ul>';
            //    //}
            //});
        });
        htmlStr = htmlStr + "</ul>";
        htmlStr = htmlStr + '</div>';
        //deferred.resolve(response);
        $templateCache.put('template/sidebar-left.html', htmlStr);

    }).error(function (data, status) {
        alert('111')
        //toastr["warning"](data + " " + status);
    });

    //var htmlStr = "<div class=\"sidebar-inner c-overflow\">";
    //htmlStr = htmlStr + "<ul class=\"main-menu\">";

    //htmlStr = htmlStr + "<li data-ui-sref-active=\"active\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i>控制面板</a></li>";
    //htmlStr = htmlStr + "<li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('account') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-view-compact\"></i> 账户</a>";
    //htmlStr = htmlStr + "<ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.accountList\" data-ng-click=\"mactrl.sidebarStat($event)\">用户列表</a></li>";
    //htmlStr = htmlStr + "<li><a href=\"login.html\">Login and Sign Up</a></li>";
    //htmlStr = htmlStr + "<li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.tables\" data-ng-click=\"mactrl.sidebarStat($event)\">Tables</a></li>";
    //htmlStr = htmlStr + "<li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.data-table\" data-ng-click=\"mactrl.sidebarStat($event)\">Data Tables</a></li>";
    //htmlStr = htmlStr + "<li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.menuIndex\" data-ng-click=\"mactrl.sidebarStat($event)\">MenuCreate</a></li>";
    //htmlStr = htmlStr + "</ul></li>";

    //htmlStr = htmlStr + "</ul>";
    //htmlStr = htmlStr + '</div>';

    //$templateCache.put('template/sidebar-left.html',
    //  "<div class=\"sidebar-inner c-overflow\"><div class=\"profile-menu\"><a href=\"\" toggle-submenu><div class=\"profile-pic\"><img src=\"img/profile-pics/2.jpg\" alt=\"\"></div><div class=\"profile-info\">badman<i class=\"zmdi zmdi-caret-down\"></i></div></a><ul class=\"main-menu\"><li><a data-ui-sref=\"pages.profile.profile-about\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-account\"></i> View Profile</a></li><li><a href=\"\"><i class=\"zmdi zmdi-input-antenna\"></i> 隐私设置</a></li><li><a href=\"\"><i class=\"zmdi zmdi-settings\"></i> 设置</a></li><li><a href=\"\"><i class=\"zmdi zmdi-time-restore\"></i> 登出</a></li></ul></div><ul class=\"main-menu\"><li data-ui-sref-active=\"active\"><a data-ui-sref=\"home\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-home\"></i> 控制面板</a></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('account') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-view-compact\"></i> 账户</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"account.accountList\" data-ng-click=\"mactrl.sidebarStat($event)\">用户列表</a></li></ul></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('headers') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-view-compact\"></i> Headers</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"headers.textual-menu\" data-ng-click=\"mactrl.sidebarStat($event)\">Textual menu</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"headers.image-logo\" data-ng-click=\"mactrl.sidebarStat($event)\">Image logo</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"headers.mainmenu-on-top\" data-ng-click=\"mactrl.sidebarStat($event)\">Mainmenu on top</a></li></ul></li>                       <li data-ui-sref-active=\"active\"><a data-ui-sref=\"typography\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-format-underlined\"></i> Typography</a></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('widgets') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-widgets\"></i> Widgets</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"widgets.widget-templates\" data-ng-click=\"mactrl.sidebarStat($event)\">Templates</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"widgets.widgets\" data-ng-click=\"mactrl.sidebarStat($event)\">Widgets</a></li></ul></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('tables') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-view-list\"></i> Tables</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.tables\" data-ng-click=\"mactrl.sidebarStat($event)\">Tables</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"tables.data-table\" data-ng-click=\"mactrl.sidebarStat($event)\">Data Tables</a></li></ul></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('form') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-collection-text\"></i> Forms</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"form.basic-form-elements\" data-ng-click=\"mactrl.sidebarStat($event)\">Basic Form Elements</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"form.form-components\" data-ng-click=\"mactrl.sidebarStat($event)\">Form Components</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"form.form-examples\" data-ng-click=\"mactrl.sidebarStat($event)\">Form Examples</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"form.form-validations\" data-ng-click=\"mactrl.sidebarStat($event)\">Form Validation</a></li></ul></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('user-interface') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-swap-alt\"></i>User Interface</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.ui-bootstrap\" data-ng-click=\"mactrl.sidebarStat($event)\">UI Bootstrap</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.colors\" data-ng-click=\"mactrl.sidebarStat($event)\">Colors</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.animations\" data-ng-click=\"mactrl.sidebarStat($event)\">Animations</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.box-shadow\" data-ng-click=\"mactrl.sidebarStat($event)\">Box Shadow</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.buttons\" data-ng-click=\"mactrl.sidebarStat($event)\">Buttons</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.icons\" data-ng-click=\"mactrl.sidebarStat($event)\">Icons</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.alerts\" data-ng-click=\"mactrl.sidebarStat($event)\">Alerts</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.preloaders\" data-ng-click=\"mactrl.sidebarStat($event)\">Preloaders</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.notifications-dialogs\" data-ng-click=\"mactrl.sidebarStat($event)\">Notifications & Dialogs</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.media\" data-ng-click=\"mactrl.sidebarStat($event)\">Media</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"user-interface.other-components\" data-ng-click=\"mactrl.sidebarStat($event)\">Others</a></li></ul></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('charts') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-trending-up\"></i>Charts</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"charts.flot-charts\" data-ng-click=\"mactrl.sidebarStat($event)\">Flot Charts</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"charts.other-charts\" data-ng-click=\"mactrl.sidebarStat($event)\">Other Charts</a></li></ul></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"calendar\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-calendar\"></i> Calendar</a></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled':mactrl.$state.includes('photo-gallery') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-image\"></i>Photo Gallery</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"photo-gallery.photos\" data-ng-click=\"mactrl.sidebarStat($event)\">Default</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"photo-gallery.timeline\" data-ng-click=\"mactrl.sidebarStat($event)\">Timeline</a></li></ul></li><li data-ui-sref-active=\"active\"><a data-ui-sref=\"generic-classes\" data-ng-click=\"mactrl.sidebarStat($event)\"><i class=\"zmdi zmdi-layers\"></i> Generic Classes</a></li><li class=\"sub-menu\" data-ng-class=\"{ 'active toggled': mactrl.$state.includes('pages') }\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-collection-item\"></i> Sample Pages</a><ul><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.profile.profile-about\" data-ng-click=\"mactrl.sidebarStat($event)\">Profile</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.listview\" data-ng-click=\"mactrl.sidebarStat($event)\">List View</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.messages\" data-ng-click=\"mactrl.sidebarStat($event)\">Messages</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.pricing-table\" data-ng-click=\"mactrl.sidebarStat($event)\">Pricing Table</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.contacts\" data-ng-click=\"mactrl.sidebarStat($event)\">Contacts</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.invoice\" data-ng-click=\"mactrl.sidebarStat($event)\">Invoice</a></li><li><a data-ui-sref-active=\"active\" data-ui-sref=\"pages.wall\" data-ng-click=\"mactrl.sidebarStat($event)\">Wall</a></li><li><a href=\"login.html\">Login and Sign Up</a></li><li><a href=\"lockscreen.html\">Lockscreen</a></li><li><a href=\"404.html\">Error 404</a></li></ul></li><li class=\"sub-menu\"><a href=\"\" toggle-submenu><i class=\"zmdi zmdi-menu\"></i> 3 Level Menu</a><ul><li><a href=\"\">Level 2 link</a></li><li><a href=\"\">Another level 2 Link</a></li><li class=\"sub-menu\"><a href=\"\" toggle-submenu>I have children too</a><ul><li><a href=\"\">Level 3 link</a></li><li><a href=\"\">Another Level 3 link</a></li><li><a href=\"\">Third one</a></li></ul></li><li><a href=\"\">One more 2</a></li></ul></li><li><a href=\"https://wrapbootstrap.com/theme/material-admin-responsive-angularjs-WB011H985\"><i class=\"zmdi zmdi-money\"></i> Buy this template</a></li></ul></div>"
    //);

    //$templateCache.put('template/sidebar-left.html', htmlStr);
    debugger;

}]);
