import {
  strChineseFirstPY,
  oMultiDiff
} from './py'

function checkCh(ch: string) {
  var uni = ch.charCodeAt(0)
  //如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
  if (uni > 40869 || uni < 19968)
    return ch //dealWithOthers(ch)
  //检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
  // @ts-ignore
  return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)))
}

function mkRslt(arr: any[]) {
  var arrRslt = [""];
  for (var i = 0, len = arr.length; i < len; i++) {
    var str = arr[i]
    var strlen = str.length
    if (strlen == 1) {
      for (var k = 0; k < arrRslt.length; k++) {
        arrRslt[k] += str
      }
    } else {
      var tmpArr = arrRslt.slice(0)
      arrRslt = []
      for (k = 0; k < strlen; k++) {
        //复制一个相同的arrRslt
        var tmp = tmpArr.slice(0)
        //把当前字符str[k]添加到每个元素末尾
        for (var j = 0; j < tmp.length; j++) {
          tmp[j] += str.charAt(k)
        }
        //把复制并修改后的数组连接到arrRslt上
        arrRslt = arrRslt.concat(tmp)
      }
    }
  }
  return arrRslt
}

// 参数,中文字符串
// 返回值:拼音首字母串数组
export default function makePy(str: string) {
  if (typeof (str) != "string")
    throw new Error("函数makePy需要字符串类型参数!")
  var arrResult = new Array(); //保存中间结果的数组
  str = str.replace(/\s/g, '');
  for (var i = 0, len = str.length; i < len; i++) {
    //获得unicode码
    var ch = str.charAt(i)
    //检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
    arrResult.push(checkCh(ch))
  }
  //处理arrResult,返回所有可能的拼音首字母串数组
  return mkRslt(arrResult)
}