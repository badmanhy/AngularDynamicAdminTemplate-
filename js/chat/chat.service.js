angular.module('chat.service', ['chat-session.model'])

    .factory('chatService', ['ChatSession',function (ChatSession) {

        var service = {
            createSession: function (name) {
                if (!name) throw '请填写用户名';


                var session = new ChatSession('ws://localhost:27832/api/chat', name);
                //var session = new ChatSession('ws://192.168.1.87:777/api/chat', name);

                session.connect();

                return session;
            }
        };

        return service;
    }]);