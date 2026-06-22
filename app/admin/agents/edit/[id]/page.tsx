'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, UserPlus, Mail, Phone, Briefcase, Loader2 } from 'lucide-react';
import { agentAPI } from '@/lib/api';

export default function EditAgent() {  // ✅ Default export
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = Number(params.id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    image: '',
    experience_years: 0,
    properties_sold: 0,
  });

  const [errors, setErrors] = useState<any>({});

  // Fetch agent data
  const { data: agentData, isLoading, error } = useQuery({
    queryKey: ['agent', id],
    queryFn: () => agentAPI.getById(id),
    enabled: !!id && !isNaN(id),
  });

  // Populate form when data loads
  useEffect(() => {
    if (agentData?.data) {
      const agent = agentData.data?.data;
      setFormData({
        name: agent.name || '',
        email: agent.email || '',
        phone: agent.phone || '',
        role: agent.role || '',
        image: agent.image || '',
        experience_years: agent.experience_years || 0,
        properties_sold: agent.properties_sold || 0,
      });
    }
  }, [agentData]);

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) => agentAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
      router.push('/admin/agents');
    },
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || 'Something went wrong');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const submitData = {
      ...formData,
      role: formData.role || null,
      experience_years: Number(formData.experience_years) || 0,
      properties_sold: Number(formData.properties_sold) || 0,
    };

    updateMutation.mutate(submitData);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <Loader2 size={48} className="animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading agent details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !agentData?.data) {
    return (
      <div className="text-center py-32">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent Not Found</h1>
        <p className="text-gray-600 mb-6">The agent you're looking for doesn't exist.</p>
        <Link href="/admin/agents">
          <button className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition">
            Back to Agents
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/agents" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600">
          <ArrowLeft size={20} /> Back to Agents
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">Edit Agent</h1>
        <p className="text-gray-500 mt-1">Update agent information</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        <div className="grid gap-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name[0]}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="john@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email[0]}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                placeholder="e.g., Luxury Specialist, Investment Advisor"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="https://example.com/agent-image.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Experience (Years)</label>
              <input
                type="number"
                name="experience_years"
                value={formData.experience_years}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Properties Sold</label>
              <input
                type="number"
                name="properties_sold"
                value={formData.properties_sold}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                min="0"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              {updateMutation.isPending ? 'Updating...' : 'Update Agent'}
            </button>
            <Link href="/admin/agents">
              <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}