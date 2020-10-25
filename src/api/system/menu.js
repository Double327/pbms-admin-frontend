import request from '@/utils/request'

export function menuList() {
    return request({
        url: '/system/menu/list',
        method: 'get',
    });
}
