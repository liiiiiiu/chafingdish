<div align=center>
<img src="https://img.icons8.com/cotton/64/null/chili-pepper--v1.png">
<h1>Chafingdish</h1>
</div>

为前端开发提供的工具函数，适用于 Web 及微信小程序；

与 lodash 等工具函数库的区别在于，lodash 提供了更多更强大专业的工具函数，而 chafingdish 提供了更多在前端业务开发中所需的工具函数；

比如数据类型判断、数据类型转换、处理后端返回的时间金额等字段、生成模拟数据；在开发微信小程序时，使用 Promisify 的API、数据深拷贝、使用封装后的路由、授权函数等，大致功能如下：

1. wow_array，增强版数组，提供切片、批量删除、嵌套等功能；
2. is 函数用于判断数据类型；
3. to 函数用于强制转换数据类型；
4. d  函数用于处理时间；
5. wx 函数对部分小程序接口进行 Promise 封装，并提供 `wx_router` 路由函数、`wx_authorize` 授权函数、`ResponseView` 视图交互类；
6. 更多功能查看下方示例。

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

#### wow_array

```javascript
let arr = wow_array([1, 2, 3])
arr[0] // 1
arr[-1] // 3
arr.first // 1
arr.last // 3
arr['1:'] // [2, 3]
arr['1:2'] // [2]
arr[':'] // [1, 2, 3]
arr['1:3:2'] // [2]
arr['::'] // [1, 2, 3]
arr['::-1'] // [3, 2, 1]
arr.min // 1
arr.max // 3
arr.remove(0, val => val === 3) // [2]
arr.shuffle // [1, 3, 2]

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

|     is_   |     usage    | result |
|    ---    |      ---     |  ----  |
| is_string | is_string(0) |  false |
| is_number | is_number(0) |  true  |
| is_integer | is_integer(0) |  true |
| is_positive_integer | is_positive_integer(-1) |  false |
| is_float | is_float(0) |  false |
| is_positive_float | is_positive_float(1.1) |  true |
| is_boolean | is_boolean(0) |  false |
| is_array | is_array([]) |  true |
| is_array_like | is_array_like([]) |  true |
| is_object | is_object([]) / is_object({}) |  true / true |
| is_plain_object | is_object([]) / is_object({}) |  false / true |
| is_object_like | is_object_like({}) |  true |
| is_symbol | is_symbol(0) |  false |
| is_function | is_function(0) |  false |
| is_NaN | is_NaN(0) |  false |
| is_undefined | is_undefined(0) |  false |
| is_null | is_null(undefined) |  false |
| is_length | is_length([1, 2].length) |  true |
| is_arguments | is_arguments(0) |  false |
| is_error | is_error(0) |  false |
| is_leap_year | is_leap_year(2022) |  false |
| is_email | is_email('123@qq.com') |  true |
| is_url | is_url('https://www.abc.com') |  true |
| is_cn_phone_number | is_cn_phone_number(18888888888) |  true |
| is_cn_id_card | is_cn_id_card(123) |  false |

### to

|     to_   |     usage    | result |
|    ---    |      ---     |  ----  |
| to_string | to_string(0) |  '0' |
| to_number | to_number('1') |  1  |
| to_integer | to_integer(1.6, false) / to_integer(1.6, true) |  1 / 2 |
| to_float | to_float(1.256, 1, false) / to_float(1.256, 2, true) |  '1.2' / '1.26' |
| to_cn_cent | to_cn_cent(190.50) / to_cn_cent(19050, false, true) |  19050 / '190.50' |
| to_boolean | to_boolean(0) | false |
| to_array | to_array(0) / to_array('1, 2, 3') | [0] / [1, 2, 3] |
| to_symbol | to_symbol(0) | Symbol(0) |
| to_undefined | to_undefined() | undefined |
| to_null | to_null |  null |
| to_cn_pinyin | to_cn_pinyin('你好') | ['NH'] |

### date

|     d_   |     usage    | result |
|    ---    |      ---     |  ----  |
| d_day | d_day().date() | 参考：[Day.js](https://dayjs.fenxianglu.cn/)  |
| d_timestamp | d_timestamp() |  1656571581142 |
| d_format | d_format() |  '2022-06-30 14:45:15' |
| d_format_YMD | d_format_YMD() |  '2022-06-30'  |
| d_diff |  d_diff('2022-07-10', '2022-07-03') |  7  |

### gen

|     gen_   |     usage    | result |
|    ---    |      ---     |  ----  |
| gen_uuid | gen_uuid() |  '3e479fc2-ab2e-42bc-85f3-c592be4e0cb4' |
| gen_random_integer | gen_random_integer() / gen_random_integer(20, 30) |  3 / 25 |

### mock

mock 相关功能函数已被移除

使用 [Fast Param](https://github.com/liiiiiiu/fast-param)

### wx

***仅支持微信小程序***

|     wx_   |     usage    | result |
|    ---    |      ---     |  ----  |
| wx_clone_deep | wx_clone_deep([1, 2, 3]) |  [1, 2, 3] |
| wx_dataset | wx_dataset(e) |  e.currentTarget.dataset => {} |
| wx_promisify | wx_promisify(wx.getImageInfo) |   |
| wx_window_width | wx_window_width() | 375  |
| wx_window_height | wx_window_height() |  555 |
| wx_window_pixel_ratio | wx_window_pixel_ratio() |  2 |
| wx_image_info_sync | wx_image_info_sync(path) |   |
| wx_file_info_sync | wx_file_info_sync(path) |   |

#### wx_router

对微信小程序[路由](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)接口的封装。

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

wx_authorize 对这些接口所需的授权逻辑进行了封装，仅需调用 `check` `auth` 两个函数即可实现所有授权接口的逻辑。

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
    authorize.check('writePhotosAlbum')
  },

  // 获取地理位置
  getLocation(e: any) {
    // auth 函数会根据传入的 e 参数，处理授权相关的一系列逻辑
    authorize.auth(e, 'userLocation', () => {
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

#### ResponseView

在发送请求到后端并获得响应数据后，自动处理、控制与 wxml 中的数据绑定；

这里的数据绑定包括 “渲染数据” “是否为空数据” “全部数据是否加载完毕” “分页数” 等;

并且可以自动处理下拉刷新，触底加载的相关逻辑，完成数据从请求、加载、处理到最终渲染的一整套逻辑。

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
