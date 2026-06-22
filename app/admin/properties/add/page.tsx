'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { propertyAPI } from '@/lib/api';
import AdminGuard from '@/app/components/AdminGuard';

export default function AddProperty() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    is_featured: false,  // ✅ This will work now
  });

  const [errors, setErrors] = useState<any>({});

  const addMutation = useMutation({
    mutationFn: (data: any) => propertyAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      router.push('/admin/properties');
    },
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert(error.response?.data?.message || 'Something went wrong');
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // ✅ For checkbox, use checked property
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      // ✅ For number inputs, convert to number
      const val = name === 'beds' || name === 'baths' || name === 'sqft' || name === 'built_year' || name === 'price_value'
        ? parseInt(value) || 0
        : value;
      
      setFormData(prev => ({
        ...prev,
        [name]: val,
      }));
    }
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
    setErrors({});
    
    // ✅ Clean features
    const cleanFeatures = formData.features.filter(f => f.trim() !== '');
    
    // ✅ Parse price value
    const priceValue = parseFloat(formData.price.replace(/[^0-9.-]/g, ''));
    
    // ✅ Prepare data for API
    const submitData = {
      title: formData.title,
      location: formData.location,
      price: formData.price,
      price_value: isNaN(priceValue) ? 0 : priceValue,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      image: formData.image,
      description: formData.description,
      features: cleanFeatures,
      built_year: Number(formData.built_year),
      tag: formData.tag || null,
      tag_color: formData.tag_color,
      is_featured: formData.is_featured,  // ✅ Send boolean
    };

    console.log('Submitting data:', submitData);
    addMutation.mutate(submitData);
  };

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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Add New Property</h1>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Property Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Luxury Villa in Beverly Hills"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Beverly Hills, CA"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Price *</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., $1,500,000"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Image URL *</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="https://images.pexels.com/..."
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bedrooms</label>
                <input
                  type="number"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  min="0"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.beds ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.beds && <p className="text-red-500 text-sm mt-1">{errors.beds[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Bathrooms</label>
                <input
                  type="number"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  min="0"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.baths ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.baths && <p className="text-red-500 text-sm mt-1">{errors.baths[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Square Feet</label>
                <input
                  type="number"
                  name="sqft"
                  value={formData.sqft}
                  onChange={handleChange}
                  min="0"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.sqft ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.sqft && <p className="text-red-500 text-sm mt-1">{errors.sqft[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Built Year</label>
                <input
                  type="number"
                  name="built_year"
                  value={formData.built_year}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.built_year ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.built_year && <p className="text-red-500 text-sm mt-1">{errors.built_year[0]}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tag (Optional)</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                  placeholder="e.g., Featured, Hot Deal, Ocean View"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Tag Color</label>
                <select
                  name="tag_color"
                  value={formData.tag_color}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                >
                  <option value="amber">Amber</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="purple">Purple</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="w-4 h-4 text-amber-600 rounded border-gray-300 focus:ring-amber-500"
                  />
                  <span className="text-gray-700 font-semibold">⭐ Feature this property (show on homepage)</span>
                </label>
                <p className="text-sm text-gray-500 mt-1 ml-6">
                  Featured properties will be displayed on the homepage carousel
                </p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:border-amber-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Detailed description of the property..."
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Features *</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500"
                      placeholder="e.g., Swimming Pool, Garden, Garage"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                ))}
                {errors.features && <p className="text-red-500 text-sm mt-1">{errors.features[0]}</p>}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mt-2"
                >
                  <Plus size={18} /> Add Feature
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-8 pt-6 border-t">
              <button
                type="submit"
                disabled={addMutation.isPending}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                {addMutation.isPending ? 'Adding...' : 'Add Property'}
              </button>
              <Link href="/admin/properties">
                <button type="button" className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AdminGuard>
  );
}