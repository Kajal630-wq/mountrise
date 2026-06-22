'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { propertyAPI } from '@/lib/api';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Bed, Bath, Square, MapPin } from 'lucide-react';

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ['properties', searchTerm],
    queryFn: () => propertyAPI.getAll({ search: searchTerm }),
  });

  // Extract properties
  let properties: any[] = [];
      console.log("properties",propertiesData)
  if (propertiesData?.data?.data?.data && Array.isArray(propertiesData.data.data.data)) {
    properties = propertiesData.data.data.data;

  } else if (propertiesData?.data && Array.isArray(propertiesData.data)) {
    properties = propertiesData.data;
  }

  return (
    <main>
      <Navbar />
      
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-5 text-center">
          <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">All Properties</h1>
          <p className="text-gray-300 mt-4">Find your dream home from our curated collection</p>
        </div>
      </section>

      <section className="py-10 px-5">
        <div className="container mx-auto">
          {/* Search */}
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property: any) => (
                <Link key={property.id} href={`/properties/${property.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                      />
                      {property.is_featured && (
                        <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs px-3 py-1 rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-bold hover:text-amber-600 transition">
                        {property.title}
                      </h3>
                      <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin size={14} className="text-amber-500" /> {property.location}
                      </p>
                      <p className="text-2xl font-bold text-amber-600 mt-2">
                        ${parseInt(property.price).toLocaleString()}
                      </p>
                      <div className="flex justify-between border-t border-gray-100 mt-4 pt-4 text-gray-600">
                        <span className="flex items-center gap-1"><Bed size={18} /> {property.beds} Beds</span>
                        <span className="flex items-center gap-1"><Bath size={18} /> {property.baths} Baths</span>
                        <span className="flex items-center gap-1"><Square size={18} /> {property.sqft} sqft</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}