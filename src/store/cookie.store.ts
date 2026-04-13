import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

export function getToken(): boolean {
  const token = Cookies.get(TOKEN_KEY)
  console.log('getToken called, token found:', !!token)
  return !!token
}

export function setToken(token: string) {
  console.log('setToken called')
  Cookies.set(TOKEN_KEY, token, {
    path: '/',
    expires: 7, // 7 days
    sameSite: 'lax',
  })
}

export function removeToken() {
  console.log('removeToken called')
  Cookies.remove(TOKEN_KEY, { path: '/' })
}
