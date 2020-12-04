import axios from "axios";
export const BaseUrl = 'http://localhost:8080/v1/';

const instance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
    timeout: 10000,     // 设置超时时间10s
    baseURL: BaseUrl   //根据自己配置的反向代理去设置不同环境的baeUrl
})
// 文档中的统一设置post请求头。下面会说到post请求的几种'Content-Type'
instance.defaults.headers.post['Content-Type'] = 'application/json'

let httpCode = {
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
}

/** 添加请求拦截器 **/
instance.interceptors.request.use(config => {
    return config
}, error => {
    return Promise.reject(error)
})

/** 添加响应拦截器  **/
instance.interceptors.response.use(response => {
    return Promise.resolve(response.data)
}, error => {
    if (error.response) {
        let tips = error.response.status in httpCode ? httpCode[error.response.status] : error.response.data.message
        alert(tips)
        return Promise.reject(error)
    } else {
        alert('请求超时, 请刷新重试')
        return Promise.reject('请求超时, 请刷新重试')
    }
})

/* 统一封装get请求 */
export const get = (url, params, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

/* 统一封装post请求  */
export const post = (url, data, config = {}) => {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
            ...config
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}