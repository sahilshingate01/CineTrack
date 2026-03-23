
import Navbar from "./Components/Navbar"


const App = () => {
  return (
    <div className="bg-gray-200">
      <Navbar />
      <div className="border-b-6 border-black"></div>
      
      <div className="flex min-h-screen">

        <div className="w-[70%]"></div>

        <div className="w-[30%] border-l-4 border-black"></div>

      </div>
    </div>
  )
}

export default App
