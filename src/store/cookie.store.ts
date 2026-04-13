import { Cookies } from 'react-cookie'

const cookies = new Cookies()

export function getToken() {
  return !!cookies.get('token')
}

export function setToken(token: string) {
  cookies.set('token', token, {
    path: '/',
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    sameSite: 'lax',
  })
}

export function removeToken() {
  cookies.remove('token', { path: '/' })
}

