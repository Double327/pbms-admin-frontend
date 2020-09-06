import cookie from 'js-cookie';
import config from '@/config';

const tokenKey = config.tokenKey;

export function setToken(token) {
    cookie.set(tokenKey, token);
}

export function getToken() {
    return cookie.get(tokenKey);
}

export function removeToken() {
    cookie.remove(tokenKey);
}