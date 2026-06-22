'use client'
import { MapPin, Search, Sliders } from 'lucide-react'

const SearchBar: React.FC = () => {
  return (
    <div className="container mx-auto px-5 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Location</label>
          <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2 focus-within:border-amber-500">
            <MapPin className="text-amber-500 mr-2" size={18} />
            <input
              type="text"
              placeholder="New York, LA, Miami"
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Property Type</label>
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:border-amber-500 bg-white">
            <option>All Types</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>Condo</option>
            <option>Penthouse</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 text-sm font-semibold mb-1">Budget Range</label>
          <select className="w-full border border-gray-300 rounded-xl px-3 py-2 outline-none focus:border-amber-500">
            <option>$0 - $500k</option>
            <option>$500k - $1M</option>
            <option>$1M - $3M</option>
            <option>$3M+</option>
          </select>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition flex justify-center items-center gap-2">
          <Sliders size={18} /> Search Properties
        </button>
      </div>
    </div>
  )
}

export default SearchBar