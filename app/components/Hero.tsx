'use client'
import { Search, Calendar, Home, Building2, Users, Award } from 'lucide-react'

interface Stat {
  value: string
  label: string
  icon: React.ElementType
}

const Hero: React.FC = () => {
  const stats: Stat[] = [
    { value: '500+', label: 'Luxury Listings', icon: Home },
    { value: '120+', label: 'Happy Families', icon: Users },
    { value: '98%', label: 'Satisfaction Rate', icon: Award },
    { value: '24/7', label: 'Expert Support', icon: Building2 },
  ]

  return (
    <section
      id="home"
      className="relative w-full h-screen max-h-[700px] md:max-h-[85vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      }}
    >
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="relative container mx-auto px-6 lg:px-12 text-white z-10">
        <span className="inline-block bg-amber-600/80 backdrop-blur-sm text-sm font-semibold px-4 py-1 rounded-full mb-5">
          🏡 Find Your Dream Home
        </span>
        <h1 className="font-serif-alt text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-3xl">
          Where Luxury Meets Comfort
        </h1>
        <p className="text-lg md:text-xl text-gray-100 max-w-xl mt-5 mb-8">
          Discover exclusive properties, modern apartments, and premium villas curated just for
          you.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-full font-semibold shadow-lg transition flex items-center gap-2">
            <Search size={18} /> Explore Now
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition flex items-center gap-2">
            <Calendar size={18} /> Schedule Tour
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90 flex items-center gap-1">
                <stat.icon size={14} /> {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero