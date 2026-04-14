import { ApiHeaders, TMDBBaseUrl } from '#/services/tmdb/globals.ts'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import type { VideoResponse } from '#/models/video.ts'
import { toast } from 'sonner'

const path = 'movie'

export function getVideos(
  id: number,
  options?: Omit<UseQueryOptions<VideoResponse>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<VideoResponse>({
    queryKey: ['video-url', id],
    queryFn: () =>
      fetch(`${TMDBBaseUrl}/${path}/${id}/videos`, { headers: ApiHeaders })
        .then((res) => res.json())
        .catch(() => {
          toast.error('Erro ao carregar o video!')
        }),
    enabled: id > 0,
    ...options,
  })
}
