import { jwtDecode } from "jwt-decode"

function isValidateToken(token: string) {
  try {
    if (!token) {
      return false
    }
    const decodedToken = jwtDecode(token)
    const currentTimeInSeconds = Date.now()

    return decodedToken.exp! < currentTimeInSeconds
  } catch (error) {
    return false
  }
}
export default isValidateToken
