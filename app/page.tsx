'use client';
import { useQuery } from '@tanstack/react-query';
import { propertyAPI } from '@/lib/api';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar, FaQuoteLeft, FaSearch, FaWhatsapp } from 'react-icons/fa';
import { useState } from 'react';

const MOCK_PROPERTIES = [
  { id: 1, title: 'Luxury Villa with Ocean View', price: '1,25,00,000', location: 'Noida, UP', beds: 5, baths: 4, sqft: 4200, image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', status: 'For Sale', type: 'Apartment' },
  { id: 2, title: 'Modern Downtown Apartment', price: '85,00,000', location: 'Gurgaon, HR', beds: 3, baths: 2, sqft: 1800, image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg', status: 'For Sale', type: 'Villa' },
  { id: 3, title: 'Beachfront Condo', price: '95,00,000', location: 'Greater Noida, UP', beds: 2, baths: 2, sqft: 1500, image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg', status: 'For Sale', type: 'Apartment' },
];

const CITIES = [
  { name: 'Noida', count: 33, image: 'https://images.pexels.com/photos/1486785/pexels-photo-1486785.jpeg' },
  { name: 'Gurgaon', count: 41, image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg' },
  { name: 'Greater Noida', count: 12, image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg' },
  { name: 'Mumbai', count: 8, image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg' },
  { name: 'Pune', count: 5, image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg' },
  { name: 'Ghaziabad', count: 1, image: 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg' },
];

const PROPERTY_TABS = ['View All', 'Apartment', 'Villa', 'Independent House', 'Builder Floor', 'Penthouse', 'Plot/Land'];

const TESTIMONIALS = [
  { id: 1, name: 'Rohit Sharma', role: 'IT Professional', initials: 'RS', text: 'I was searching for a 2BHK flat in Noida for over two months. This portal made it so easy to compare listings and finalize the deal. Found my dream home within a week!', rating: 5 },
  { id: 2, name: 'Ankita Mehta', role: 'Marketing Executive', initials: 'AM', text: 'I moved to Gurgaon for work and needed a rental urgently. The site helped me filter by budget and location. Within two days, I finalized a fully furnished house. Super smooth!', rating: 5 },
  { id: 3, name: 'Vikas Sethi', role: 'Business Owner', initials: 'VS', text: 'We were looking for a spacious home in Gurugram for our family. The verified listings saved us a lot of time. Highly recommend this platform!', rating: 5 },
];

const BLOGS = [
  { id: 1, title: 'UDS in Flats: What It Means and How to Calculate It', date: '11 December, 2025', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg', excerpt: 'Buying property involves many technical terms, and understanding UDS is crucial for every buyer...' },
  { id: 2, title: 'Sudden Hike in Haryana Circle Rates: What Buyers Should Know', date: '3 August, 2025', image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg', excerpt: 'The Haryana government has implemented a significant hike in circle rates affecting stamp duty...' },
  { id: 3, title: 'Top Localities to Buy a Property in Ghaziabad', date: '3 August, 2025', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', excerpt: 'Ghaziabad, strategically located in the National Capital Region, offers great investment opportunities...' },
  { id: 4, title: '1% Stamp Duty Relief for Women Buyers on Properties up to ₹1 Crore', date: '3 August, 2025', image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg', excerpt: "In a landmark move to boost women's empowerment and property ownership..." },
];

const STATS = [
  { value: '85', label: 'Satisfied Clients' },
  { value: '112', label: 'Awards Received' },
  { value: '32', label: 'Successful Transactions' },
  { value: '66', label: 'Monthly Traffic' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('View All');
  const [searchType, setSearchType] = useState('For Sale');
  const [selectedCity, setSelectedCity] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertyAPI.getFeatured(),
    retry: 1,
  });

  // ✅ Pehle featuredProperties define karo
  const apiProperties = propertiesData?.data?.data || [];
  const featuredProperties = apiProperties.length > 0 ? apiProperties : MOCK_PROPERTIES;

  // ✅ Phir filter lagao
  const filteredProperties = activeTab === 'View All'
    ? featuredProperties
    : featuredProperties.filter((p: any) =>
        (p.type || p.property_type || '').toLowerCase() === activeTab.toLowerCase()
      );

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative w-full h-[550px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center text-white w-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">Find Your Dream Home</h1>
          <p className="text-lg mb-8 opacity-90">Perfect Home — Sure My Home</p>

          <div className="flex justify-center mb-0">
            {['For Sale', 'For Rent', 'Project'].map(tab => (
              <button
                key={tab}
                onClick={() => setSearchType(tab)}
                className={`px-6 py-2 font-semibold text-sm rounded-t-lg transition-all ${
                  searchType === tab ? 'bg-amber-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-b-xl rounded-tr-xl shadow-2xl p-4 max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              <select
                className="flex-1 min-w-[150px] px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                <option value="">Select Location</option>
                {CITIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
              <select
                className="flex-1 min-w-[150px] px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={propertyType}
                onChange={e => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
              <select className="flex-1 min-w-[150px] px-4 py-3 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500">
                <option value="">Category</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Independent House</option>
                <option>Builder Floor</option>
                <option>Penthouse</option>
                <option>Plot/Land</option>
              </select>
              <Link href="/properties">
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition duration-300">
                  <FaSearch /> Search Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Properties */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1">Newly added properties</p>
          <h2 className="text-3xl font-bold mb-6">Recommended For You</h2>

          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            {PROPERTY_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-amber-600 text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:border-amber-600 hover:text-amber-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No properties found for "{activeTab}"</p>
              <button
                onClick={() => setActiveTab('View All')}
                className="mt-4 text-amber-600 underline font-medium"
              >
                View All Properties
              </button>
            </div>
          ) : (
            // ✅ filteredProperties use ho raha hai
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property: any) => (
                <div key={property.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img src={property.image} alt={property.title} className="w-full h-52 object-cover" />
                    <span className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-3 py-1 rounded-full">
                      {property.status || 'For Sale'}
                    </span>
                    {property.tag && (
                      <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                        {property.tag}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{property.title}</h3>
                    <p className="text-amber-600 font-bold text-xl mb-2">₹ {property.price}</p>
                    <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-amber-600" /> {property.location}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <span>{property.beds} Beds</span>
                      <span>•</span>
                      <span>{property.baths} Baths</span>
                      <span>•</span>
                      <span>{property.sqft} sq.ft</span>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/properties/${property.id}`} className="flex-1">
                        <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg text-sm font-medium transition">
                          Explore
                        </button>
                      </Link>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaPhone className="text-amber-600" />
                      </button>
                      <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <FaWhatsapp className="text-green-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/properties">
              <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition duration-300">
                View All Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 px-5 bg-white">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1 text-center">Our Services</p>
          <h2 className="text-3xl font-bold mb-10 text-center">What We Do?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏠', title: 'Buy A New Home', desc: 'Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.' },
              { icon: '🔑', title: 'Rent A Home', desc: 'Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.' },
              { icon: '💰', title: 'Sell A Home', desc: "Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale." },
            ].map((s, i) => (
              <div key={i} className="text-center p-8 border border-gray-100 rounded-xl hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Cities */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1">Explore Cities</p>
          <h2 className="text-3xl font-bold mb-10">Most Popular Places</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map(city => (
              <Link href={`/properties?city=${city.name}`} key={city.name}>
                <div className="relative rounded-xl overflow-hidden cursor-pointer group h-40">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-bold">{city.name}</p>
                    <p className="text-xs opacity-80">{city.count} Properties</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-5 bg-white">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1 text-center">Our Benefit</p>
          <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🏆', title: 'Proven Expertise', desc: 'Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.' },
              { icon: '✅', title: 'Customized Solutions', desc: 'We pride ourselves on crafting personalized strategies to match your unique goals, ensuring a seamless real estate journey.' },
              { icon: '🤝', title: 'Transparent Partnerships', desc: 'Transparency is key in our client relationships. We prioritize clear communication and ethical practices throughout.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-5 bg-gray-50">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1 text-center">Top Properties</p>
          <h2 className="text-3xl font-bold mb-4 text-center">What People Say</h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">Our seasoned team excels in real estate with years of successful market navigation.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white p-8 rounded-xl shadow-md">
                <FaQuoteLeft className="text-amber-600 text-2xl mb-4 opacity-40" />
                <p className="text-gray-700 mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">{t.initials}</div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                    <div className="flex text-amber-500 text-sm mt-1">{[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-5 bg-white">
        <div className="container mx-auto">
          <p className="text-amber-600 text-sm font-semibold uppercase mb-1">Latest News</p>
          <h2 className="text-3xl font-bold mb-10">News, Tips & Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOGS.map(blog => (
              <div key={blog.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="p-4">
                  <p className="text-xs text-gray-400 mb-2">{blog.date}</p>
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-500 text-xs line-clamp-2">{blog.excerpt}</p>
                  <button className="text-amber-600 text-xs font-semibold mt-3 hover:underline">Read More..</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog">
              <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full font-semibold transition">View All Blog</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-5 bg-amber-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="text-5xl font-bold mb-2">{s.value}</div>
                <div className="opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-5 bg-gray-50" id="contact">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Contact <span className="text-amber-600">Us</span></h2>
            <p className="text-gray-500">Have questions? Our team will get back to you shortly.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                { icon: FaMapMarkerAlt, title: 'Address', text: 'F8-GF03, Ground Floor, Centurian Park, Sector Techzone 4' },
                { icon: FaPhone, title: 'Phone', text: '8376844955' },
                { icon: FaEnvelope, title: 'Email', text: 'vivek.kushwaha802@gmail.com' },
                { icon: FaClock, title: 'Working Hours', text: 'Mon–Fri: 9AM–6PM | Sat: 10AM–4PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full"><item.icon className="text-amber-600 text-xl" /></div>
                  <div><h4 className="font-semibold">{item.title}</h4><p className="text-gray-600 text-sm">{item.text}</p></div>
                </div>
              ))}
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-6">Send us a Message</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                <textarea rows={4} placeholder="Tell us about your requirements..." className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none resize-none"></textarea>
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition">Send Message</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}