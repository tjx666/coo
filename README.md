# coo

[![Build Status](https://travis-ci.org/tjx666/coo.svg?branch=master)](https://travis-ci.org/tjx666/coo) [![dependencies Status](https://david-dm.org/tjx666/coo/status.svg)](https://david-dm.org/tjx666/coo) [![devDependencies Status](https://david-dm.org/tjx666/coo/dev-status.svg)](https://david-dm.org/tjx666/coo?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/coo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/coo?targetFile=package.json) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/coo.svg)](http://isitmaintained.com/project/tjx666/coo')

该仓库为聊天应用 coo 的前端项目，后端项目：[coo-server](https://github.com/tjx666/coo-server)，后端项目的文档也写到这个项目的 README。

![sendMessage](https://github.com/tjx666/coo/blob/master/docs/images/sendMessage.png?raw=true)

## 技术选型

### 前端技术栈

- GUI 技术: electron。electron 是一种使用前端网页技术开发用户界面程序的跨操作系统的 GUI 技术，将 nodejs 运行时和浏览器运行时合成到一个运行时，让你使用前端网页技术开发界面的同时拥有完整的后端能力。
- 前端框架：react + react hooks + react router，整个项目全部都是用函数组件，基于可读性的考虑，只在性能要求比较高的地方例如列表才会刻意使用记忆函数（useCallback, useMemo)。
- 语言：TypeScript，包括 webpack 配置，整个前端项目基本上都是使用 TypeScript 编写的
- 状态管理：redux + [redux-toolkit](https://github.com/reduxjs/redux-toolkit) + [redux-persist](https://github.com/rt2zz/redux-persist)，redux-toolkit 是 redux 官方的工具集，使用它可以减少配置，避免编写样板代码，提高开发效率。使用 redux-persist 进行状态持久化，将应用状态保存在本地 JSON 文件，下次再次启动应用时可以恢复上次关闭应用时的状态。
- UI 库：antd v4，可能是最早一批上 v4 船的开发者，使用 UI 库省去编写基础组件的时间，大大节省开发时间
- 数据请求：axios，使用拦截器处理认证和请求错误
- 打包方案: webpack，渲染进程的打包配置以及主进程自动重启都完全是手动定制的，使用 DllPlugin 等手段优化打包速度

#### 交互逻辑

![前端交互逻辑](https://github.com/tjx666/coo/blob/master/docs/images/前端交互逻辑.png?raw=true)

### 后端技术栈

- 开发语言：nodejs
- 服务端框架：koa2，自定义了处理异常，静态文件服务中间件
- 数据库：采用的是非关系型数据库 mongoDB，使用的 ORM 库是 mongoose
- 服务端推送：目前采用的是 socket.io，后续可能会替换成 ws
- 认证方案：RESTful API 和 socket.io 都是使用 JWT 进行认证，RESTful API 要求每次请求都在请求头 `Authorization` 带上认证 token（少部分请求例如登入不需要），而 socket.io 需要在建立链接时带上 token 参数进行认证。

#### 私信请求流程

假设有用户 userA 使用客户端 clientA，用户 userB 使用客户端 clientB，下面是 usetA 发送给 userB 一条消息 `"hello"` 的请求流程：

1. clientA 和 clientB 启动时都会和服务器的 socket.io 服务建立双端通信链接 socketA 和 socketB，建立链接的 URL 参数会带上认证 token 和已登入用户的 id，服务器会保存用户 id 和对应 socket 的映射，也就是说可以通过 userB 的用户 id 拿到 socketB。

2. clientA 通过 RESTful API 发送 HTTP 请求给服务器，请求格式：

   ```bash
   # 该路由处理私信文本消息
   POST /messages/private/text
   # from 表示发送方的用户 id
   from=userA_id
   # to 表示接受方的用户 id
   to=userB_id
   # content 表示请求内容
   content="hello"
   ```

3. 服务器根据请求内容在 `mongoDB` 的 message 集合中插入一条新的 message 数据，设置该 message 的状态为 `created`，再根据接受方用户 id 即 `userB_id` 获取到 socketB，使用该 socket 向 clientB 推送消息，格式为;

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

4. clientB 接受到服务端推送的上面那条消息，更新前端界面中的消息列表，将 clientA 的会话项置顶

#### 数据库表定义

##### 用户表

```javascript
const { Schema, model, Types } = require('mongoose');
const omit = require('lodash/omit');

const UserSchema = new Schema(
  {
    // 用户邮箱
    email: {
      // 类型为字符串
      type: String,
      // 不能重复
      unique: true,
      // 不能为空
      required: true,
    },
    // 用户昵称
    name: {
      type: String,
      // 最大长度为 24
      maxlength: 24,
    },
    // 用户密码
    // 用户注册或者更新密码时服务器保存的是用户密码的加盐 hash
    password: {
      type: String,
      required: true,
      maxlength: 60,
    },
    // 头像为用户上传头像的图片 md5 值
    avatar: {
      type: String,
      maxlength: 40,
    },
    // 好友的 ObjectId 数组
    friends: {
      type: [Types.ObjectId],
    },
    // 加入的群的 ObjectId 数组
    groups: {
      type: [Types.ObjectId],
    },
  },
  {
    // 自动生成和更新 createdAt 和 updatedAt 字段
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        if (ret.avatar) {
          ret.avatar = `/public/images/avatar/${ret.avatar}`;
        }
        ret.id = ret._id;
        // 响应请求时一般不需要下面这些字段
        return omit(ret, ['_id', 'createdAt', 'updatedAt', '__v', 'password', 'friends', 'groups']);
      },
    },
  },
);

module.exports = model('User', UserSchema);
```

##### 消息表

```javascript
const { Schema, model, Types } = require('mongoose');
const omit = require('lodash/omit');

/**
 * status 字段说明：
 * 表示消息状态，后期可以用于实现客户端能够显示用户是否消息已读，目前不考虑实现
 * created: 表示消息已创建但是未送达
 * received: 表示消息已送达但是未读
 * checked：消息已读
 *
 * situation 字段说明：
 * 表示发送消息的情景
 * private（私聊）： from 和 to 都是用户 id
 * group（群聊）：from 就是用户 id，to 就是群 id
 * system（系统消息）：系统消息使用一个特殊的用户账号发送，目前使用邮箱为 systemMessage@admin.com 的用户账号
 *
 * content 字段说明：
 * contentType 是 text 即文本消息，content 就是消息内容
 * contentType 是 image 即图片消息，content 就是服务器上保存的图片 URL
 * contentType 是 video 即视频消息， content 就是服务器上保存的视频的 URL
 */
const MessageSchema = new Schema(
  {
    from: {
      type: Types.ObjectId,
      required: true,
    },
    to: {
      type: Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: ['created', 'received', 'checked'],
      default: 'created',
    },
    situation: {
      type: String,
      enum: ['private', 'group', 'system'],
      default: 'private',
    },
    contentType: {
      type: String,
      enum: ['text', 'image', 'video'],
      default: 'text',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        ret.id = ret._id;
        return omit(ret, ['_id', 'createdAt', 'updatedAt', '__v']);
      },
    },
  },
);

module.exports = model('Message', MessageSchema);
```

##### 群表

```javascript
const { Schema, model, Types } = require('mongoose');
const omit = require('lodash/omit');

const GroupSchema = new Schema(
  {
    // 群主 ObjectId
    master: {
      type: Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 24,
    },
    avatar: {
      type: String,
      maxlength: 40,
    },
    // 群成员 ObjectId 数组
    members: {
      type: [Types.ObjectId],
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(_doc, ret) {
        if (ret.avatar) {
          ret.avatar = `/public/images/avatar/${ret.avatar}`;
        }
        ret.id = ret._id;
        return omit(ret, ['_id', 'createdAt', 'updatedAt', '__v', 'members']);
      },
    },
  },
);

module.exports = model('Group', GroupSchema);
```

## :hourglass_flowing_sand: Progress

### 登入界面

登入和注册功能都已经完成，目前只支持邮箱注册。

![login](https://github.com/tjx666/coo/blob/master/docs/images/login.png?raw=true)

### 会话界面

开发中，目前仅支持私聊文字，图片信息，即将支持其它格式和群聊功能

![progress](https://github.com/tjx666/coo/blob/master/docs/images/message.png?raw=true)

### 个人中心

点击侧边栏头像进入，支持修改修改头像，昵称，密码。

![profile](https://github.com/tjx666/coo/blob/master/docs/images/profile.png?raw=true)

### 好友和群

已支持搜索，添加，删除好友，群功能待开发...

![contacts](https://github.com/tjx666/coo/blob/master/docs/images/contacts.png?raw=true)
