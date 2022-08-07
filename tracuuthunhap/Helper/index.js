export function getHeader () {
  const rToken = window.localStorage.getItem('accessToken')
  return {
    Authorization: rToken,
  }
}
