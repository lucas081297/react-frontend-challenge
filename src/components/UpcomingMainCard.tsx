import { getPosterUrl } from '#/services/tmdb/images/images.ts'
import { CardImage } from '#/components/CardImage.tsx'
import { getUpcomingMovies } from '#/services/tmdb/movie-lists/upcoming.ts'
import { useEffect, useState } from 'react'
import { getVideos } from '#/services/tmdb/movies/videos.ts'
import type { TrendingMovie } from '#/models/trending.ts'
import { Skeleton } from '#/components/ui/skeleton.tsx'
import { PosterSize } from '#/models/tmdb.ts'
import { useWatchListStore } from '#/store/watchList.store.ts'
import { getYouTubeUrl } from '#/utils/youtube.ts'

export function UpcomingMainCard() {
  const [page] = useState(1)
  const [upcomingMovie, setUpcomingMovie] = useState<TrendingMovie | null>(null)

  const { data, isLoading, isError } = getUpcomingMovies(page)
  const { data: videos } = getVideos(upcomingMovie?.id ?? 0)

  const { addToWatchList, removeFromWatchList } = useWatchListStore()

  const handleAddToWatchList = (movieId: number) => {
    if (!upcomingMovie || upcomingMovie.id !== movieId) return
    addToWatchList(upcomingMovie)
  }

  const handleRemoveFromWatchList = (movieId: number) => {
    removeFromWatchList(movieId)
  }

  useEffect(() => {
    if (data && data.results.length > 0 && !upcomingMovie) {
      const randomIdMovie = Math.floor(Math.random() * data.results.length)
      setUpcomingMovie(data.results[randomIdMovie])
    }
  }, [data, upcomingMovie])

  if (isLoading) {
    return <Skeleton className="aspect-video w-full" />
  }

  if (isError || !upcomingMovie) {
    return <div>Erro ao carregar filme</div>
  }

  const validVideo =
    videos?.results.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official,
    ) ?? videos?.results[0]

  return (
    <>
      <CardImage
        id={upcomingMovie.id}
        type="Main"
        average={upcomingMovie.vote_average}
        name={upcomingMovie.title}
        image={getPosterUrl(upcomingMovie.poster_path, PosterSize.Original)}
        addToWatchList={handleAddToWatchList}
        removeFromWatchList={handleRemoveFromWatchList}
        description={upcomingMovie.overview}
        video={getYouTubeUrl(validVideo?.key)}
        soon={true}
      />
    </>
  )
}