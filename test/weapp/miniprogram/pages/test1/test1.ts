// pages/test1/test1.ts
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

  onRefreshData() {
    wx_refresh_data({
      data: 'goods.list.name',
      value: 'tommy',
      compare: {
        'id.name': [2, 'c'],
        'id.age': [2, 3]
      }
    }, {
      show_loading: true,
      // back: true,
      exclude: [-1]
    })

    wx_refresh_data({
      data: 'goods1',
      value: 'tommy',
      compare: {
        'id.name': [2, 'c'],
        'id.age': [2, 3]
      }
    }, {
      exclude: [-1]
    })
    // wx_refresh_data({
    //   data: 'goods',
    //   value: 'tommy',
    //   // compare: {
    //   //   'id.name': [2, 'c'],
    //   //   'id.age': [2, 3]
    //   // }
    // })

    // wx_refresh_data('testWxRouter')
  }
})