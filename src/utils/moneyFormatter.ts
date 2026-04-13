export function formatMoneyToMillion(money: number): string {
  return `$${(money / 1000000).toFixed(2)}M`
}