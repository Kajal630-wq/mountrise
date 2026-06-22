'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { agentAPI } from '@/lib/api';

export default function AddAgent() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    image: '',
    experience_years: 0,
    properties_sold: 0,
  });

  const addMutation = useMutation({
    mutationFn: (data: any) => agentAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-agents'] });
      router.push('/admin/agents');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMutation.mutate(formData);
  };

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/agents" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600">
          <ArrowLeft size={20} /> Back to Agents
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mt-4">Add New Agent</h1>
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
              placeholder="e.g., Luxury Specialist, Investment Advisor"
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
              disabled={addMutation.isPending}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              <UserPlus size={18} />
              {addMutation.isPending ? 'Adding...' : 'Add Agent'}
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