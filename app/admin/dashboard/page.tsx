'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, MessageSquare, Users, Plus, TrendingUp, Eye, Star } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    totalAgents: 0,
  });

  // Dashboard stats cards
  const statsCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Home,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      title: 'Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      title: 'Agents',
      value: stats.totalAgents,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: 'New property added',
      details: 'Sunset Villa in Beverly Hills',
      time: '2 hours ago',
      type: 'add',
    },
    {
      id: 2,
      action: 'New inquiry received',
      details: 'About Malibu Seascape property',
      time: '5 hours ago',
      type: 'inquiry',
    },
    {
      id: 3,
      action: 'Property featured',
      details: 'Downtown Sky Loft is now featured',
      time: '1 day ago',
      type: 'featured',
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your real estate platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-xl`}>
                <stat.icon className={`${stat.textColor}`} size={24} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link
                href={`/admin/${stat.title.toLowerCase().replace(' ', '')}`}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/admin/properties/add">
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <Plus size={28} className="mb-3" />
            <h3 className="text-lg font-bold">Add Property</h3>
            <p className="text-sm opacity-90">Create new listing</p>
          </div>
        </Link>
        <Link href="/admin/properties">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <Home size={28} className="mb-3" />
            <h3 className="text-lg font-bold">Manage Properties</h3>
            <p className="text-sm opacity-90">View all listings</p>
          </div>
        </Link>
        <Link href="/admin/inquiries">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <MessageSquare size={28} className="mb-3" />
            <h3 className="text-lg font-bold">View Inquiries</h3>
            <p className="text-sm opacity-90">Check messages</p>
          </div>
        </Link>
        <Link href="/admin/agents">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition cursor-pointer">
            <Users size={28} className="mb-3" />
            <h3 className="text-lg font-bold">Manage Agents</h3>
            <p className="text-sm opacity-90">View agent list</p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-sm text-amber-600 hover:text-amber-700">View All</button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${activity.type === 'add' ? 'bg-green-100' : ''}
                  ${activity.type === 'inquiry' ? 'bg-blue-100' : ''}
                  ${activity.type === 'featured' ? 'bg-amber-100' : ''}
                `}>
                  {activity.type === 'add' && <Plus size={16} className="text-green-600" />}
                  {activity.type === 'inquiry' && <Eye size={16} className="text-blue-600" />}
                  {activity.type === 'featured' && <Star size={16} className="text-amber-600" />}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.details}</p>
                </div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}