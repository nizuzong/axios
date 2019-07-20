import CryptoJS from 'crypto-js'

//去除空格
export const trim = str => {
  return typeof str === 'string'
    ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    : str
}
//防抖函数
export const debounceFunc = (func, wait, immediate) => {
  var timeout, result
  var debounced = function() {
    var context = this
    var args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 如果已经执行过，不再执行
      var callNow = !timeout
      timeout = setTimeout(function() {
        timeout = null
      }, wait)
      if (callNow) result = func.apply(context, args)
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, wait)
    }
    return result
  }
  debounced.cancel = function() {
    clearTimeout(timeout)
    timeout = null
  }
  return debounced
}
/**
 * [jumpToPage 跳转函数]
 * @param  {[Object]} history          [router的history参数]
 * @param  {[String]} url              [跳转的路由]
 * @param  {Object} [params={}]      [需要带入的额外参数]
 * @param  {String} [type='default'] [跳转时是否需要关闭当前页面 default:不需要 replace:需要]
 */
export const jumpToPage = ({ history, url, params = {}, type = 'default' }) => {
  if (type === 'default') {
    history.push(url, params)
  } else {
    history.replace(url, params)
  }
}
/**
 * [string2String 将字符串首字母变更为大写]
 * @param  {[String]} str [需变更的字符串]
 * @return {[String]}     [变更后的字符串]
 */
export const string2String = str => {
  const len = str.length
  const newString = str.substr(0, 1).toUpperCase() + str.substr(1, len)
  return newString
}

/* [searchToParams 获取search中的数据]
 * @return { [JSON]}[键值对数据]
 */
export const searchToParams = type => {
  const data = {}
  const { search } = window.location
  let realSearch = search.substring(1, search.length)
  if (type === 'login') {
    realSearch = realSearch.replace(/\|\|/g, '&')
  }
  realSearch.split('&').map(res => {
    const resArray = res.split('=')
    let urlParams = ''
    resArray.map((dt, inx) => {
      if (inx > 0) {
        if (urlParams) {
          urlParams += `=${dt}`
        } else {
          urlParams += `${dt}`
        }
      }
      return dt
    })
    data[resArray[0]] = urlParams ? decodeURI(urlParams) : ''
    return res
  })
  return data
}
/**
 * 检测浏览器window.search是否有指定字段
 * @param {String} name 判断名字
 */
export const getQueryStringByName = name => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return r[2]
  }
  return null
}
/**
 * [addZero 添0函数]
 * @param {[string]} str [修改的字符串]
 */
export const addZero = str => {
  const newStr = str + ''
  if (newStr.length > 1) {
    return newStr
  } else {
    return '0' + newStr
  }
}
/**
 * 日期格式化
 * * @param {date} date 需转换的时间
 * * @param {string: all date time} type 转换后的格式
 */
export const dataFormat = (date, type = 'all') => {
  let string = ''
  switch (type) {
    case 'all':
      string = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
        date.getDate()
      )} ${addZero(date.getHours())}:${addZero(date.getMinutes())}:${addZero(
        date.getSeconds()
      )}`
      break
    case 'date':
      string = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(
        date.getDate()
      )}`
      break
    case 'time':
      string = `${addZero(date.getHours())}:${addZero(
        date.getMinutes()
      )}:${addZero(date.getSeconds())}`
      break
    default:
      break
  }
  return string
}
/**
 * [setCookie 设置cookie]
 * @param {[string]} name  [cookie名]
 * @param {[string]} value [cookie值]
 * @param {[number]} day   [缓存时间]
 */
export const setCookie = (name, value, day) => {
  if (day !== 0) {
    //当设置的时间等于0时，不设置expires属性，cookie在浏览器关闭后删除
    var expires = day * 24 * 60 * 60 * 1000
    var date = new Date(+new Date() + expires)
    document.cookie =
      name + '=' + escape(value) + ';expires=' + date.toUTCString()
  } else {
    document.cookie = name + '=' + escape(value)
  }
}
/**
 * [uncode 解码]
 * @param  {[string]} str [需解码的字段]
 * @return {[type]}        [description]
 */
export const uncode = (str = '', type = 'default') => {
  str = str || ''
  if (type === 'default') {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  } else {
    let newStr = str
      .replace(/&lt;script&gt;/g, '&script&')
      .replace(/&lt;\/script&gt;/g, '&/script&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    return newStr
      .replace(/&script&/g, '&lt;script&gt;')
      .replace(/&\/script&/, '&lt;/script&gt;')
  }
}

/**

  * @param {*需要加密的字符串 注：对象转化为json字符串再加密} word

  * @param {*aes加密需要的key值，这个key值后端同学会告诉你} keyStr

  */

export const encrypt = (word, keyStr) => {
  // 加密
  var key = CryptoJS.enc.Utf8.parse(keyStr)

  var srcs = CryptoJS.enc.Utf8.parse(word)

  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }) // 加密模式为ECB，补码方式为PKCS5Padding（也就是PKCS7）

  return encrypted.toString()
}

export const decrypt = (word, keyStr) => {
  // 解密

  var key = CryptoJS.enc.Utf8.parse(keyStr)

  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
