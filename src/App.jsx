
import { useState, useEffect } from "react"
import Navbar from "./Components/Navbar"
import MovieCard from "./Components/MovieCard"
import Watchlist from "./Components/Watchlist"
import { Search, Loader2 } from "lucide-react"

const App = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("Avengers") // Default search
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Watchlist stored in LocalStorage for persistence
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("cinetrack_watchlist")
    return saved ? JSON.parse(saved) : []
  })

  // API Key from .env
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cinetrack_watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  // Fetch movies from OMDb API
  const fetchMovies = async (query) => {
    if (!query || query.length < 3) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
      const data = await response.json()
      
      if (data.Response === "True") {
        setMovies(data.Search)
      } else {
        setError(data.Error)
        setMovies([])
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.")
    } finally {
      setLoading(false)
    }
  }

  // Initial fetch and search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchMovies(searchQuery)
    }, 500) // Debounce for 500ms

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  const toggleWatchlist = (movie) => {
    const isBookmarked = watchlist.find(m => m.imdbID === movie.imdbID)
    if (isBookmarked) {
      setWatchlist(watchlist.filter(m => m.imdbID !== movie.imdbID))
    } else {
      setWatchlist([...watchlist, movie])
    }
  }

  const handleRandomPick = () => {
    if (watchlist.length > 0) {
      const randomMovie = watchlist[Math.floor(Math.random() * watchlist.length)]
      alert(`🎥 Random Recommendation:\n\nTitle: ${randomMovie.Title}\nYear: ${randomMovie.Year}\nEnjoy your movie night!`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex flex-col lg:flex-row">
        {/* Main Search Area (70%) */}
        <div className="lg:w-[70%] min-h-screen p-8 border-r-0 lg:border-r-4 border-black">
          
          <div className="mb-12">
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-tight mb-8">
              Find your next <span className="bg-[#FFEE00] px-4 -rotate-2 inline-block">Obsession</span>
            </h2>

            <div className="flex w-full border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter movie title..." 
                className="flex-1 p-6 text-2xl font-black uppercase outline-none placeholder:text-gray-200"
              />
              <button 
                onClick={() => fetchMovies(searchQuery)}
                className="bg-black text-white px-12 font-black text-xl uppercase flex items-center gap-2 active:bg-gray-800"
              >
                <Search strokeWidth={3} />
                Search
              </button>
            </div>
          </div>

          {/* Movie Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Loader2 className="animate-spin mb-4" size={48} />
                <p className="font-black text-2xl uppercase tracking-tighter">Searching Archive...</p>
            </div>
          ) : error ? (
            <div className="border-4 border-black p-12 text-center bg-gray-50 flex items-center justify-center">
                <p className="font-black text-4xl uppercase opacity-20">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {movies.map(movie => (
                <MovieCard 
                  key={movie.imdbID} 
                  movie={movie} 
                  isBookmarked={watchlist.some(m => m.imdbID === movie.imdbID)}
                  onToggleWatchlist={toggleWatchlist}
                />
              ))}
            </div>
          )}
        </div>

        {/* Watchlist Sidebar (30%) */}
        <div className="lg:w-[30%] bg-gray-50 bg-opacity-30 border-t-4 lg:border-t-0 border-black">
          <Watchlist 
            watchlist={watchlist} 
            onRemove={(id) => setWatchlist(watchlist.filter(m => m.imdbID !== id))}
            onRandomPick={handleRandomPick}
          />
        </div>
      </div>
    </div>
  )
}

export default App

