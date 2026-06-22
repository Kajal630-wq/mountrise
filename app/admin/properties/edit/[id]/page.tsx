'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { propertyAPI } from '@/lib/api';
import AdminGuard from '@/app/components/AdminGuard';

export default function EditProperty() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const id = Number(params.id);
  
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    price_value: 0,
    beds: 0,
    baths: 0,
    sqft: 0,
    image: '',
    description: '',
    features: [''],
    built_year: new Date().getFullYear(),
    tag: '',
    tag_color: 'amber',
    is_featured: false,
  });

  const { data: propertyData, isLoading: isLoadingProperty } = useQuery({
    queryKey: ['property', id],
    queryFn: () => propertyAPI.getById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (propertyData?.data) {
      const property = propertyData.data.data;
      console.log("proprty data",property)
      setFormData({
        title: property.title || '',
        location: property.location || '',
        price: property.price || '',
        price_value: property.price_value || 0,
        beds: property.beds || 0,
        baths: property.baths || 0,
        sqft: property.sqft || 0,
        image: property.image || '',
        description: property.description || '',
        features: property.features || [''],
        built_year: property.built_year || new Date().getFullYear(),
        tag: property.tag || '',
        tag_color: property.tag_color || 'amber',
        is_featured: property.is_featured || false,
      });
    }
  }, [propertyData]);

  const updateMutation = useMutation({
    mutationFn: (data: any) => propertyAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      router.push('/admin/properties');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = formData.features.filter(f => f.trim() !== '');
    const priceValue = parseFloat(formData.price.replace(/[^0-9.-]/g, ''));
    
    updateMutation.mutate({
      ...formData,
      features: cleanFeatures,
      price_value: isNaN(priceValue) ? 0 : priceValue,
    });
  };

  if (isLoadingProperty) {
    return (
      <AdminGuard>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
        </div>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-5 lg:px-8 py-6">
            <Link href="/admin/properties" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600">
              <ArrowLeft size={20} /> Back to Properties
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-5 lg:px-8 py-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Property</h1>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Same fields as Add Property */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Property Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location *</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price *</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
                <input type="url" name="image" value={formData.image} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bedrooms</label>
                <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bathrooms</label>
                <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Square Feet</label>
                <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Built Year</label>
                <input type="number" name="built_year" value={formData.built_year} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full p-3 border border-gray-300 rounded-lg" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Features</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input type="text" value={feature} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-1 p-2 border border-gray-300 rounded-lg" placeholder="e.g., Swimming Pool" />
                    {formData.features.length > 1 && (
                      <button type="button" onClick={() => removeFeature(index)} className="p-2 bg-red-100 text-red-600 rounded-lg">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addFeature} className="flex items-center gap-2 text-amber-600 mt-2">
                  <Plus size={18} /> Add Feature
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-4 h-4 text-amber-600" />
                  <span className="text-gray-700 font-semibold">Feature this property</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t">
              <button type="submit" disabled={updateMutation.isPending} className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                {updateMutation.isPending ? 'Updating...' : 'Update Property'}
              </button>
              <Link href="/admin/properties">
                <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}