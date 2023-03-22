// index.ts
import { wx_router, wx_authorize, is_undefined, is_null, is_plain_object, is_function, is_string, ResponseView, ResponseViewType, is_equal, to_original } from 'chafingdish'

import { wx_refresh_data } from '../../utils/util'

Page({
  data: {
    goods: [
      {
        id: 1,
        list: [
          {
            name: 'a',
            age: 1,
          },
          {
            name: 'b',
            age: 2
          }
        ]
      },
      {
        id: 2,
        list: [
          {
            name: 'c',
            age: 3,
          },
          {
            name: 'd',
            age: 4
          }]
      }
    ],

    goods1: {
      id: 1,
      title: 'a'
    }
  },

  onLoad() {
    wx_authorize.check('userLocation')

    console.log('is_equal, to_original', is_equal([2], [1]), to_original('2'))
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
        fail: (err) => {
          console.log('err', err)
        }
      })
    }, () => {
      console.log('userLocation authorize failed')
    })
  },

  testWxRouter() {
    wx_router.push('PagesTest1')
  },

  wx_dataset(e: any, key?: string | number) {
    if (e?.currentTarget?.dataset) {
      const dataset = e.currentTarget.dataset

      if (is_undefined(key) || is_null(key)) return dataset

      return dataset[key as string | number] ?? undefined
    }

    return null
  },
  onDataset(e: any) {
    console.log('onDataset', this.wx_dataset(e), this.wx_dataset(e)[0])
  },

  onRefreshData() {
    // wx_refresh_data('getLists', {
    //   show_loading: true,
    //   back: true
    // })

    // wx_refresh_data(['getLists'])


    // wx_refresh_data({
    //   data: 'goods.list.name',
    //   value: 'tommy',
    //   compare: {
    //     'id.name': [2, 'c'],
    //     'id.age': [2, 3]
    //   }
    // })

    wx_refresh_data({
      data: 'goods1',
      value: 'tommy',
      compare: {
        'id.name': [2, 'c'],
        'id.age': [2, 3]
      }
    }, {
      // exclude: [0]
    })
    wx_refresh_data({
      data: 'goods',
      value: 'tommy',
      compare: {
        'id.name': [2, 'c'],
        'id.age': [2, 3]
      }
    }, {
      // exclude: [-1]
    })

    // wx_refresh_data('testWxRouter')
  }
})
