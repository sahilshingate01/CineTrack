import { X, Play } from "lucide-react"

const Watchlist = ({ watchlist, onRemove, onRandomPick }) => {
    return (
        <div className="h-full bg-white flex flex-col p-8 sticky top-20">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="font-black text-4xl leading-none uppercase">Watchlist</h2>
                    <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Your Curated Archive</p>
                </div>
                <div className="bg-[#00FF88] border-4 border-black px-4 py-2 font-black text-2xl">
                    {watchlist.length.toString().padStart(2, '0')}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {watchlist.length === 0 ? (
                    <div className="border-4 border-dashed border-gray-200 p-8 text-center text-gray-400 font-bold uppercase text-sm">
                        Empty Archive
                    </div>
                ) : (
                    watchlist.map(movie => (
                        <div key={movie.imdbID} className="flex gap-4 p-3 border-4 border-black relative hover:-translate-x-1 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_rgba(0,0,0,1)] bg-white">
                            <div className="h-16 w-12 bg-gray-100 flex-shrink-0 border-2 border-black overflow-hidden">
                                <img src={movie.Poster} alt={movie.Title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-black text-xs uppercase truncate pr-8">{movie.Title}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                                    {movie.Type} / {movie.Year}
                                </p>
                            </div>
                            <button 
                                onClick={() => onRemove(movie.imdbID)}
                                className="absolute right-2 top-2 h-8 w-8 bg-[#FF4444] border-2 border-black flex items-center justify-center hover:scale-105 active:scale-95"
                            >
                                <X size={16} className="text-white" strokeWidth={4} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-8 space-y-6">
                <div className="h-1 bg-black w-full" />
                
                <button 
                    onClick={onRandomPick}
                    disabled={watchlist.length === 0}
                    className="w-full py-6 bg-[#00FF88] border-4 border-black font-black text-2xl uppercase tracking-tighter hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 shadow-[6px_6px_0px_rgba(0,0,0,1)] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Random Pick
                </button>

                <div className="space-y-2">
                    <div className="flex justify-between font-black text-[10px] uppercase">
                        <span>Archive Progress</span>
                        <span>{watchlist.length > 0 ? "75% Watched" : "0% Watched"}</span>
                    </div>
                    <div className="h-4 w-full border-2 border-black bg-white flex p-0.5">
                        <div className="h-full bg-[#00FF88] border-r-2 border-black" style={{ width: watchlist.length > 0 ? '75%' : '0%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Watchlist
