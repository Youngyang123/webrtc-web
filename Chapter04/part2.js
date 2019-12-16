var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({ port: 8888 }),
    // 使用一个map存放 key：用户名， value：用户的连接对象
    users = {};

wss.on('connection', function (connection) {
  connection.on('message', function (message) {
    var data;

    try {
      // 解析成json
      data = JSON.parse(message);
    } catch (e) {
      console.log("Error parsing JSON");
      data = {};
    }
    // 判断消息类型
    switch (data.type) {
      // 用户登录
      case "login":
        console.log("User logged in as", data.name);
        // 在map中找，登录过了就返回 false
        if (users[data.name]) {
          sendTo(connection, {
            type: "login",
            success: false
          });

        } else {
          // 还没有登录过就存到map中，返回true
          users[data.name] = connection;
          connection.name = data.name;
          sendTo(connection, {
            type: "login",
            success: true
          });
        }

        break;
      default:
        sendTo(connection, {
          type: "error",
          message: "Unrecognized command: " + data.type
        });

        break;
    }
  });

  // 客户端关闭连接
  connection.on('close', function () {
    // 在map中删除该客户端的连接
    if (connection.name) {
      delete users[connection.name];
    }
  });
});

function sendTo(conn, message) {
  conn.send(JSON.stringify(message));
}

wss.on('listening', function () {
    console.log("Server started...");
});
