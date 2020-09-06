import request from '@/utils/request';

export function login(info) {
    return request({
        url: '/login',
        method: 'post',
        params: info,
    })
}

export function getUserInfo() {
    return request({
        url: '/getUserInfo',
        method: 'post'
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getCaptchaImg() {
    return request({
        url: '/captchaImage',
        method: 'get'
    })
}

