export const calculateMinDate = () => {
  const today = new Date()
  let daysAdded = 0

  while (daysAdded < 5) {
    today.setDate(today.getDate() + 1) // Añadir un día
    const dayOfWeek = today.getDay() // Obtener el día de la semana (0 es domingo, 6 es sábado)

    if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Si no es sábado ni domingo
      daysAdded++
    }
  }

  return today
}
