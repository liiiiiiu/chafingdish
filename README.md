# Chafingdish

[文档网站](https://liiiiiiu.gitee.io/chafingdish-docs) | [Github](https://github.com/liiiiiiu/chafingdish) | [Gitee](https://gitee.com/liiiiiiu/chafingdish)

## 使用

```bash
npm install chafingdish --save
```

```javascript
// 部分输入
import { is_string, to_number, wow_array } from 'chafingdish'

// 全部输入
import * as utils from 'chafingdish'
```

## 关于

为前端开发提供的工具函数，适用于 Web 及微信小程序；

与 lodash 等工具函数库的区别在于，lodash 提供了更多更强大专业的工具函数，而 chafingdish 提供了更多在前端业务开发中所需的工具函数；

比如基础的数据类型判断，数据类型转换，处理后端返回的时间、金额等字段，生成模拟数据等；

在开发微信小程序时，可以使用更便捷的 Promisify API，使用对 `wx.switchTab` `wx.reLaunch` `wx.redirectTo` `wx.navigateTo` `wx.navigateBack` 进行一致性封装的 `wx_router` 路由函数，对地理位置、相册、摄像头等十多种API进行统一封装的 `wx_authorize` 授权函数等；

功能如下：

1. wow_array，增强版数组，提供切片、批量删除、嵌套等功能；
2. is 函数用于判断数据类型；
3. to 函数用于强制转换数据类型；
4. d  函数用于处理时间；
5. wx 函数对部分小程序接口进行 Promise 封装，并提供 `wx_router` 路由函数、`wx_authorize` 授权函数、`wx_refresh_data` 多页数据同步更新函数、 `ResponseView` 视图交互类

> Chafingdish 旨在覆盖前端开发中所需的工具函数，欢迎Star、Fork、PR

## 近期更新

## v1.0.17

1. 新增 `gen_http_content_type` 对象，在添加请求头时简化写法
