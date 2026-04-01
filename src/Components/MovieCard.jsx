import { Bookmark, Star } from "lucide-react"

const MovieCard = ({ movie, onToggleWatchlist, isBookmarked }) => {
    return (
        <div className="bg-white border-4 border-black relative group hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0 active:translate-y-0">
            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                />
                
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                    <span className="bg-[#FFEE00] border-2 border-black text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">
                        {movie.Year}
                    </span>
                    {movie.imdbRating && (
                        <span className="bg-[#FF4444] border-2 border-black text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-tighter">
                            {movie.imdbRating} IMDB
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 border-t-4 border-black">
                <h3 className="font-black text-xl leading-tight uppercase mb-4 line-clamp-2 min-h-[3rem]">
                    {movie.Title}
                </h3>
                
                <button 
                    onClick={() => onToggleWatchlist(movie)}
                    className={`w-full py-3 border-2 border-black font-black uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                        isBookmarked 
                        ? "bg-black text-white" 
                        : "bg-white hover:bg-[#FFEE00] active:bg-[#FFEE00]"
                    }`}
                >
                    <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
                    {isBookmarked ? "In Watchlist" : "Watchlist"}
                </button>
            </div>
        </div>
    )
}

export default MovieCard
