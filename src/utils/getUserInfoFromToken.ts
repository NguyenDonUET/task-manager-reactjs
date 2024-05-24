import { jwtDecode } from "jwt-decode"
import { UserType } from "../redux/user/userSlice"

function getUserInfoFromToken(token: string): UserType | null {
  try {
    const decodedToken: UserType = jwtDecode(token)
    const userId = decodedToken.userId
    const username = decodedToken.username
    const email = decodedToken.email

    return { userId, username, email }
  } catch (error) {
    console.error("Lỗi khi giải mã token:", error)
    return null
  }
}
export default getUserInfoFromToken
