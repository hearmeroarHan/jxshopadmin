import request from '@/utils/request'
import qs from 'qs'

// 密保登录
export const postMbLoginApi = params => {
  return request({
    method: 'post',
    url: 'users/login.php',

    // x-www-form-urlencoded  GET数据格式  '参数名=值&'                  qs.stringify(对象)
    // application/json       JSON数据格式  '{"a":"aaa", "b": "bbb"}'   JSON.stringify(对象)
    data: qs.stringify(params)
  })
    .then(res => res.data)
}

// 短信验证码
export const postSmsApi = mobile => {
  return request({
    method: 'post',
    url: 'sms/send.php',
    data: qs.stringify({ mobile })
    // data: qs.stringify({mobile:mobile})
    // data: `mobile=${mobile}`
  })
    .then(res => res.data)
}

// 短信登录
export const postSmsLoginApi = params => {
  return request({
    method: 'post',
    url: 'sms/login.php',
    data: qs.stringify(params)
  })
    .then(res => res.data)
}

// Token登录
export const postTokenLoginApi = params => { // params = {acccount, token}
  return request({
    methods: 'post',
    url: 'token/login.php',
    data: qs.stringify(params)
  })
    .then(res => res.data)
}

// 扫码登陆
export const postCheckQRCodeApi = uuid => { // params = {state}
  return request({
    methods: 'post',
    url: 'qr/check.php',
    data: qs.stringify({state:uuid})
  })
    .then(res => res.data)
}