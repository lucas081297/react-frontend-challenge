import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { FilterPanel } from '#/components/FilterPanel.tsx'
import {
  type TrendingMovie,
  type TrendingTvShow,
  TrendingType,
} from '#/models/trending.ts'

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}))

const mockMovies: (TrendingMovie | TrendingTvShow)[] = [
  {
    id: 1,
    adult: false,
    media_type: TrendingType.Movie,
    title: 'The Dark Knight',
    original_title: 'The Dark Knight',
    vote_average: 9.0,
    vote_count: 25000,
    original_language: 'en',
    genre_ids: [28, 80],
    release_date: '2008-07-18',
    video: false,
    poster_path: '/poster1.jpg',
    overview: 'Batman faces the Joker',
    popularity: 100,
  },
  {
    id: 2,
    adult: false,
    media_type: TrendingType.Movie,
    title: 'Inception',
    original_title: 'Inception',
    vote_average: 8.8,
    vote_count: 22000,
    original_language: 'en',
    genre_ids: [28, 878, 12],
    release_date: '2010-07-16',
    video: false,
    poster_path: '/poster2.jpg',
    overview: 'A dream within a dream',
    popularity: 95,
  },
  {
    id: 3,
    adult: false,
    media_type: TrendingType.Movie,
    title: 'Pulp Fiction',
    original_title: 'Pulp Fiction',
    vote_average: 8.9,
    vote_count: 21000,
    original_language: 'en',
    genre_ids: [80, 53],
    release_date: '1994-10-14',
    video: false,
    poster_path: '/poster3.jpg',
    overview: 'Multiple stories intertwine',
    popularity: 90,
  },
  {
    id: 4,
    adult: false,
    media_type: TrendingType.TvShow,
    name: 'Breaking Bad',
    original_name: 'Breaking Bad',
    vote_average: 9.5,
    vote_count: 30000,
    original_language: 'en',
    genre_ids: [18, 80],
    first_air_date: '2008-01-20',
    original_country: ['US'],
    poster_path: '/poster4.jpg',
    overview: 'A chemistry teacher turns criminal',
    popularity: 98,
  },
]

const mockGenres = [
  { id: 28, name: 'Ação' },
  { id: 80, name: 'Crime' },
  { id: 878, name: 'Ficção Científica' },
  { id: 12, name: 'Aventura' },
  { id: 53, name: 'Thriller' },
  { id: 18, name: 'Drama' },
]

describe('FilterPanel', () => {
  const mockOnFilterChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render filter button', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    expect(screen.getByText('Filtros')).toBeInTheDocument()
  })

  it('should expand panel when clicking filter button', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    expect(screen.getByText('Gêneros')).toBeInTheDocument()
    expect(screen.getByText('Ordenar por')).toBeInTheDocument()
    expect(screen.getByText('Ano de Lançamento')).toBeInTheDocument()
    expect(screen.getByText('Nota Mínima')).toBeInTheDocument()
  })

  it('should display all genres', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    mockGenres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument()
    })
  })

  it('should display sort options', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByText('Gênero')).toBeInTheDocument()
    expect(screen.getByText('Rating')).toBeInTheDocument()
  })

  it('should call onFilterChange with initial sorted movies on mount', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    // Verifica se foi chamado com os filmes ordenados por título (padrão)
    expect(mockOnFilterChange).toHaveBeenCalled()
    const filteredMovies = mockOnFilterChange.mock.calls[0][0]
    expect(filteredMovies).toHaveLength(4)
  })

  it('should filter by genre', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Clica no gênero "Ação" (id: 28)
    const actionGenre = screen.getByText('Ação')
    fireEvent.click(actionGenre)

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      // Filmes com gênero 28: The Dark Knight e Inception
      expect(filteredMovies).toHaveLength(2)
      expect(
        filteredMovies.some((m: TrendingMovie | TrendingTvShow) => m.id === 1),
      ).toBe(true)
      expect(
        filteredMovies.some((m: TrendingMovie | TrendingTvShow) => m.id === 2),
      ).toBe(true)
    })
  })

  it('should filter by minimum year', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Digita ano mínimo 2009
    const minYearInput = screen.getByPlaceholderText('De')
    fireEvent.change(minYearInput, { target: { value: '2009' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      // Filmes de 2009 em diante: Inception (2010)
      expect(filteredMovies).toHaveLength(1)
      expect(filteredMovies[0].id).toBe(2)
    })
  })

  it('should filter by maximum year', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Digita ano máximo 2008
    const maxYearInput = screen.getByPlaceholderText('Até')
    fireEvent.change(maxYearInput, { target: { value: '2008' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      // Filmes até 2008: The Dark Knight (2008) e Breaking Bad (2008)
      expect(filteredMovies).toHaveLength(2)
    })
  })

  it('should filter by minimum rating', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Digita nota mínima 9.0
    const minRatingInput = screen.getByPlaceholderText('0')
    fireEvent.change(minRatingInput, { target: { value: '9.0' } })

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      // Filmes com nota >= 9.0: The Dark Knight (9.0) e Breaking Bad (9.5)
      expect(filteredMovies).toHaveLength(2)
    })
  })

  it('should sort by title ascending by default', () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filteredMovies = mockOnFilterChange.mock.calls[0][0]
    // Verifica se está ordenado alfabeticamente
    expect(filteredMovies[0].id).toBe(4) // Breaking Bad
    expect(filteredMovies[1].id).toBe(2) // Inception
    expect(filteredMovies[2].id).toBe(3) // Pulp Fiction
    expect(filteredMovies[3].id).toBe(1) // The Dark Knight
  })

  it('should toggle sort direction when clicking same sort field', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Clica em "Título" novamente para mudar direção
    const titleSort = screen.getByText('Título')
    fireEvent.click(titleSort)

    await waitFor(() => {
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      // Agora deve estar em ordem decrescente (Z-A)
      expect(filteredMovies[0].id).toBe(1) // The Dark Knight
      expect(filteredMovies[3].id).toBe(4) // Breaking Bad
    })
  })

  it('should clear all filters when clicking clear button', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Aplica um filtro
    const actionGenre = screen.getByText('Ação')
    fireEvent.click(actionGenre)

    await waitFor(() => {
      expect(mockOnFilterChange).toHaveBeenCalled()
    })

    // Verifica se o botão Limpar aparece
    const clearButton = screen.getByText('Limpar')
    expect(clearButton).toBeInTheDocument()

    // Clica em Limpar
    fireEvent.click(clearButton)

    await waitFor(() => {
      // Deve retornar todos os filmes
      const filteredMovies =
        mockOnFilterChange.mock.calls[
          mockOnFilterChange.mock.calls.length - 1
        ][0]
      expect(filteredMovies).toHaveLength(4)
    })
  })

  it('should show active filter count badge', async () => {
    render(
      <FilterPanel
        movies={mockMovies}
        availableGenres={mockGenres}
        onFilterChange={mockOnFilterChange}
      />,
    )

    const filterButton = screen.getByText('Filtros')
    fireEvent.click(filterButton)

    // Seleciona dois gêneros
    const actionGenre = screen.getByText('Ação')
    fireEvent.click(actionGenre)

    const crimeGenre = screen.getByText('Crime')
    fireEvent.click(crimeGenre)

    await waitFor(() => {
      // Deve mostrar o badge com número 2
      const badge = screen.getByText('2')
      expect(badge).toBeInTheDocument()
    })
  })
})
