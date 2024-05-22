import { jwtDecode } from "jwt-decode"
import isValidateToken from "./isTokenExpired"
import { UserType } from "../redux/user/userSlice"

function getUserInfoFromToken(token: string): UserType | null {
  try {
    const isExpired = isValidateToken(token)
    if (!isExpired) return null

    const decodedToken: UserType = jwtDecode(token)
    // Trích xuất thông tin người dùng từ decodedToken
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
