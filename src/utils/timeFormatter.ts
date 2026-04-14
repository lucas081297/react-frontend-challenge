export function formatTimeFromMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursPart = hours > 0 ? `${hours}h` : ''
  const minutesPart = remainingMinutes > 0 ? `${remainingMinutes}m` : ''

  return `${hoursPart} ${minutesPart}`.trim()
}