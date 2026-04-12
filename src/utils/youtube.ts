export function getYouTubeEmbedUrl(videoKey: string): string {
  return `https://www.youtube.com/embed/${videoKey}`
}

export function getYouTubeUrl(videoKey: string | undefined): string | undefined {
  if (!videoKey) return undefined
  return `https://www.youtube.com/watch?v=${videoKey}`
}
