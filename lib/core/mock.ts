// mock 已弃用
export default {}








// import { mock } from 'mockjs'

// /**
//  * Mock everything.
//  *
//  * @param {number|undefined} template see http://mockjs.com/examples.html
//  *
//  * @returns {string} Mocked result.
//  */
// export function mock_(template: string): string {
//   return mock(template)
// }

// /**
//  * Mock id.
//  *
//  * @param {number|undefined} start Minimum value between two numbers.
//  * @param {number|undefined} end Maximum value between two numbers.
//  *
//  * @returns {number} Mocked id.
//  *
//  * @example
//  *
//  * mock_id() // 23
//  */
// export function mock_id(start?: number, end?: number): number {
//   start = (start && +start) ? +start : 1
//   end = (end && +end) ? +end : 100

//   if (end < start) {
//     [start, end] = [end, start]
//   }

//   return mock(`@natural(${start}, ${end})`)
// }

// /**
//  * Mock unique id.
//  *
//  * @param {number|undefined} start Minimum value between two numbers.
//  * @param {number|undefined} end Maximum value between two numbers.
//  *
//  * @returns {string} Mocked unique id.
//  *
//  * @example
//  *
//  * mock_unique_id() // '320000200608168153'
//  */
// export function mock_unique_id(): string {
//   return mock("@id")
// }

// /**
//  * Mock image.
//  *
//  * @param {number|undefined} width Image width.
//  * @param {number|undefined} height Image height.
//  *
//  * @returns {string} Mocked Image url.
//  *
//  * @example
//  *
//  * mock_image() // 'http://dummyimage.com/100x100'
//  */
// export function mock_image(width?: number, height?: number): string {
//   width = (width && +width) ? +width : 400
//   height = (height && +height) ? +height : 400

//   return mock(`@image(${width}x${height})`)
// }

// /**
//  * Mock title.
//  *
//  * @returns {string} Mocked title.
//  *
//  * @example
//  *
//  * mock_title() // '养去全对快'
//  */
// export function mock_title(): string {
//   return mock("@ctitle")
// }

// /**
//  * Mock avatar.
//  *
//  * @param {number|undefined} width Avatar width.
//  * @param {number|undefined} height Avatar height.
//  *
//  * @returns {string} Mocked Avatar url.
//  *
//  * @example
//  *
//  * mock_avatar() // 'http://dummyimage.com/100x100'
//  */
// export function mock_avatar(width?: number, height?: number): string {
//   width = (width && +width) ? +width : 100
//   height = (height && +height) ? +height : 100

//   return mock(`@image(${width}x${height})`)
// }

// /**
//  * Mock nick name.
//  *
//  * @returns {string} Mocked nick name.
//  *
//  * @example
//  *
//  * mock_nick_name() // '薛强'
//  */
// export function mock_nick_name(): string {
//   return mock("@cname")
// }

// /**
//  * Mock email.
//  *
//  * @param {string|undefined} suffix Email suffix.
//  *
//  * @returns {string} Mocked email.
//  *
//  * @example
//  *
//  * mock_email() // 'y.adwjjhbmn@qq.com'
//  */
// export function mock_email(suffix: string = 'qq.com'): string {
//   return mock(`@email(${suffix})`)
// }

// /**
//  * Mock province.
//  *
//  * @returns {string} Mocked province.
//  *
//  * @example
//  *
//  * mock_province() // '安徽省'
//  */
// export function mock_province(): string {
//   return mock("@province")
// }

// /**
//  * Mock city.
//  *
//  * @returns {string} Mocked city.
//  *
//  * @example
//  *
//  * mock_city() // '萍乡市'
//  */
// export function mock_city(): string {
//   return mock("@city")
// }

// /**
//  * Mock district.
//  *
//  * @returns {string} Mocked district.
//  *
//  * @example
//  *
//  * mock_district() // '都昌县'
//  */
// export function mock_district(): string {
//   return mock("@county")
// }

// /**
//  * Mock address.
//  *
//  * @returns {string} Mocked address.
//  *
//  * @example
//  *
//  * mock_address() // '山东省 烟台市 蓬莱市'
//  */
// export function mock_address(): string {
//   return mock("@county(true)")
// }

// /**
//  * Mock url.
//  *
//  * @returns {string} Mocked url.
//  *
//  * @example
//  *
//  * mock_url() // 'http://ovmqzolocc.la/ecvrv'
//  */
// export function mock_url(): string {
//   return mock("@url('http')")
// }

// /**
//  * Mock ip.
//  *
//  * @returns {string} Mocked ip.
//  *
//  * @example
//  *
//  * mock_ip() // '202.40.46.57'
//  */
// export function mock_ip(): string {
//   return mock("@ip")
// }

// /**
//  * Mock created at.
//  *
//  * @returns {string} Mocked created at.
//  *
//  * @example
//  *
//  * mock_created_at() // '1998-12-22 17:15:31'
//  */
// export function mock_created_at(): string {
//   return mock("@datetime('yyyy-MM-dd HH:mm:ss')")
// }