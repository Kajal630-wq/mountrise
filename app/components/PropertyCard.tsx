import Link from 'next/link'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

interface PropertyCardProps {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  image: string
  tag?: string
  tagColor?: 'amber' | 'green' | 'blue'
}

const tagColors = {
  amber: 'bg-amber-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  title,
  location,
  price,
  beds,
  baths,
  sqft,
  image,
  tag,
  tagColor = 'amber',
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/properties/${id}`}>
        <div className="relative h-64 overflow-hidden cursor-pointer">
          <img className="w-full h-full object-cover hover:scale-105 transition duration-500" src={image} alt={title} />
          {tag && (
            <div className={`absolute top-4 left-4 ${tagColors[tagColor]} text-white text-xs px-3 py-1 rounded-full`}>
              {tag}
            </div>
          )}
        </div>
      </Link>
      <div className="p-5">
        <Link href={`/properties/${id}`}>
          <h3 className="text-xl font-bold hover:text-amber-600 transition cursor-pointer">{title}</h3>
        </Link>
        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
          <MapPin size={14} className="text-amber-500" /> {location}
        </p>
        <div className="flex justify-between border-t border-gray-100 mt-4 pt-4 text-gray-600">
          <span className="flex items-center gap-1"><Bed size={18} /> {beds} Beds</span>
          <span className="flex items-center gap-1"><Bath size={18} /> {baths} Baths</span>
          <span className="flex items-center gap-1"><Square size={18} /> {sqft} sqft</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold text-amber-600">{price}</span>
          <Link href={`/properties/${id}`}>
            <button className="px-4 py-2 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition text-sm">
              View Details →
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard