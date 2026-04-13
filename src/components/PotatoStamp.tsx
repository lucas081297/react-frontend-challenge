function findStamp(vote: number): string {
  if (vote <= 4) {
    return 'Pure.png'
  }
  if (vote > 4 && vote <= 7) {
    return 'Batata_Onda.png'
  }
  if (vote > 7 && vote <= 8) {
    return 'Batata_Divina.png'
  }
  if (vote > 8) {
    return 'Absolute_Cinema.png'
  }
  return 'Batata_Onda.png'
}

export function PotatoStamp({ vote, size }: { vote: number; size?: number }) {
  const stamp = findStamp(vote)

  return (
    <div
      style={{ width: `${size ?? 35}%`, height: `${size ?? 35}%` }}
    >
      <img
        className="w-full h-full object-cover"
        src={`/selos/${stamp}`}
        alt="potato-stamp"
      />
    </div>
  )
}
