const uuid = require('uuid')
const crypto = require('crypto')

/* ********* return [String, Array, Object, etc.]********* */

function genGuid (flag = false) {
  if (flag) return '{' + uuid.v1() + '}'
  return uuid.v1()
}

function trim (param) {
  var vRet = param
  if (vRet === '' || vRet === undefined) return vRet
  while (true) {
    if (vRet.indexOf(' ') === 0) {
      vRet = vRet.substring(1, parseInt(vRet.length))
    } else if ((parseInt(vRet.length) !== 0) && (vRet.lastIndexOf(' ') === parseInt(vRet.length) - 1)) {
      vRet = vRet.substring(0, parseInt(vRet.length) - 1)
    } else {
      return vRet
    }
  }
}

function encrypt (str, secret) {
  let cipher = crypto.createCipher('aes192', secret)
  let enc = cipher.update(str, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}

function decrypt (str, secret) {
  let decipher = crypto.createDecipher('aes192', secret)
  let dec = decipher.update(str, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

function MD5 (str) {
  let result = crypto.createHash('md5').update(str.toString()).digest('hex')
  return result
}

function getCookiesInServer (cookie) {
  let Cookies = {}
  cookie && cookie.split(';').forEach(function (Cookie) {
    let parts = Cookie.split('=')
    Cookies[parts[0].trim()] = (parts[1] || '').trim()
  })
  return Cookies
}

function setCookieInClient (name, value, minutes, onlyRoot = false) {
  let exp = new Date()
  exp.setTime(exp.getTime() + minutes * 60 * 1000)
  let cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
  if (onlyRoot) cookie += ';path=/'
  document.cookie = cookie
}

function getCookieInClient (name) {
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  let arr = document.cookie.match(reg)
  if (arr) return unescape(arr[2])
  return null
}

function clearCookieInClient (name) {
  var exp = new Date()
  exp.setTime(exp.getTime() - 1)
  var cval = getCookieInClient(name)
  if (cval) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
  }
}

function setToken (tokenValue) {
  setCookieInClient('token', tokenValue, 60 * 24 * 7, true)
}

function deepCopyElm (vnodes, createElement) {
  function cloneVNode (vnode) {
    const clonedChildren = vnode.children && vnode.children.map(vnode => cloneVNode(vnode))
    const cloned = createElement(vnode.tag, vnode.data, clonedChildren)
    cloned.text = vnode.text
    cloned.isComment = vnode.isComment
    cloned.componentOptions = vnode.componentOptions
    cloned.elm = vnode.elm
    cloned.context = vnode.context
    cloned.ns = vnode.ns
    cloned.isStatic = vnode.isStatic
    cloned.key = vnode.key

    return cloned
  }

  const clonedVNodes = vnodes.map(vnode => cloneVNode(vnode))
  return clonedVNodes
}

function formatMoney (number, places = 2, symbol = '￥', thousand = ',', decimal = '.') {
  number = parseInt(number) || 0
  symbol = symbol !== undefined ? symbol : '$'
  let negative = number < 0 ? '-' : ''

  let i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
  let len = i.length
  let j = len > 3 ? len % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}

function genRanColor () {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6)
}

function unique (arr) {
  let result = []
  let hash = {}
  for (let i = 0, elem; (elem = arr[i]) != null; i++) {
    if (!hash[elem]) {
      result.push(elem)
      hash[elem] = true
    }
  }
  return result
}

function genMixCode (size = 6) {
  size = size || 6
  var codeString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var maxNum = codeString.length + 1
  var newPass = ''
  while (size > 0) {
    newPass += codeString.charAt(Math.floor(Math.random() * maxNum))
    size -= 1
  }
  return newPass
}

function genNumCode (size = 6) {
  let tmpCode = []
  for (var i = 0; i < size; i++) {
    tmpCode.push(Math.floor(Math.random() * 10))
  }
  return tmpCode.join('')
}

function parseIP (str) {
  let REG = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return REG.exec(str)
}

function ip2Int (strIP) {
  let collection = parseIP(strIP)
  if (collection.length !== 5) return -1
  return (parseInt(collection[1]) * 0x1000000 +
    parseInt(collection[2]) * 0x10000 +
    parseInt(collection[3]) * 0x100 +
    parseInt(collection[4]))
}

function intToIp (ip) {
  if (ip < 0 || ip > 0xFFFFFFFF) {
    return ''
  }
  return (ip >> 24) + '.' + (ip >> 16 & 0xFF) + '.' + (ip >> 8 & 0xFF) + '.' + (ip & 0xFF)
}

/* ********* return Bool********* */

function hasValue (value) {
  return isEmptyValue(value) ? false : value
}

function isEmptyValue (value) {
  var type
  if (value == null) return true
  type = Object.prototype.toString.call(value).slice(8, -1)
  switch (type) {
    case 'String':
      return !trim(value)
    case 'Array':
      return !value.length
    case 'Object':
      return isEmptyObject(value)
    default:
      return false
  }
}

function isEmptyObject (obj) {
  for (var name in obj) return false
  return true
}

// 判断参数是否是其中之一
function oneOf (value, validList, ignoreIndex = -1) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i] && ignoreIndex !== i) {
      return true
    }
  }
  return false
}

function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

function isIP (str) {
  return !!str.match(/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/)
}

function isMD5 (str) {
  return !!str.match(/^[a-fA-F0-9]{32}\/?$/)
}

function isPositiveInt (num) {
  let _num = parseInt(num)
  if (isNaN(_num)) return false
  return _num === (_num | 0) ? _num : false
}

function isMobileOrEmail (value) {
  var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  var mobileRE = /^1[3|4|5|7|8][0-9]{9}$/
  var type = -1

  if (mobileRE.test(value)) type = 0
  else if (emailRE.test(value)) type = 1
  return type
}

// 去抖动
function debounce (func, delay, immediate) {
  let timer = null

  return function () {
    let context = this
    var args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let playNow = !timer
      timer = setTimeout(() => { timer = null }, delay)
      if (playNow) func.apply(context, args)
    } else {
      timer = setTimeout(function () { func.apply(context, args) }, delay)
    }
  }
}

// 节流
function throttle (func, delay) {
  var timer = null
  var startTime = Date.now()

  return function () {
    let curTime = Date.now()
    let remaining = delay - (curTime - startTime)

    if (timer) clearTimeout(timer)
    if (remaining <= 0) {
      func.apply(this, arguments)
      startTime = Date.now()
    } else {
      timer = setTimeout(func, remaining)
    }
  }
}

module.exports = {
  clearCookieInClient,
  deepCopyElm,
  formatMoney,
  getCookiesInServer,
  getCookieInClient,
  genGuid,
  genRanColor,
  hasValue,
  isArray,
  isEmptyValue,
  isEmptyObject,
  isIP,
  isMD5,
  isPositiveInt,
  MD5,
  oneOf,
  setCookieInClient,
  setToken,
  trim,
  unique,
  debounce,
  throttle,
  encrypt,
  decrypt,
  genMixCode,
  genNumCode,
  ip2Int,
  intToIp,
  isMobileOrEmail
}
