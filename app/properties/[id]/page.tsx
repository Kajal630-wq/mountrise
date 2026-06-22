'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { 
  Bed, Bath, Square, MapPin, ArrowLeft, 
  Phone, Mail, Calendar, Loader2, 
  Home, Building2, Users, Star 
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { propertyAPI } from '@/lib/api';

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const { data: propertyData, isLoading, error, refetch } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyAPI.getById(id),
    enabled: !!id && !isNaN(id),
    retry: 1,
  });

  // ✅ Safe data extraction with fallback values
  const property = propertyData?.data?.data || null;
  

  // ✅ Helper function to safely format numbers
  const formatNumber = (value: any): string => {
    if (value === undefined || value === null || isNaN(value)) {
      return '0';
    }
    return Number(value).toLocaleString();
  };

  // ✅ Helper function to safely format price
  const formatPrice = (price: any): string => {
    if (!price) return 'Price on Request';
    const numPrice = parseFloat(String(price).replace(/[^0-9.]/g, ''));
    if (isNaN(numPrice)) return String(price);
    return `$${numPrice.toLocaleString()}`;
  };

  // Loading state
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto px-5 lg:px-8 py-32 text-center">
          <div className="flex flex-col items-center justify-center">
            <Loader2 size={48} className="animate-spin text-amber-600 mb-4" />
            <p className="text-gray-600 text-lg">Loading property details...</p>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Error state
  if (error || !property) {
    return (
      <main>
        <Navbar />
        <div className="container mx-auto px-5 lg:px-8 py-32 text-center">
          <Home size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Property Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error ? 'Unable to load property details. Please try again.' : 'The property you\'re looking for doesn\'t exist.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => refetch()} 
              className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition"
            >
              Retry
            </button>
            <Link href="/properties">
              <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-50 transition">
                Browse Properties
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ✅ Safely parse features
  let features: string[] = [];
  if (property.features) {
    if (Array.isArray(property.features)) {
      features = property.features;
    } else if (typeof property.features === 'string') {
      try {
        const parsed = JSON.parse(property.features);
        features = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        features = [];
      }
    }
  }

  // ✅ Safely get agent data
  const agent = property.agent || null;
  const agentName = agent?.name || 'Our Team';
  const agentPhone = agent?.phone || '+1 (888) 567-8901';
  const agentEmail = agent?.email || 'info@estatehub.com';
  const agentImage = agent?.image || 'https://via.placeholder.com/64x64?text=Agent';
  const agentRole = agent?.role || 'Real Estate Agent';

  return (
    <main>
      <Navbar />
      
      <section className="py-8 px-5 lg:px-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto">
          {/* Back Button */}
          <Link 
            href="/properties" 
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6 transition group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition" /> 
            Back to Properties
          </Link>

          {/* Property Image */}
          <div className="relative rounded-2xl overflow-hidden mb-8 bg-gray-200">
            <img 
              src={property.image || 'https://via.placeholder.com/1200x500?text=Property+Image'} 
              alt={property.title || 'Property'} 
              className="w-full h-[400px] md:h-[500px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x500?text=Property+Image';
              }}
            />
            {property.is_featured && (
              <div className="absolute top-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star size={16} fill="white" /> Featured
              </div>
            )}
            {property.tag && (
              <div className={`absolute top-4 right-4 bg-${property.tag_color || 'amber'}-500 text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                {property.tag}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Property Details */}
            <div className="lg:col-span-2">
              <h1 className="font-serif-alt text-3xl md:text-4xl font-bold text-gray-800">
                {property.title || 'Property'}
              </h1>
              <p className="text-gray-500 flex items-center gap-1 mt-2">
                <MapPin size={18} className="text-amber-500" /> 
                {property.location || 'Location not specified'}
              </p>
              <p className="text-3xl font-bold text-amber-600 mt-4">
                {formatPrice(property.price)}
              </p>

              {/* Property Stats - ✅ Safe with fallbacks */}
              <div className="flex flex-wrap gap-6 mt-6 py-6 border-y border-gray-200">
                <span className="flex items-center gap-2 text-gray-700">
                  <Bed size={20} className="text-amber-500" /> 
                  {property.beds || 0} {property.beds === 1 ? 'Bed' : 'Beds'}
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <Bath size={20} className="text-amber-500" /> 
                  {property.baths || 0} {property.baths === 1 ? 'Bath' : 'Baths'}
                </span>
                <span className="flex items-center gap-2 text-gray-700">
                  <Square size={20} className="text-amber-500" /> 
                  {formatNumber(property.sqft)} sqft
                </span>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {property.description || 'No description available for this property.'}
                </p>
              </div>

              {/* Features */}
              {features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                        <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Details */}
              <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Built Year</span>
                    <p className="font-medium text-gray-800">{property.built_year || property.builtYear || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Property Type</span>
                    <p className="font-medium text-gray-800">Residential</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status</span>
                    <p className="font-medium text-green-600">For Sale</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Property ID</span>
                    <p className="font-medium text-gray-800">#{property.id || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Agent Contact */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Users size={20} className="text-amber-500" /> Listed By
                </h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={agentImage} 
                    alt={agentName} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-amber-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=Agent';
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{agentName}</p>
                    <p className="text-sm text-amber-600">{agentRole}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <a 
                    href={`tel:${agentPhone}`}
                    className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition flex items-center justify-center gap-2"
                  >
                    <Phone size={18} /> Call Agent
                  </a>
                  <a 
                    href={`mailto:${agentEmail}`}
                    className="w-full border border-amber-600 text-amber-600 py-3 rounded-xl hover:bg-amber-600 hover:text-white transition flex items-center justify-center gap-2"
                  >
                    <Mail size={18} /> Email Agent
                  </a>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    <Calendar size={18} /> Schedule Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}