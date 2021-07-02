import request from '@/utils/request' // 先找request.js 再找request/index.js
import qs from 'qs' // qs在vue中默认下载了

// 导出方法（推荐一个一个导出）
// 方法名： http请求方式 + 模块名 + Api

// 访客记录接口
export const getUserHistoryApi = params => { // params:{pagenum, pagesize, uname, starrt_name, end_time}
  return request({
    url: 'users/history.php',
    params
  }).then(res => res.data) 
} 


export const getUsersApi = params => { // params:{pagenum, pagesize, uname, starrt_name, end_time} }
  return request({
    url: 'users/index.php',
    params
  }).then(res => res.data)
}

export const putUserStateApi = params => {
  // params = {user_id, state}
  return request({
    method: 'put',
    url: 'users/state.php',
    data: qs.stringify(params),
  })
    .then(res => res.data)
}

// export const deleteUserApi = params => { // params = {user_id: 1}
export const deleteUserApi = userId => { // 只有一个参数时可以这么写
  return request({
    method: 'delete',
    url: 'users/delete.php',
    params: {user_id: userId}
  })
  .then(res => res.data)
}

export const createUserApi = params => {
  return request({
    method: 'post',
    url: 'users/create.php',
    data: qs.stringify(params),
  })
  .then(res => res.data)
}

export const putUserRoleApi = params => { 
  return request({
    method: 'put',
    url: 'users/assign.php',
    data: qs.stringify(params),
  })
  .then(res => res.data)
}