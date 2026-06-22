'use client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Mail, Phone, Loader2, User, Briefcase, Star, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { agentAPI } from '@/lib/api';

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: agentsData, isLoading, error, refetch } = useQuery({
    queryKey: ['agents'],
    queryFn: () => agentAPI.getAll(),
  });

  // Extract agents from response
  let agents: any[] = [];
  if (agentsData?.data?.data && Array.isArray(agentsData.data.data)) {
    agents = agentsData.data.data;
  } else if (agentsData?.data && Array.isArray(agentsData.data)) {
    agents = agentsData.data;
  } else if (Array.isArray(agentsData)) {
    agents = agentsData;
  }

  // Filter agents by search
  const filteredAgents = agents.filter((agent) =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Loading state
  if (isLoading) {
    return (
      <main>
        <Navbar />
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-5 text-center">
            <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">Meet Our Expert Agents</h1>
            <p className="text-gray-300 mt-4">Dedicated professionals ready to help you find your dream home</p>
          </div>
        </section>
        <section className="py-20 px-5">
          <div className="container mx-auto text-center">
            <Loader2 size={48} className="animate-spin text-amber-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading agents...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main>
        <Navbar />
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-5 text-center">
            <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">Meet Our Expert Agents</h1>
            <p className="text-gray-300 mt-4">Dedicated professionals ready to help you find your dream home</p>
          </div>
        </section>
        <section className="py-20 px-5">
          <div className="container mx-auto text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <p className="text-red-600 mb-4">Unable to load agents. Please try again.</p>
              <button 
                onClick={() => refetch()} 
                className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="container mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">Meet Our Expert Agents</h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Dedicated professionals ready to help you find your dream home
          </p>
          <p className="text-amber-400 mt-2 text-sm">
            {agents.length} agents available
          </p>
        </div>
      </section>

      <section className="py-12 px-5 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          {/* Search */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search agents by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500 shadow-sm"
              />
            </div>
          </div>

          {/* Agents Grid */}
          {filteredAgents.length === 0 ? (
            <div className="text-center py-16">
              <User size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No agents found</p>
              <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAgents.map((agent) => (
                <div 
                  key={agent.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  {/* Agent Image */}
                  <div className="relative h-72 overflow-hidden bg-gray-200">
                    <img 
                      src={agent.image || 'https://via.placeholder.com/400x400?text=Agent'} 
                      alt={agent.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Agent';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="flex items-center gap-2 text-white">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium">{agent.properties_sold || agent.properties || 0} properties sold</span>
                      </div>
                    </div>
                  </div>

                  {/* Agent Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{agent.name}</h3>
                    <p className="text-amber-600 text-sm font-medium mb-3 flex items-center gap-1">
                      <Briefcase size={14} /> {agent.role || 'Real Estate Agent'}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500">⭐</span>
                        <span>{agent.experience_years || agent.experience || 0} years experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-500">🏠</span>
                        <span>{agent.properties_sold || agent.properties || 0} properties sold</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                      <a 
                        href={`mailto:${agent.email}`}
                        className="w-full flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-2 rounded-lg transition"
                      >
                        <Mail size={16} /> {agent.email}
                      </a>
                      <a 
                        href={`tel:${agent.phone}`}
                        className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-amber-600 hover:bg-gray-50 p-2 rounded-lg transition"
                      >
                        <Phone size={16} /> {agent.phone || 'Contact available'}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Total Count */}
          {filteredAgents.length > 0 && (
            <div className="text-center mt-12 text-gray-500 text-sm">
              Showing {filteredAgents.length} of {agents.length} agents
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}