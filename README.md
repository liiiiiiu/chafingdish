# Chafingdish

为前端开发提供的工具函数，适用于 Web 及微信小程序；

与 lodash 等工具函数库的区别在于，lodash 提供了更多更强大专业的工具函数，而 chafingdish 提供了更多在前端业务开发中所需的工具函数；

比如基础的数据类型判断，数据类型转换，处理后端返回的时间、金额等字段，生成模拟数据等；

在开发微信小程序时，可以使用更便捷的 Promisify API，使用对 `wx.switchTab` `wx.reLaunch` `wx.redirectTo` `wx.navigateTo` `wx.navigateBack` 进行一致性封装的 `wx_router` 路由函数，对地理位置、相册、摄像头等十多种API进行统一封装 `wx_authorize` 授权函数等；

大致功能如下：

1. wow_array，增强版数组，提供切片、批量删除、嵌套等功能；
2. is 函数用于判断数据类型；
3. to 函数用于强制转换数据类型；
4. d  函数用于处理时间；
5. wx 函数对部分小程序接口进行 Promise 封装，并提供 `wx_router` 路由函数、`wx_authorize` 授权函数、`ResponseView` 视图交互类；
6. 更多功能查看下方示例

## 安装

```bash
npm install chafingdish --save
```

## 使用

```javascript
// 部分输入
import { is_string, to_number, wow_array } from 'chafingdish'

// 全部输入
import * as utils from 'chafingdish'
```

### wow

wow 函数对常用的数据结构进行了扩展

#### wow_array

数组是使用率很高的数据类型，wow_array 对数组类型进行了扩展，提供了更便利的取值、删除等操作

```javascript
const arr = wow_array([1, 2, 3])

// 取值
arr[0] // 1
arr[-1] // 3
arr.first // 1
arr.last // 3
// 参考 Python 的列表取值
arr['1:'] // [2, 3]
arr['1:2'] // [2]
arr[':'] // [1, 2, 3]
arr['1:3:2'] // [2]
arr['::'] // [1, 2, 3]
arr['::-1'] // [3, 2, 1]

// 最小、最大值
arr.min // 1
arr.max // 3

// 批量删除，可以传入索引、函数
arr.remove(0, val => val === 3) // [2]

// 打乱顺序
arr.shuffle // [1, 3, 2]

// 嵌套数组，用于处理多级分类等
const nestArr = wow_array([
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
])
nestArr.nest(null, 'parent_id')
// [
//   {
//     id: 1,
//     parent_id: null,
//     children: [
//       {
//         id: 2,
//         parent_id: 1,
//         children: [
//           {
//             id: 4,
//             parent_id: 2,
//             children: [
//               {
//                 id: 5,
//                 parent_id: 4,
//                 children: []
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 3,
//         parent_id: 1,
//         children: []
//       }
//     ]
//   }
// ]
```

### is

is 函数用于判断数据类型

#### 常规判断

```javascript
// 是否为字符串
is_string(1) // false
is_string('1') // true

// 是否为数字
is_number(1) // true
is_number('1') // false
is_number(NaN) // true

// 是否为整数
is_integer(1) // true
is_integer(1.1) // false

// 是否为正整数
is_positive_integer(1) // true
is_positive_integer(-1) // false

// 是否为浮点数
is_float(1) // false
is_float(1.) // false
is_float(1.1) // true
is_float(-1.1) // true

// 是否为正浮点数
is_positive_float(1) // false
is_positive_float(1.) // false
is_positive_float(1.1) // true
is_positive_float(-1.1) // false

// 是否为布尔值
is_boolean(true) // true
is_boolean(false) // true
is_boolean('true') // false
is_boolean(1) // false

// 是否为数组、类数组、arguments
is_array([]) // true
function foo() {
  console.log(is_array(arguments)) // false
  console.log(is_array_like(arguments)) // true
  console.log(is_arguments(arguments)) // true
}
foo()

// 是否为对象、纯对象
is_object({}) // true
is_object([]) // true
is_object(new Map()) // true
is_object(new Set()) // true
is_plain_object({}) // true
is_plain_object([]) // false
is_plain_object(new Map()) // false
is_plain_object(new Set()) // false

// 是否为 Symbol 类型
is_symbol(1) // false
is_symbol(Symbol(1)) // true

// 是否为函数
is_function({}) // false
is_function(() => {}) // true
is_function(Array) true

// 是否为 NaN
is_NaN(1) // false
is_NaN(NaN) // true

// 是否为 undefined
is_undefined(0) // false
is_undefined('0') // false
is_undefined(undefined) // true
is_undefined(null) // false

// 是否为 null
is_null(0) // false
is_null('0') // false
is_null(undefined) // false
is_null(null) // true

// 是否为 Error
is_error(new Error) // true
try {
  const a = 1
  a = 2
} catch (error) {
  console.log(is_error(error)) // true
}

// 是否为假值
is_falsy(0) // true
is_falsy(-0) // true
is_falsy(undefined) // true
is_falsy(NaN) // true
is_falsy('0') // false
```

#### 业务判断

```javascript
// 是否为闰年
is_leap_year(2022) // false
is_leap_year(2024) // true

// 是否为邮箱
is_email('123@qq.com') // true

// 是否为 URL
is_url('https://www.abc.com') // true
is_url('http://www.abc.com') // true
is_url("www.abc.com/img.png") // true
is_url('www.abc.com') // true
is_url('abc.com') // true
is_url('127.0.0.1') // true

// 是否为国内手机号
is_cn_phone_number(18888888888) // true
is_cn_phone_number(86193888) // false

// 是否为国内身份证号码
is_cn_id_card(111222333444555666) // false

// 输入日期是否为今天
is_today('2022-07-10') // false
is_today(1656819176086) // false
// 输入日期是否在今天之前
is_today_before('2022-07-10') // true
is_today_before(1656819176086) // true
// 输入日期是否在今天之后
is_today_after('2022-07-10') // false
is_today_after(1656819176086) // false
```

### to

to 函数用于强制转换数据类型

#### 常规转换

```javascript
// 转换为字符串
to_string(1) // '1'
to_string(true) // 'true'
to_string(NaN) // 'NaN'
to_string(undefined) // 'undefined'
to_string(null) // 'null'

// 转换为数字
to_number('1') // 1
to_number(true) // 1
to_number(NaN) // 0
to_number(undefined) // 0
to_number(null) // 0

// 转换为整数
// 第2个参数用于判断是否需要四舍五入
to_integer('1.5') // 1
to_integer(1.5, false) // 1
to_integer(1.5, true) // 2

// 转换为1~2位浮点数
// 第2个参数用于判断保留1位还是2位小数
// 第3个参数用于判断是否需要四舍五入
to_float(1.256) // 1.25
to_float(1.256, 1, false) // 1.2
to_float(1.256, 2, false) // 1.25
to_float(1.256, 2, true) // 1.26

// 转换为布尔值
to_boolean(0) // false
to_boolean('0') // true
to_boolean(true) // true
to_boolean(NaN) // false
to_boolean(undefined) // false
to_boolean(null) // false

// 转换为数组
to_array(1) // [1]
to_array({}) // [{}]
to_array('1, 2, 3') // ['1', '2', '3']

// 转换为 Symbol
to_symbol(1) // Symbol(1)

// 转换为 undefined
to_undefined() // undefined
to_undefined(1) // undefined
to_undefined(null) // undefined

// 转换为 null
to_null() // null
to_null(1) // null
to_null(undefined) // null
```

#### 业务转换

```javascript
// 中文首字母转拼音
to_cn_pinyin('你好') // ['NH']

// 人民币元转分
// 第2个参数用于判断是否需要四舍五入
to_cn_cent(1.567) // 156
to_cn_cent(1.567, true) // 157
// 人民币分转元
// 要使用分转元，第2个参数需设为 false，第3个参数需设为 true，第4个参数用于判断保留1位还是2位小数
to_cn_cent(156, false, true) // '1.56'
to_cn_cent(156, false, true, 2) // '1.56'
to_cn_cent(156, false, true, 1) // '1.6'
to_cn_cent(156, false, true, 0) // 1.56
```

### date

d 函数用于处理时间

#### d_day()

直接使用 [Day.js](https://dayjs.fenxianglu.cn/) 的相关函数

> d_day().date()

---

```javascript
// 获取当前时间或传入时间的时间戳
d_timestamp() // 1656571581142
d_timestamp('2022-07-03 14:45:15') // 1656819176086

// 格式化当前时间或传入的时间
d_format() // '2022-07-03 14:45:15'
d_format(Date.now()) // '2022-07-03 14:45:15'
d_format(1656819176086) // '2022-07-03 11:32:56'

// 格式化当前时间或传入的时间（只保留年月日）
d_format_YMD() // '2022-07-03'
d_format_YMD(1656819176086) // '2022-07-03'

// 获取两个时间的时间差
d_diff('2022-07-10', '2022-07-03') // 7
d_diff('2022-07-10', '2022-07-03', 'day') // 7

// 获取输入日期所处月份包含的所有日期
d_dates_in_month() // ['2023-03-01T16:50:26+08:00', '2023-03-02T16:50:26+08:00', '2023-03-03T16:50:26+08:00', '2023-03-04T16:50:26+08:00', ..., '2023-03-31T16:51:15+08:00']
```

### gen

gen 函数用于生成一些特殊的值

```javascript
// 生成 uuid
gen_uuid() // '3e479fc2-ab2e-42bc-85f3-c592be4e0cb4'

// 生成随机整数
gen_random_integer() // 3
gen_random_integer(20, 30) // 25
```

### mock

mock 相关功能函数已被移除

使用 [Fast Param](https://github.com/liiiiiiu/fast-param)

### wx

***仅支持在微信小程序中使用***

```javascript
// 深拷贝
wx_clone_deep([1, 2, 3]) // [1, 2, 3]

// 解析按钮传递的 e 值
// <button data-id="{{ 1 }}" data-age="{{ 12 }}" bindtap="onClick" />
function onClick(e) {
  let id = wx_dataset(e)['id'] // 1

  // 或者
  id = wx_dataset(e, 'age') // 12
}

// 接口同步写法
const res = wx_promisify(wx.getImageInfo)
// 等同于
// wx.getImageInfo({
//   src: '',
//   success: res => {}
// })

// 获取设备窗口宽度、高度、像素比
// 可用于 canvas 生成海报等场景
wx_window_width() // 375
wx_window_height() // 555
wx_window_pixel_ratio() // 2

// 获取图片、文件信息的同步写法
const res1 = wx_image_info_sync(path)
const res2 = wx_file_info_sync(path)
```

#### wx_router

对微信小程序[路由](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)接口的封装

示例如下：

```javascript
import { wx_router } from 'chafingdish'

// 返回项目中所有的路由信息
// 根据 app.json 中注册的页面自动生成
wx_router.routes
// {
//   PagesIndex: "/pages/index/index",
//   PagesLogs: "/pages/logs/logs",
//   PagesMyIndex: "/pages/my/index/index",
// }

// 返回当前跳转的路由信息
wx_router.route
// {
//   from: "pages/index/index",
//   params: null,
//   to: "/pages/logs/logs",
// }

// 调用 wx.navigateTo 或者 wx.switchTab
// push 函数会根据页面性质自动调用 wx.navigateTo、wx.switchTab
// 传入的路径可以使用简写的方式（不包含最后一层）
// `/pages/logs/logs` => `PagesLogs`
wx_router.push('PagesLogs', {
  id: 1
}, (res) => {
  console.log('success callback', res)
}, (err) => {
  console.log('fail callback', err)
}, (res) => {
  console.log('complete callback', res)
})
// 也可以写入具体的路径
wx_router.push('/pages/logs/logs')
// 或者使用 routes 对象的属性
wx_router.push(wx_router.routes.PagesLogs)


// 调用 wx.redirectTo 或者 wx.reLaunch
// 传入的路径参数和 push 函数一样有三种方式
wx_router.replace('PagesLogs')
// 默认调用 redirectTo，添加 `@relaunch` 标记后使用 wx.reLaunch
wx_router.replace(`PagesLogs@relaunch`, null, (res: any) => {console.log(res)})
wx_router.replace('/pages/logs/logs')
wx_router.replace(wx_router.routes.PagesLogs)


// 调用 wx.navigateBack
wx_router.back()
// 指定返回的页面数
wx_router.back(2, () => (res: any) => {console.log(res)})
```

#### wx_authorize

在微信小程序中使用地理位置、相册、摄像头等十多种API前，需要调用对应的授权接口，而且在用户拒绝授权的情况下还需进行二次授权的处理；

wx_authorize 对这些接口所需的授权逻辑进行了封装，仅需调用 `check` `auth` 两个函数即可实现所有授权接口的逻辑

示例如下：

```html
<!-- index.html -->

<!-- 在 wxml 中，需要两个按钮分别处理 “已授权” 以及 “拒绝授权” 这两种情况；
以位置授权为例：可以通过 `userLocationAuth` 来判断是否获得了用户的授权，该变量由 wx_authorize 自动生成、管理 -->
<button wx:if="{{ userLocationAuth }}" bindtap="getLocation">获取地理位置</button>
<!-- 当用户 “拒绝授权” 后，想要再次弹出授权框，button按钮必须加上 `openType="openSetting"` 属性 -->
<button wx:else openType="openSetting" bindopensetting="getLocation">获取地理位置</button>
```

---

**在逻辑层中，需先调用 `check` 函数检查授权状态，然后调用 `auth` 函数处理授权逻辑；**

> 调用 check 与 auth 函数都需要传入 scope 参数，传入的 scope 需和官方文档的保持一致：[scope 列表](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/authorize.html)

```javascript
// index.js
import { wx_authorize } from 'chafingdish'

Page({
  onLoad() {
    // 检查是否已授权“地理位置”，并生成 userLocationAuth 变量提供给视图层
    wx_authorize.check('userLocation')

    // 也可以一次性检查多个授权状态
    // 检查是否已授权“添加到相册”，并生成 writePhotosAlbumAuth 变量提供给视图层
    wx_authorize.check('writePhotosAlbum')
  },

  // 获取地理位置
  getLocation(e: any) {
    // auth 函数会根据传入的 e 参数，处理授权相关的一系列逻辑
    wx_authorize.auth(e, 'userLocation', () => {
      // 在授权成功后，就可以调用对应接口继续处理业务逻辑
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          const { latitude, longitude } = res
          wx.chooseLocation({
            latitude: latitude,
            longitude: longitude,
            success: r => {
              console.log(r)
            }
          })
        },
      })
    }, () => {
      console.log('userLocation authorize failed')
    })
  },
})
```

> 使用定位等接口时，需要在 app.json 中配置 `permission` `requiredPrivateInfos` 等字段

#### ResponseView

在发送请求到后端并获得响应数据后，自动处理、控制与 wxml 中的数据绑定；

这里的数据绑定包括 “渲染数据” “是否为空数据” “全部数据是否加载完毕” “分页数” 等;

并且可以自动处理下拉刷新，触底加载的相关逻辑，完成数据从请求、加载、处理到最终渲染的一整套逻辑

示例如下：

```javascript
import { ResponseView, ResponseViewType, ResponseViewConfigType } from 'chafingdish'
import { getList, getUser, createUser, updateUser, deleteUser } from '../models/user'

Page({
  data: {
    list: [],
    user: {}
  },

  listResponseView: undefined as unknown as ResponseViewType,

  userResponseView: undefined as unknown as ResponseViewType,

  async onLoad() {
    // ResponseView的实例化必须在 Page 函数体内
    this.listResponseView = new ResponseView('list')
    // 可在实例化时修改配置参数
    this.userResponseView = new ResponseView('user', {
      success_toast_title: '提交成功！'
      // ...
    } as ResponseViewConfigType)

    // 获取列表数据
    await this.listResponseView.get(
      async (page: number) => await getList({ page })
    )
  },

  // 下拉刷新
  async onPullDownRefresh() {
    await this.listResponseView.get(
      async (page: number) => await getList({ page })
    )

    await this.userResponseView.get(
      async () => await getUser()
    )

    this.listResponseView.stopPullDownRefresh
  },

  // 触底加载
  async onReachBottom() {
    await this.listResponseView.get(
      async (page: number) => await getList({ page }),
      null,
      null,
      true
    )
  },

  async createDemo() {
    // 处理 post 请求
    await this.userResponseView.post(() => {
      return await createUser({})
    }, () => {
      console.log('create user success')
    }, () => {
      console.log('create user fail')
    })
  },

  async updateDemo() {
    // 处理 put 请求
    await this.userResponseView.put(
      () => await updateUser({})
    )
  },

  async deleteDemo() {
    // 处理 delete 请求
    await this.userResponseView.delete(
      () => await deleteUser({})
    )
  },
})
```

```html
<!-- ResponseView 与 wxml 的交互 -->
<view class="page-container">
  <view class="page-list-for-my-message">
    <view wx:if="{{ list && list.length }}" class="message-list">
      <view wx:for="{{ list }}" wx:key="index" class="message-list-item">
        <message-item item="{{ item }}" />
      </view>
    </view>
    <!-- `$messageList` 由 ResponseView 生成 -->
    <van-empty wx:if="{{ $list.empty }}" description="暂无数据" />
    <van-divider wx:if="{{ $list.last }}" contentPosition="center">已经到底了</van-divider>
  </view>
</view>
```

```javascript
// model/user

// 获取接口数据后按如下格式返回
// ResponseView 在拿到 `data` 值后会进行二次处理
export async funtion getList() {
  return {
    data: [/* ... */],
    total: 2
  }
}

export async funtion getUser() {
  return {
    data: {/* ... */},
    total: 1
  }
}

export async funtion createUser() {
  return {
    data: true,
  }
}

export async funtion updateUser() {
  return false
}

export async funtion deleteUser() {
  return {
    data: true
  }
}
```

## Changelog

### v1.0.12

新增 `is_falsy` 函数，用于判断输入值是否为假值

新增 `is_today` 函数，用于判断输入日期是否为今天

新增 `is_today_before` 函数，用于判断输入日期是否在今天之前

新增 `is_today_after` 函数，用于判断输入日期是否在今天之后

新增 `d_dates_in_month` 函数，用于获取输入日期所处月份包含的所有日期

---

优化 `wx_dataset` 函数写法
