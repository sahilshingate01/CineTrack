import { Search } from "lucide-react"

const Navbar = () => {
  return (
    <div className="h-20 flex items-center justify-between p-4">
      <div>
        <h1 className="font-bold text-3xl text-black  font-sans tracking-widest uppercase">CINELIST</h1>
      </div>
      <div className="h-8 w-8 bg-amber-300 border-2 flex items-center justify-center p-3">
        <button className=""> <Search size={22} /> </button>
      </div>
      
    </div>
  )
}

export default Navbar
