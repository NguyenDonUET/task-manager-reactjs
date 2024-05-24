function isDateBeforeNow(dateString: string) {
  const targetDate = new Date(dateString).toISOString()
  const today = new Date()

  const todayString = today.toISOString().split("T")[0]

  return targetDate < todayString
}

export default isDateBeforeNow
