angular.module('chat.controller', ['chat.service'])

  .controller('ChatController', ['$scope', 'chatService',
    function ($scope, chatService) {

        $scope.createSession = function (name) {
            if (!name) throw '请填写用户名';

            $scope.session = chatService
              .createSession(name);
        };

        $scope.send = function (newMessage) {
          
            $scope.session.send(newMessage.content);
            newMessage.content = '';
        };

        ///发送给指定用户
        $scope.sendToUser = function (newMessage, user) {
            $scope.session.sendToUser(newMessage.content, user);
            newMessage.content = '';
        };
    }]);
