# [deprecated] coo

[![Build Status](https://travis-ci.org/tjx666/coo.svg?branch=master)](https://travis-ci.org/tjx666/coo) [![dependencies Status](https://david-dm.org/tjx666/coo/status.svg)](https://david-dm.org/tjx666/coo) [![devDependencies Status](https://david-dm.org/tjx666/coo/dev-status.svg)](https://david-dm.org/tjx666/coo?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/coo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/coo?targetFile=package.json) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/coo.svg)](http://isitmaintained.com/project/tjx666/coo')

该仓库为聊天应用 coo 的前端项目，后端项目：[coo-server](https://github.com/tjx666/coo-server)。

![sendMessage](https://github.com/tjx666/coo/blob/master/docs/images/sendMessage.png?raw=true)

## 技术选型

### 前端技术栈

- GUI 技术: `electron`。`electron` 是一种使用前端网页技术开发用户界面程序的跨操作系统的 GUI 技术，它将 `nodejs` 运行时和浏览器运行时合成到一个运行时，让你使用前端网页技术开发界面的同时拥有完整的后端能力。
- 前端框架：`react` + `react hooks` + `react router`，整个项目全部使用函数组件进行开发。
- 状态管理：`redux` + `redux-toolkit` + `redux-persist`，`redux-toolkit` 是 `redux` 官方维护的工具集，使用它可以减少用户配置，避免编写样板代码，提高开发效率。使用 `redux-persist` 进行状态持久化，将应用状态保存在本地 JSON 文件，下次再次启动应用时可以恢复上次关闭应用时的状态。
- UI 库：`ant design v4`，可能是最早一批上 v4 船的开发者，使用 UI 库省去编写基础组件的时间，大大节省开发时间。
- 数据请求：`axios`，使用拦截器处理认证和请求错误。
- 语言：`TypeScript`，包括 `webpack` 配置，整个前端项目基本上都是使用 `TypeScript` 编写的。
- 打包方案: `webpack`，渲染进程的打包配置以及主进程自动重启都完全是定制的，使用 `DllPlugin` 等手段优化打包速度。

#### 交互逻辑

![前端交互逻辑](https://github.com/tjx666/coo/blob/master/docs/images/front-end-interaction.png?raw=true)

### 后端技术栈

- 开发语言：`nodejs`。
- 服务端框架：`koa2`，自定义了处理异常，静态文件服务中间件。
- 数据库：采用的是非关系型数据库 `mongoDB`，使用的 `ORM` 库是 `mongoose`。
- 服务端推送：目前采用的是 `socket.io`，后续可能会替换成 `ws`。
- 认证方案：`RESTful API` 和 `socket.io` 都是使用 `JWT` 进行认证，`RESTful API` 要求每次请求都在请求头 `Authorization` 带上认证 `token`（少部分请求例如登入不需要），而 `socket.io` 需要在建立链接时带上 token 参数进行认证。

#### 私聊请求流程

假设有用户 `userA` 使用客户端 `clientA`，用户 `userB` 使用客户端 `clientB`，下面是 `usetA` 发送给 `userB` 一条消息 `"hello"` 的请求流程：

1. `clientA` 和 `clientB` 启动时都会和服务器的 `socket.io` 服务建立 `websocket` 链接 `socketA` 和 `socketB`，建立链接的 **URL** 参数会带上认证 `token` 和已登入用户的 `id`，服务器会保存用户 `id` 和对应 `socket` 的映射，也就是说可以通过 `userB` 的用户 `id` 拿到 `socketB`。

   当我们需要对一个用户推送消息的时候只需要根据它的用户 `id` 拿到对应的 `socket` ，然后调用 `socket.io` 的 API `socket.emit(eventName, data)` 推送即可。

2. `clientA` 通过 **RESTful API** 发送 HTTP 请求给服务器，请求格式：

   ```bash
   # 该路由处理私信文本消息
   POST /messages/private/text
   # from 表示发送方的用户 id，这里也就是 userA 的用户 id
   from=userA_id
   # to 表示接受方的用户 id，这里也就是 userB 的用户 id
   to=userB_id
   # content 表示请求内容，这里就是 "hello"
   content="hello"
   ```

3. 服务器根据请求内容在 `mongoDB` 的 `message` 集合中插入一条新的 `message` 数据，设置该 `message` 的状态为 `created`，再根据接受方用户 `id` 即 `userB_id` 获取到 `socketB`，使用该 `socketB` 向 `clientB` 推送消息，格式为：

   ```javascript
   socket.emit(
       // 和聊天相关的消息都通过 chat 事件推送
       'chat',
       // 消息内容
       {
           // 发送方 id
           from：userA_id,
           // 场景是私聊
           situation: 'private',
           // 发送内容是 'hello'
           content: 'hello',
           // 内容格式是文本消息
           contentType: 'text',
           // 消息创建时间是以服务器数据库新增 message 的时间为准
           createdAt: newMessage.createdAt,
       },
       (data) => {
           // 接受到客户端响应后表示客户端已经接受消息
           // 将数据库中对应的那条 message 的 status 更新为 received
           newMessage.status = 'received';
       },
   );
   ```

4. `clientB` 接受到服务端推送的上面那条消息，更新前端界面中的消息列表，将 `clientA` 的会话项置顶。

#### 群聊的请求过程

当用户 `userA` 在群 `group` 中发送一消息 `"hello"` 时，请求流程是这样的：

1. 客户端请求群聊消息接口:

   ```bash
   # 该路由处理私信文本消息
   POST /messages/group/text
   # from 表示发送方的用户 id，这里就是 userA 的用户 id
   from=userA_id
   # to 表示群 id
   to=group_id
   # content 表示请求内容
   content="hello"
   ```

2. 服务器根据请求内容在 `mongoDB` 的 `message` 集合中插入一条新的 `message` 数据，根据群 `id` 查询群表中该群的记录，拿到在这个群的所有用户 `id` 数组，遍历这个 `id` 数组，向所有用户推送消息，消息格式：

   ```javascript
   group.members.forEach((userId) => {
     const userIdStr = userId.toString();
     if (userIdStr === from) return;
     const socket = ctx.sockets.get(userIdStr);

     if (socket) {
       socket.emit('chat', {
         // 发送消息的用户id, 也就是 userA 的 id
         from,
         // 发送消息的用户信息
         fromUser: fromUser.toObject(),
         // 群 id
         groupId: to,
         // 场景是群消息
         situation: 'group',
         // 发送内容，这里是 'hello'
         content,
         // 消息格式是文本格式
         contentType: 'text',
         // 消息新建时间，以服务器为准
         createdAt: newMessage.createdAt,
       });
     }
   });
   ```

## :hourglass_flowing_sand: Progress

### 登入界面

目前只支持邮箱注册，服务器不保存明文密码，保存的是 `hmac` 摘要。

![login](https://github.com/tjx666/coo/blob/master/docs/images/login.png?raw=true)

### 会话界面

支持私聊，群聊，消息格式支持文字，图片。

![progress](https://github.com/tjx666/coo/blob/master/docs/images/message.png?raw=true)

### 个人中心

点击侧边栏头像进入，支持修改修改头像，昵称，密码。

![profile](https://github.com/tjx666/coo/blob/master/docs/images/profile.png?raw=true)

### 联系人界面

支持搜索，添加，删除好友，支持创建群，解散群，搜索群，加入群。

![contacts](https://github.com/tjx666/coo/blob/master/docs/images/contacts.png?raw=true)
