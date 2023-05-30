# Chafingdish

为前端开发提供的工具函数，适用于 Web 及微信小程序

[文档网站](https://liiiiiiu.gitee.io/chafingdish-docs) | [Github](https://github.com/liiiiiiu/chafingdish) | [Gitee](https://gitee.com/liiiiiiu/chafingdish)

## 使用

```bash
npm install chafingdish --save
```

```javascript
// 部分输入
import {
  wow_array,

  // 是否为字符串
  is_string,
  // 是否为假值
  is_falsy,
  // 比较两个值是否相等
  is_equal,
  // 是否为邮箱
  is_email,
  // 输入日期是否为今天
  is_today,

  // 转换为数值
  to_number,
  // 首字母大写
  to_title,

  // 格式化当前时间或传入的时间
  d_format,

  // 生成随机整数
  gen_random_integer,

  // 微信小程序数据深拷贝
  wx_clone_deep,
  // 微信小程序解析按钮传递的 event 值
  wx_dataset,
  // 微信小程序路由接口
  wx_router,
  // 微信小程序授权接口
  wx_authorize,
} from 'chafingdish'

// 全部输入
import * as utils from 'chafingdish'
```

## 关于

与 lodash 等工具函数库的区别在于，lodash 提供更强大专业的工具函数，而 chafingdish 提供了在前端开发中面对各种业务所需的工具函数

功能如下：

1. wow_array 函数，加强了数组的能力，提供切片、批量删除、嵌套等功能；
2. is 函数除了基础的数据类型判断，还包含了对开发中某些业务场景的判断，比如判断两个值是否相等、判断传入值是否为邮箱、判断传入年份是否为闰年等；
3. to 函数也包含了对基础、业务数据的转换，比如将传入值转换为数值、整数、浮点数类型，首字母大写等；
4. d  函数用于时间的处理，比如在对接时就经常需要对后端返回的时间字段进行处理；
5. gen 函数用于生成一些值，例如 uuid、随机数等；
6. wx 函数对部分小程序接口进行 Promise 封装（语法糖），并提供 `wx_router` 路由函数、`wx_authorize` 授权函数、`wx_refresh_data` 多页数据同步更新函数、 `ResponseView` 视图交互类等多个为微信小程序定制的工具函数；
7. 更多功能查看[文档网站](https://liiiiiiu.gitee.io/chafingdish-docs)

> Chafingdish 旨在覆盖前端开发中所需的工具函数，欢迎Star、Fork、PR

## 近期更新

## v1.0.22

1. 新增 `to_percentage` 函数，用于将传入值转换为百分比
2. 新增 `to_thousands` 函数，用于将传入值进行千分位格式化

## v1.0.21

1. 新增 `d_countdown` 函数，用于将时间转换为倒计时数值（天、小时、分钟、秒）

## v1.0.17

1. 新增 `gen_http_content_type` 对象，在添加请求头时简化写法
