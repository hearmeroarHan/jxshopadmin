import request from '@/utils/request'
// import qs from 'qs'

export const getMenuApi = () => {
  return request({
    url: 'auth/index.php',

  })
    .then(res => res.data)
}