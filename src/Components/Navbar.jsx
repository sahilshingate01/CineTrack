import { Bell, Search } from "lucide-react"

const Navbar = () => {
    return (
        <div className="h-20 flex items-center justify-between px-8 border-b-4 border-black bg-white">
            <div className="flex items-center gap-12">
                <h1 className="font-black text-3xl tracking-tighter">CINELIST</h1>
                <nav className="hidden md:flex gap-8 font-bold text-sm uppercase tracking-wide">
                    <a href="#" className="border-b-4 border-black pb-1">Movies</a>
                    <a href="#" className="text-gray-500 hover:text-black">Series</a>
                    <a href="#" className="text-gray-500 hover:text-black">Trending</a>
                    <a href="#" className="text-gray-500 hover:text-black">Discover</a>
                </nav>
            </div>
            
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-[#FFEE00] border-2 border-black flex items-center justify-center cursor-pointer hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none transition-all">
                    <Search size={20} strokeWidth={3} />
                </div>
            </div>
        </div>
    )
}

export default Navbar

