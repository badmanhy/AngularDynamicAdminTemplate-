BadManAdmin
.controller('loginCtrl', function ($scope, $state, $timeout, authService) {

    //Status

    this.login = 1;
    this.register = 0;
    this.forgot = 0;

    $scope.loginData = {
        userName: "",
        password: "",
        useRefreshTokens: false
    };

    $scope.message = "";


    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        if (keycode == 13) {
            $scope.login();
        }
    };
    //$scope.myClick = function () {
    //    $scope.isClick = 'Yes!';
    //};

    $scope.login = function () {
        debugger;
        authService.login($scope.loginData).then(function (response) {
            // $state.go('widgets.widgets');
            // $location.path('http://localhost:20484/index.html#/home');
            $scope.message = "";
            location.href = "/index.html#/home";
            //window.Location("http://localhost:20484/index.html#/home");

        },
         function (err) {
             $scope.message = err.message;
         });
    };

    $scope.authExternalProvider = function (provider) {

        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

        var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
    };

    $scope.authCompletedCB = function (fragment) {

        $scope.$apply(function () {

            if (fragment.haslocalaccount == 'False') {

                authService.logOut();

                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    externalAccessToken: fragment.external_access_token
                };

                $location.path('/associate');

            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                authService.obtainAccessToken(externalData).then(function (response) {

                    $location.path('/orders');

                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }
})