export const calculateMinDate = () => {
  const today = new Date()
  today.setDate(today.getDate() + 5)
  return today
}
