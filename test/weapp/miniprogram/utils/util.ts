import { is_undefined, is_null, is_number, is_NaN, is_plain_object, is_function, is_string } from 'chafingdish'

/**
 * 刷新已打开页面的数据
 *
 * 例如从页面A跳转到页面B，再跳转到页面C，最后到页面D，在D页面提交某个表单后需要刷新A、B、C、D页面中共有的数据，保证其数据的一致性
 *
 * 支持全量更新或仅更新某条数据，不支持插入新数据、删除数据
 *
 * @param handler 处理方式
 * @param config 配置参数
 */
export async function wx_refresh_data(handler: string | {
  // 需要更新的 data 值
  data: string
  // 更新、插入的值
  value: any
  // 比对参数，相同后更新 data 值（仅在 data 为数组类型时有效）
  compare?: {
    [key: string]: any
  }
}, config?: {
  // 显示 loading 提示框
  show_loading?: boolean
  // loading 提示框内容
  loading_title?: string
  // loading 提示框透明蒙层
  loading_mask?: boolean
  // 执行完成后是否关闭当前页面，返回上一页面或多级页面
  back?: boolean
  // 返回的页面数
  delta?: number
  // handler 为函数名，是否采用同步策略 
  sync?: boolean
  // 排除执行 handler 的页面
  exclude?: number[]
}) {
  const showLoading = config?.show_loading ?? false
  const loadingTitle = config?.loading_title ?? '加载中'
  const loadingMask = config?.loading_mask ?? false
  const back = config?.back ?? false
  const delta = config?.delta ?? 1
  const sync = config?.sync ?? false
  const exclude = config?.exclude ?? []

  if (showLoading) wx.showLoading({ title: loadingTitle, mask: loadingMask })

  const pages = getCurrentPages()
  const excludeIndex = exclude.map(idx => (idx >= 0 ? idx : (pages.length + idx)))
  let index = pages.length - 1

  for (index; index >= 0; index--) {
    if (excludeIndex.includes(index)) continue

    const page = pages[index]
    let fnName = ''

    if (is_string(handler)) { // handler 为函数名，全量更新
      fnName = handler as string
      // 如果 handler 为函数名，直接执行该函数进行全量更新
      page[fnName] && is_function(page[fnName]) && (!sync ? page[fnName]() : await page[fnName]())
    } else if (is_plain_object(handler)) { // handler 为对象，更新某条数据
      const { data, value, compare } = handler as any

      // 假设要更新的数据结构如下
      // goods: [
      //   {
      //     id: 1,
      //     list: [
      //      {
      //       title: 'a',
      //       price: 50
      //       }
      //     ]
      //   },
      //   {
      //     id: 2,
      //     list: [
      //      {
      //       title: 'b',
      //       price: 100
      //       }
      //     ]
      //   },
      // ]

      // 现在要更新 goods[1]['list'][0]['title'] 也就是title字段的值
      // data 需传入 goods.list.title
      // compare 需传入
      {
        // 'id.title': [2, 'b']
      }

      if (!data || is_function(page[data])) break

      const dataKeys = data.split('.') || [] // ["goods", "list", "title"]
      const compareKeys: string[][] = []
      const compareValues: any[] = []
      let pageDataValue: any = page.data
      let setDataKey = ''

      // 处理对比字段
      // 对比字段存在多条件对比
      // compare: {
      //   'id.title': [1, 'a'],
      //   'id.price': [1, 50]
      // }
      if (compare && is_plain_object(compare)) {
        Object.keys(compare).forEach(key => {
          if (key) {
            const keys = key.split('.')
            compareKeys.push(keys)
            const value = compare[key]
            compareValues.push(Array.isArray(value) ? value : [value])
          }
        })
      }

      if (dataKeys.length) {
        Array.from(dataKeys, (key : string, index: number) => {
          if (Object.prototype.hasOwnProperty.call(pageDataValue, key)) {
            pageDataValue = pageDataValue[key]
            setDataKey += `${index !== 0 ? '.' : ''}${key}`
  
            // 碰到数组结构，就需要依赖 compre 提供的比对参数获得索引值
            // 比如 page.data.goods 的值为数组，就需要拿到索引值才能继续往下处理
            if (Array.isArray(pageDataValue)) {
              let curIndex = new Set()
              for (let i = 0; i < compareKeys.length; i++) {
                for (let j = 0; j < pageDataValue.length; j++) {
                  // 值可能是字符串、数字、数组等不同的数据结构 
                  if (pageDataValue[j][compareKeys[i][index]] === compareValues[i][index]) {
                    curIndex.add(j)
                    break
                  }
                }
              }
  
              // 通过比对结果，获得当前阶段的索引值，并与之前的结果进行拼接
              if (curIndex.size < 2) {
                if (curIndex.size === 1) {
                  const arr: any[] = Array.from(curIndex)
                  pageDataValue = pageDataValue[arr[0]]
                  setDataKey += `[${arr[0]}]`
                }
              } else {
                pageDataValue = page.data
                setDataKey = ''
                throw Error(`[wx_refresh_data] 对比参数失败，请填写正确的参数及值！`)
              }
            }
          }
        })
      }

      if (setDataKey) {
        // 最终找到需要更新的值
        // setDataKey = goods[1].list[0].title
        page.setData({
          [setDataKey]: value
        })
      }
    }
  }

  if (showLoading) wx.hideLoading()

  if (back) wx.navigateBack({ delta })
}