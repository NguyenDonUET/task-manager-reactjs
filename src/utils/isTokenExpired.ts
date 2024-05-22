import { jwtDecode } from "jwt-decode"

function isTokenExpired(token: string) {
  try {
    const decodedToken = jwtDecode(token)
    const currentTimeInSeconds = Date.now() / 1000

    return decodedToken.exp! < currentTimeInSeconds
  } catch (error) {
    return false
  }
}
export default isTokenExpired
