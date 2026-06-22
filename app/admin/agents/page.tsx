'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Users, Plus, Edit, Trash2, Eye, 
  Mail, Phone, Search, UserPlus 
} from 'lucide-react';
import { agentAPI } from '@/lib/api';
import Link from 'next/link';

export default function ManageAgents() {  // ✅ Default export
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);

  const { data: agentsData, isLoading, refetch } = useQuery({
    queryKey: ['admin-agents'],
    queryFn: () => agentAPI.getAll(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => agentAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
      setShowDeleteModal(null);
      refetch();
    },
  });

  let agents: any[] = [];
  if (agentsData?.data?.data && Array.isArray(agentsData.data.data)) {
    agents = agentsData.data.data;
  } else if (agentsData?.data && Array.isArray(agentsData.data)) {
    agents = agentsData.data;
  } else if (Array.isArray(agentsData)) {
    agents = agentsData;
  }

  const filteredAgents = agents.filter((agent) =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Agents</h1>
          <p className="text-gray-500 mt-1">Manage real estate agents and their information</p>
        </div>
        <Link href="/admin/agents/add">
          <button className="bg-amber-600 text-white px-5 py-2 rounded-xl hover:bg-amber-700 transition flex items-center gap-2">
            <UserPlus size={18} /> Add New Agent
          </button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search agents by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-2 text-gray-500 text-sm">Loading agents...</p>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No agents found</p>
            <Link href="/admin/agents/add">
              <button className="mt-4 text-amber-600 hover:text-amber-700 font-semibold">
                + Add your first agent
              </button>
            </Link>
          </div>
        ) : (
          filteredAgents.map((agent: any) => (
            <div key={agent.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-xl">
                    {agent.name?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{agent.name}</h3>
                    <p className="text-sm text-amber-600">{agent.role || 'Agent'}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {agent.email}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/admin/agents/edit/${agent.id}`}>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                      <Edit size={16} />
                    </button>
                  </Link>
                  <button
                    onClick={() => setShowDeleteModal(agent.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Experience</p>
                  <p className="font-medium">{agent.experience_years || 0} years</p>
                </div>
                <div>
                  <p className="text-gray-500">Properties Sold</p>
                  <p className="font-medium">{agent.properties_sold || 0}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this agent? This action cannot be undone.</p>
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
  );
}