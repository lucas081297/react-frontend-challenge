export function formatDateFromString(dateString: string) {
  const splitedString = dateString.split('-')
  const [year, month, day] = [
    splitedString[0],
    splitedString[1],
    splitedString[2],
  ]

  const date = new Date(+year, +month - 1, +day);

  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
