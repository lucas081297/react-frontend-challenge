import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { CardImage } from '#/components/CardImage.tsx'
import { getUpcomingMovies } from '#/services/tmdb/movie-lists/upcoming.ts'
import { useEffect, useState } from 'react'
import type { Video } from '#/models/video.ts'
import { getVideos } from '#/services/tmdb/movies/videos.ts'
import type { TrendingMovie } from '#/models/trending.ts'
import { Skeleton } from '#/components/ui/skeleton.tsx'

export function UpcomingMainCard() {
  const [page] = useState(1)
  const [validVideo, setValidVideo] = useState<Video | null>(null)
  const [upcomingMovie, setUpcomingMovie] = useState<TrendingMovie | null>(null)

  const {
    data,
    isLoading,
    isError,
  } = getUpcomingMovies(page)

  useEffect(() => {
    if (data && data.results.length > 1) {
      const randomIdMovie = Math.floor(Math.random() * 20)
      setUpcomingMovie(data.results[randomIdMovie])

      if (!upcomingMovie) return
      const { data: videos } = getVideos(upcomingMovie.id)

      const video =
        videos?.results.filter(
          (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official,
        )[0] ?? null

      setValidVideo(video)
    }
  }, [data])

  if (isLoading) {
    return <Skeleton className="aspect-video w-full" />
  }
  if (isError || !upcomingMovie) {
    return <div>Erro ao carregar filme</div>
  }
  return (
    <>
      <CardImage
        type="Main"
        average={upcomingMovie.vote_average}
        name={upcomingMovie.title}
        image={getPosterUrl(upcomingMovie.poster_path, 'w500')}
        description={upcomingMovie.overview}
        video={validVideo?.key}
      />
    </>
  )
}