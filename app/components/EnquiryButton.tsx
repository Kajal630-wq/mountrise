'use client';
import { useState } from 'react';
import { X, Send, Phone, Mail, User, Home, CheckCircle, Loader2, ChevronDown, Building2 } from 'lucide-react';
import { inquiryAPI } from '@/lib/api';
import axios from 'axios';

export default function EnquiryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    property_id: null as string | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // WhatsApp Number (Change this to your number)
  const WHATSAPP_NUMBER = '918888567890';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Function to send WhatsApp message via API (Internal)
const sendWhatsAppMessage = async (data: any) => {
  try {
    const message = `🏠 *New Property Enquiry*%0A%0A` +
      `👤 *Name:* ${data.name}%0A` +
      `📧 *Email:* ${data.email}%0A` +
      `📞 *Phone:* ${data.phone || 'Not provided'}%0A` +
      `${data.property_id ? `🏷️ *Property ID:* ${data.property_id}%0A` : ''}` +
      `📝 *Message:* ${data.message}%0A%0A` +
      `📅 *Date:* ${new Date().toLocaleString()}`;

    // Send to Laravel backend
    const response = await axios.post('http://localhost:8000/api/send-whatsapp', {
      to: WHATSAPP_NUMBER,
      message: message
    });

    return response.data.success;
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
    return false;
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Step 1: Save to database
      await inquiryAPI.create(formData);

      // Step 2: Send WhatsApp message (Internal - User doesn't know)
      await sendWhatsAppMessage(formData);

      // Step 3: Show success to user
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', property_id: null });
      
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 3000);
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* WhatsApp Button - Direct Chat */}
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1da851] text-white p-3.5 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
          title="Chat on WhatsApp"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="hidden group-hover:inline text-sm font-medium">WhatsApp</span>
        </a>

        {/* Enquiry Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3.5 rounded-full shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
          title="Send Enquiry"
        >
          <Send size={22} />
          <span className="hidden group-hover:inline text-sm font-medium">Enquiry</span>
        </button>
      </div>

      {/* Enquiry Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-fade-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary-500 to-amber-600 px-6 py-5">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Send Enquiry</h2>
                  <p className="text-amber-50 text-sm mt-0.5 opacity-90">We'll get back to you within 24 hours</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition p-1 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Form Body */}
            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              {success ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Enquiry Sent! 🎉</h3>
                  <p className="text-gray-500 mt-2 text-sm">
                    Thank you for your enquiry. Our team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Property ID (Optional) */}
                {/* Property Type Dropdown with Property ID */}
<div>
  <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
    Property Type <span className="text-red-500">*</span>
  </label>
  <div className="space-y-2">
    <div className="relative">
      <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <select
        name="property_type"
        value={formData.property_id || ''}
   
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm appearance-none bg-white"
      >
        <option value="">Select Property Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="condo">Condo</option>
        <option value="villa">Villa</option>
        <option value="land">Land</option>
        <option value="commercial">Commercial</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
    
    {/* Property ID - Optional */}
    <div className="relative">
      <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <input
        type="number"
        name="property_id"
        value={formData.property_id || ''}
        onChange={handleChange}
        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition text-sm"
        placeholder="Property ID (Optional)"
      />
    </div>
  </div>
</div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition resize-none text-sm"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm flex items-center gap-2">
                      <span className="text-red-500">⚠️</span> {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} /> Send Enquiry
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    We respect your privacy. Your information will not be shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}