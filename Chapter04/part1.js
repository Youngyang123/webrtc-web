// 创建websocket服务器
var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8888 });

// 监听连接
wss.on('connection', function (connection) {
  console.log("User connected");

  // 监听消息接收
  connection.on('message', function (message) {
    console.log("Got message:", message);
  });
  // 发送消息
  connection.send('成功接收 message');
});
