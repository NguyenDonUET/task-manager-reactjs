function isDateBeforeNow(dateString: string) {
  const currentDate = new Date()
  const targetDate = new Date(dateString)

  return targetDate < currentDate
}

export default isDateBeforeNow
