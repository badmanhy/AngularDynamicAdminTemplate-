angular.module('chat-session.model', [
])
  .factory('ChatSession', ['$rootScope', function ($rootScope) {

      return function (url, name) {
          if (!url) throw 'url 不能为空';
          debugger;
          var model = this,
            socket;

          model.name = name;
          $rootScope.loginName = name;
          function connected() {
              model.isConnected = true;
              $rootScope.$applyAsync();
          }

          function disconnected() {
              model.isConnected = false;
              model.messages = [];
              $rootScope.$applyAsync();
          }

          disconnected();

          model.connect = function () {
              if (model.isConnected) return;

              console.log('ChatSession.connect()');
              socket = new WebSocket([url, name].join('/'));



              socket.onopen = function () {

                  console.log('socket 打开链接');
                  connected();
              };

              socket.onclose = function () {

                  console.log('socket 关闭连接');
                  disconnected();
              };

              socket.onerror = function (e) {

                  console.log('socket 出错 ' + e.error);
                  disconnected();
              };

              socket.onmessage = function (event) {
                  debugger;
                  var message = JSON.parse(event.data);

                  model.messages.push(message);
                  $rootScope.$applyAsync();
              };


          };

          model.disconnect = function () {
              if (!model.isConnected) return;

              console.log('ChatSession.disconnect()');

              socket.close();
          };

          model.send = function (content) {
              if (!model.isConnected) throw '不能发送，如果没有连接';
              if (!content) throw '内容是必需的';

              socket.send(JSON.stringify({ content: content }));
          };

          model.sendToUser = function (content, toUser) {

              if (!model.isConnected) throw '不能发送，如果没有连接';
              if (!content) throw '内容是必需的';

              console.log("sendToUser");
              socket.send(JSON.stringify({ content: content, To: toUser }));
          };


          return model;
      };
  }
  ]);