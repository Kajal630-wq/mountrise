'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Mail, Phone, MapPin, CheckCircle, Trash2, Eye, 
  X, Search, Filter, Clock, User, MessageSquare 
} from 'lucide-react';
import { inquiryAPI } from '@/lib/api';
import Link from 'next/link';

export default function ManageInquiries() {
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, read, unread

  const { data: inquiriesData, isLoading, refetch } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => inquiryAPI.getAll(),
  });

  const markAsReadMutation = useMutation({
    mutationFn: (id: number) => inquiryAPI.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => inquiryAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-inquiries'] });
      setSelectedInquiry(null);
      refetch();
    },
  });

  // Extract inquiries from response
  let inquiries: any[] = [];
  if (inquiriesData?.data?.data && Array.isArray(inquiriesData.data.data)) {
    inquiries = inquiriesData.data.data;
  } else if (inquiriesData?.data && Array.isArray(inquiriesData.data)) {
    inquiries = inquiriesData.data;
  } else if (Array.isArray(inquiriesData)) {
    inquiries = inquiriesData;
  }

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = 
      inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'read' && inquiry.is_read) ||
      (filter === 'unread' && !inquiry.is_read);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = inquiries.filter((i: any) => !i.is_read).length;

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Inquiries</h1>
          <p className="text-gray-500 mt-1">Manage customer inquiries and messages</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
            {unreadCount} Unread
          </span>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'unread' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 rounded-lg transition ${
                filter === 'read' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Read
            </button>
          </div>
        </div>
      </div>

      {/* Inquiries Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Inquiries List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-2 text-gray-500 text-sm">Loading inquiries...</p>
              </div>
            ) : filteredInquiries.length === 0 ? (
              <div className="p-12 text-center">
                <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No inquiries found</p>
                <p className="text-sm text-gray-400 mt-1">All caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredInquiries.map((inquiry: any) => (
                  <div
                    key={inquiry.id}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition ${
                      !inquiry.is_read ? 'bg-amber-50/30' : ''
                    }`}
                    onClick={() => setSelectedInquiry(inquiry)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xs">
                            {inquiry.name?.charAt(0) || '?'}
                          </div>
                          <h3 className="font-semibold text-gray-800 truncate">{inquiry.name}</h3>
                          {!inquiry.is_read && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full flex-shrink-0">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 truncate">{inquiry.email}</p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{inquiry.message}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {new Date(inquiry.created_at).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-3 flex-shrink-0">
                        {!inquiry.is_read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsReadMutation.mutate(inquiry.id);
                            }}
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition"
                            title="Mark as read"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this inquiry?')) {
                              deleteMutation.mutate(inquiry.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Details Panel */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {selectedInquiry ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-gray-800">Inquiry Details</h3>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Name</p>
                  <p className="font-semibold text-gray-800">{selectedInquiry.name}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-amber-600 hover:underline">
                    {selectedInquiry.email}
                  </a>
                </div>

                {selectedInquiry.phone && (
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Phone</p>
                    <a href={`tel:${selectedInquiry.phone}`} className="text-amber-600 hover:underline">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                )}

                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Message</p>
                  <div className="bg-gray-50 p-3 rounded-lg mt-1">
                    <p className="text-gray-700 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Received</p>
                  <p className="text-gray-600">
                    {new Date(selectedInquiry.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200 flex gap-2">
                  {!selectedInquiry.is_read && (
                    <button
                      onClick={() => markAsReadMutation.mutate(selectedInquiry.id)}
                      className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                    >
                      Mark as Read
                    </button>
                  )}
                  <a
                    href={`mailto:${selectedInquiry.email}`}
                    className="flex-1 px-4 py-2 border border-amber-500 text-amber-600 rounded-lg hover:bg-amber-50 transition text-center"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => {
                      if (confirm('Delete this inquiry?')) {
                        deleteMutation.mutate(selectedInquiry.id);
                      }
                    }}
                    className="px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <MessageSquare size={48} className="mx-auto mb-3 text-gray-300" />
              <p className="font-medium">No inquiry selected</p>
              <p className="text-sm mt-1">Click on an inquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}