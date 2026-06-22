'use client';
import { useQuery } from '@tanstack/react-query';
import { propertyAPI } from '@/lib/api';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import Footer from './components/Footer';
import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar, FaUsers, FaHome, FaBuilding, FaUserTie, FaQuoteLeft, FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';

// Mock data for development
const MOCK_PROPERTIES = [
  {
    id: 1,
    title: 'Luxury Villa with Ocean View',
    price: 1250000,
    location: 'Malibu, CA',
    bedrooms: 5,
    bathrooms: 4,
    area: 4200,
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
    status: 'For Sale'
  },
  {
    id: 2,
    title: 'Modern Downtown Apartment',
    price: 850000,
    location: 'Los Angeles, CA',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: 'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg',
    status: 'For Sale'
  },
  {
    id: 3,
    title: 'Beachfront Condo',
    price: 950000,
    location: 'Santa Monica, CA',
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    image: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg',
    status: 'For Sale'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Homeowner',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'The team made buying our dream home seamless. Their expertise and guidance were invaluable throughout the entire process.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Investor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'I\'ve worked with many real estate agencies, but this one stands out. Professional, responsive, and truly cares about their clients.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'First-time Buyer',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'As a first-time buyer, I was nervous, but the team walked me through every step. I couldn\'t be happier with my new home!',
    rating: 5
  }
];

const STATS = [
  { icon: FaHome, value: '500+', label: 'Properties Sold' },
  { icon: FaUsers, value: '1000+', label: 'Happy Clients' },
  { icon: FaBuilding, value: '50+', label: 'Luxury Listings' },
  { icon: FaStar, value: '4.9', label: 'Average Rating' }
];

export default function Home() {
  const { data: propertiesData, isLoading, error } = useQuery({
    queryKey: ['featured-properties'],
    queryFn: () => propertyAPI.getFeatured(),
    retry: 1,
  });

  const apiProperties = propertiesData?.data?.data || [];
  const featuredProperties = apiProperties.length > 0 ? apiProperties : MOCK_PROPERTIES;
  const isUsingMock = apiProperties.length === 0 && !isLoading;

  useEffect(() => {
    if (error) {
      console.error('API Error:', error);
      console.log('Using mock data for development');
    }
  }, [error]);

  return (
    <main>
      <Navbar />
      
      {isUsingMock && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="container mx-auto">
            <p className="text-yellow-700">
              ⚠️ Using mock data. API not available. 
              {error && ` Error: ${error.message}`}
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[600px] bg-cover bg-center flex items-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 text-white z-10">
          <h1 className="font-serif-alt text-5xl md:text-7xl font-bold max-w-3xl">
            Where Luxury Meets Comfort
          </h1>
          <p className="text-xl max-w-xl mt-5 mb-8">
            Discover exclusive properties from our Laravel backend
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/properties">
              <button className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-full font-semibold transition duration-300">
                Explore Properties
              </button>
            </Link>
            <Link href="#contact">
              <button className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-full font-semibold transition duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-5 bg-amber-600">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <stat.icon className="text-4xl mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif-alt text-4xl font-bold mb-4">
              Featured Properties
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our handpicked selection of luxury properties
            </p>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading properties...</p>
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property: any) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found.</p>
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/properties">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300 inline-flex items-center gap-2">
                View All Properties <FaChevronRight />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-5 bg-white" id="about">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif-alt text-4xl font-bold mb-6">
                About <span className="text-amber-600">Luxury Estates</span>
              </h2>
              <p className="text-gray-600 mb-4">
                With over 20 years of experience in the real estate industry, Luxury Estates has been helping clients find their dream homes and make smart investment decisions.
              </p>
              <p className="text-gray-600 mb-6">
                Our team of dedicated professionals combines local expertise with global standards to provide unparalleled service in the luxury property market.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Expert guidance through every step</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Curated portfolio of premium properties</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                  <span className="text-gray-700">Transparent and ethical business practices</span>
                </div>
              </div>
              <Link href="/about">
                <button className="mt-8 bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition duration-300">
                  Learn More About Us
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg" 
                alt="Luxury home" 
                className="rounded-lg shadow-lg h-64 w-full object-cover"
              />
              <img 
                src="https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg" 
                alt="Modern interior" 
                className="rounded-lg shadow-lg h-64 w-full object-cover mt-8"
              />
              <img 
                src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" 
                alt="Property view" 
                className="rounded-lg shadow-lg h-64 w-full object-cover col-span-2 -mt-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-5 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif-alt text-4xl font-bold mb-4">
              Why Choose <span className="text-amber-600">Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and expertise to make your real estate journey smooth and successful
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="text-amber-600 text-5xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-3">Premium Properties</h3>
              <p className="text-gray-600">Curated selection of luxury homes and commercial spaces</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="text-amber-600 text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">Professional real estate advisors to help you every step</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <div className="text-amber-600 text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold mb-3">Easy Process</h3>
              <p className="text-gray-600">Streamlined buying and selling experience with full support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-white" id="testimonials">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif-alt text-4xl font-bold mb-4">
              What Our <span className="text-amber-600">Clients Say</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from real people who found their dream homes with us
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <FaQuoteLeft className="text-amber-600 text-3xl mb-4 opacity-50" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <div className="flex text-amber-500 text-sm mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-20 px-5 bg-gray-50" id="contact">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif-alt text-4xl font-bold mb-4">
              Contact <span className="text-amber-600">Us</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out to us and our team will get back to you shortly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Address</h4>
                  <p className="text-gray-600">123 Luxury Lane, Beverly Hills, CA 90210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaPhone className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaEnvelope className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">info@luxuryestates.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-3 rounded-full">
                  <FaClock className="text-amber-600 text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold">Working Hours</h4>
                  <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold mb-3">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300">
                    <FaPhone className="text-amber-600" />
                  </a>
                  <a href="#" className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300">
                    <FaEnvelope className="text-amber-600" />
                  </a>
                  <a href="#" className="bg-amber-100 hover:bg-amber-200 p-3 rounded-full transition duration-300">
                    <FaUserTie className="text-amber-600" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-transparent outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-5 bg-amber-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Stay updated with the latest properties, market trends, and exclusive offers
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 min-w-[200px] px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-white outline-none"
            />
            <button className="bg-white text-amber-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}