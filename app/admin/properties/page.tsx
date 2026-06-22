'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Search, Plus, Edit, Trash2, Eye, 
  ChevronLeft, ChevronRight, Filter, Star, 
  Home
} from 'lucide-react';
import { propertyAPI } from '@/lib/api';
import AdminGuard from '@/app/components/AdminGuard';

export default function ManageProperties() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const { data: propertiesData, isLoading, refetch } = useQuery({
    queryKey: ['admin-properties', currentPage, searchTerm],
    queryFn: () => propertyAPI.getAll({ 
      page: currentPage, 
      search: searchTerm,
      per_page: 12 
    }),
  });

  // ✅ CORRECT: Extract properties from response
  useEffect(() => {
    if (propertiesData) {
      console.log('API Response:', propertiesData?.data?.data?.data);
      
      // ✅ Access: propertiesData.data.data (array of properties)
      if (propertiesData?.data?.data?.data && Array.isArray(propertiesData?.data?.data?.data)) {
        setProperties(propertiesData.data.data.data);
        setPagination(propertiesData.data);
        console.log('✅ Properties loaded:', propertiesData.data.data.data.length);
      } 
      // Fallback: if response structure is different
      else if (propertiesData?.data && Array.isArray(propertiesData.data)) {
        setProperties(propertiesData.data);
        setPagination(null);
      } 
      else if (Array.isArray(propertiesData)) {
        setProperties(propertiesData);
        setPagination(null);
      } 
      else {
        setProperties([]);
        setPagination(null);
      }
    }
  }, [propertiesData]);

  const deleteMutation = useMutation({
    mutationFn: (id: number) => propertyAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      setShowDeleteModal(null);
      refetch();
    },
  });

  const toggleFeatured = useMutation({
    mutationFn: ({ id, isFeatured }: { id: number; isFeatured: boolean }) =>
      propertyAPI.update(id, { is_featured: !isFeatured }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      refetch();
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  // ✅ Filter properties by search
  const filteredProperties = properties.filter(prop =>
    prop.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("filter data",filteredProperties)

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-5 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Manage Properties</h1>
                <p className="text-gray-500 text-sm mt-1">
                  {properties.length} properties found
                </p>
              </div>
              <Link href="/admin/properties/add">
                <button className="bg-amber-600 text-white px-5 py-2 rounded-xl hover:bg-amber-700 transition flex items-center gap-2">
                  <Plus size={18} /> Add New Property
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-8">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by title or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} /> Filter
              </button>
            </div>
          </div>

          {/* Properties Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Beds/Baths</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Featured</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
                        <p className="mt-2 text-gray-500 text-sm">Loading properties...</p>
                      </td>
                    </tr>
                  ) : filteredProperties.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <div className="flex flex-col items-center gap-2">
                          <Home size={48} className="text-gray-300" />
                          <p>No properties found</p>
                          <Link href="/admin/properties/add">
                            <button className="mt-2 text-amber-600 hover:text-amber-700 font-semibold">
                              + Add your first property
                            </button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredProperties.map((property: any) => (
                      <tr key={property.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">#{property.id}</td>
                        <td className="px-6 py-4">
                          <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-12 h-12 rounded-lg object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=No+Image';
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-800">{property.title}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{property.location}</td>
                        <td className="px-6 py-4 font-semibold text-amber-600">${parseInt(property.price).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{property.beds} / {property.baths}</td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleFeatured.mutate({ id: property.id, isFeatured: property.is_featured })}
                            className={`p-1 rounded transition ${property.is_featured ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
                          >
                            <Star size={18} />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link href={`/properties/${property.id}`} target="_blank">
                              <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                                <Eye size={16} />
                              </button>
                            </Link>
                            <Link href={`/admin/properties/edit/${property.id}`}>
                              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                                <Edit size={16} />
                              </button>
                            </Link>
                            <button
                              onClick={() => setShowDeleteModal(property.id)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination && pagination.last_page > 1 && (
              <div className="flex justify-between items-center px-6 py-4 border-t">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft size={16} /> Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {pagination.last_page}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(pagination.last_page, p + 1))}
                  disabled={currentPage === pagination.last_page}
                  className="flex items-center gap-2 px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this property? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowDeleteModal(null)} 
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(showDeleteModal)} 
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}