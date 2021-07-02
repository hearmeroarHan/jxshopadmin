import request from '@/utils/request'
import qs from 'qs'

export const getRolesApi = () => {
  return request({
    url: 'roles/index.php',

  })
    .then(res => res.data)
}

export const postRolesApi = params => {
  return request({
    method: 'post',
    url: 'roles/create.php',
    data: qs.stringify(params)
  })
    .then(res => res.data)
}

