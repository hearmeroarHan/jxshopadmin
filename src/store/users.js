// 以前：导入axios然后调用方法
// 现在：导入封装的request
// 留心：没写具体的后缀 先找request.js  再找request/index.js
import request from '@/utils/request' 
import qs from 'qs'  // 留心：在vue框架中qs不需要下载 因为重要默认下载了   

// 导出方法：推荐一个个导出
// 方法规则：http请求方式+模块名+Api
// export const getUsersHistoryApi = () => {
export const getUsersHistoryApi = params => { 
    // params ={pagenum,pagesize,uname,start_time,end_time}
    return request({
        url: 'users/history.php',
        // params: {参数名:值,....,}
        // params: params
        params
    })
    .then(res => res.data)
}


// export const getUsersApi = () => {
export const getUsersApi = params => {
    // parmas = {pagenum, pagesize, uname, start_time, end_time}
    return request({
        url: 'users/index.php',
        // parmas: params
        params,
    })
    .then(res => res.data)
}


// export const putUserStateApi = () => {
export const putUserStateApi = params => {
    
    // params = {user_id, state}    【必须】0-禁用，1-正常
    return request({
        method: 'put',
        url : 'users/state.php',
        // data: '因为默认content-type:x-www-form-urlencoded所以 get形式'
        data: qs.stringify(params)  // 会自动将对象转换为 get形式
    }) 
    .then(res => res.data)
}


// export const deleteUserApi = params => {  // params = {user_id: 1}
export const deleteUserApi = userId => {  // 
    return request({
        method: 'delete',
        url: 'users/delete.php',
        // params,
        params: {user_id: userId}
    })
    .then(res => res.data)
}


export const createUserApi = params => {
    //params = {username,password,mobile,question,answer}
    return request({
        method: 'post',
        url: 'users/create.php',
        data: qs.stringify(params)
    })
    .then(res => res.data)
}