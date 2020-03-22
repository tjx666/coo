# coo

[![Build Status](https://travis-ci.org/tjx666/coo.svg?branch=master)](https://travis-ci.org/tjx666/coo) [![dependencies Status](https://david-dm.org/tjx666/coo/status.svg)](https://david-dm.org/tjx666/coo) [![devDependencies Status](https://david-dm.org/tjx666/coo/dev-status.svg)](https://david-dm.org/tjx666/coo?type=dev) [![Known Vulnerabilities](https://snyk.io/test/github/tjx666/coo/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tjx666/coo?targetFile=package.json) [![Percentage of issues still open](https://isitmaintained.com/badge/open/tjx666/coo.svg)](http://isitmaintained.com/project/tjx666/coo')

coo 是一个跨平台的聊天客户端，项目还在积极开发中，时间比较紧，先实现功能，后面再慢慢改善样式，后端项目：[coo-server](https://github.com/tjx666/coo-server)。

技术栈：

1. GUI 技术: electron，目前主要是在渲染进程开发
2. 前端框架：react + react hooks + react router，全部都是用函数组件，只在性能要求比较高的地方例如列表才会刻意使用记忆函数（useCallback, useMemo)。
3. 语言：TypeScript，包括 webpack 配置，整个前端项目基本上都是使用 TypeScript 编写的
4. 状态管理：redux + [redux-toolkit](https://github.com/reduxjs/redux-toolkit) + [redux-persist](https://github.com/rt2zz/redux-persist)，使用 redux-toolkit 避免编写样板代码，使用 redux-persist 进行状态持久化。
5. UI 库：antd v4，可能是最早一批上 v4 船的开发者
6. 数据请求：axios，使用拦截器处理认证和请求错误，基于 axios 封装了一个请求工具使其更适合业务开发
7. 打包方案: webpack，使用 DllPlugin 等手段优化打包速度
8. 认证方案：RESTful API 和 socket.io 都是使用 JWT 进行认证

![sendMessage](https://github.com/tjx666/coo/blob/master/screenshots/sendMessage.png?raw=true)

## :hourglass_flowing_sand: Progress

### 登入界面

登入和注册功能都已经完成，目前只支持邮箱注册。

![login](https://github.com/tjx666/coo/blob/master/screenshots/login.png?raw=true)

### 会话界面

开发中，目前仅支持私聊文字，图片信息，即将支持其它格式和群聊功能

![progress](https://github.com/tjx666/coo/blob/master/screenshots/message.png?raw=true)

### 个人中心

点击侧边栏头像进入，支持修改修改头像，昵称，密码。

![profile](https://github.com/tjx666/coo/blob/master/screenshots/profile.png?raw=true)

### 好友和群

已支持搜索，添加，删除好友，群功能待开发...

![contacts](https://github.com/tjx666/coo/blob/master/screenshots/contacts.png?raw=true)
