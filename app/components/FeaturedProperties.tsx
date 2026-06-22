'use client'
import { Bed, Bath, Square, MapPin } from 'lucide-react'

interface Property {
  id: number
  title: string
  location: string
  price: string
  beds: number
  baths: number
  sqft: number
  image: string
  tag: string
  tagColor: 'amber' | 'green' | 'blue'
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Sunset Villa Heights',
    location: 'Beverly Hills, CA',
    price: '$2.4M',
    beds: 5,
    baths: 4,
    sqft: 4200,
    image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Featured',
    tagColor: 'amber',
  },
  {
    id: 2,
    title: 'Downtown Sky Loft',
    location: 'Manhattan, NY',
    price: '$1.15M',
    beds: 3,
    baths: 2,
    sqft: 2150,
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Just Listed',
    tagColor: 'green',
  },
  {
    id: 3,
    title: 'Malibu Seascape',
    location: 'Malibu, CA',
    price: '$3.95M',
    beds: 6,
    baths: 5,
    sqft: 5800,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
    tag: 'Ocean View',
    tagColor: 'blue',
  },
]

const tagColors: Record<Property['tagColor'], string> = {
  amber: 'bg-amber-600',
  green: 'bg-green-600',
  blue: 'bg-blue-600',
}

const FeaturedProperties: React.FC = () => {
  return (
    <section id="properties" className="py-20 px-5 lg:px-8 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold tracking-wide uppercase text-sm">
            Handpicked for you
          </span>
          <h2 className="font-serif-alt text-4xl md:text-5xl font-bold text-gray-800 mt-2">
            Featured Properties
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">
            Discover our most exclusive listings — modern architecture, prime locations, and
            unmatched value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg card-hover transition"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={property.image}
                  alt={property.title}
                />
                <div
                  className={`absolute top-4 left-4 ${tagColors[property.tagColor]} text-white text-xs px-3 py-1 rounded-full`}
                >
                  {property.tag}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{property.title}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      <MapPin size={14} className="text-amber-500" /> {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-amber-600">{property.price}</span>
                  </div>
                </div>
                <div className="flex justify-between border-t border-gray-100 mt-4 pt-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Bed size={18} /> {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={18} /> {property.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square size={18} /> {property.sqft} sqft
                  </span>
                </div>
                <button className="mt-5 w-full border border-gray-300 rounded-xl py-2 font-medium hover:bg-amber-50 hover:border-amber-300 transition">
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition">
            Browse All Properties →
          </button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProperties