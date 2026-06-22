'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <main>
      <Navbar />
      
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-4">We'd love to hear from you. Get in touch with our team.</p>
        </div>
      </section>

      <section className="py-20 px-5 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Info */}
            <div>
              <h2 className="font-serif-alt text-3xl font-bold mb-6">Get In Touch</h2>
              <p className="text-gray-600 mb-8">Whether you're ready to buy, sell, or just have questions, our team is here to help.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4"><div className="bg-amber-100 p-3 rounded-full"><Phone className="text-amber-600" /></div><div><p className="font-semibold">Phone</p><p className="text-gray-600">+1 (888) 567-8901</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-amber-100 p-3 rounded-full"><Mail className="text-amber-600" /></div><div><p className="font-semibold">Email</p><p className="text-gray-600">hello@estatehub.com</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-amber-100 p-3 rounded-full"><MapPin className="text-amber-600" /></div><div><p className="font-semibold">Office</p><p className="text-gray-600">123 Luxury Avenue, Beverly Hills, CA 90210</p></div></div>
                <div className="flex items-center gap-4"><div className="bg-amber-100 p-3 rounded-full"><Clock className="text-amber-600" /></div><div><p className="font-semibold">Business Hours</p><p className="text-gray-600">Mon-Fri: 9AM - 8PM | Sat-Sun: 10AM - 6PM</p></div></div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-2xl">
                <h3 className="font-bold mb-2">Follow Us</h3>
                <div className="flex gap-4 text-gray-600">
                  <span className="cursor-pointer hover:text-amber-600">Facebook</span>
                  <span className="cursor-pointer hover:text-amber-600">Twitter</span>
                  <span className="cursor-pointer hover:text-amber-600">Instagram</span>
                  <span className="cursor-pointer hover:text-amber-600">LinkedIn</span>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500" />
                <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500" />
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500" />
                <textarea rows={5} placeholder="Your Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"></textarea>
                <button type="submit" className="w-full bg-amber-600 text-white py-3 rounded-xl hover:bg-amber-700 transition flex items-center justify-center gap-2"><Send size={18} /> Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="px-5 lg:px-8 pb-20">
        <div className="container mx-auto">
          <div className="bg-gray-200 rounded-2xl overflow-hidden h-96">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.876140299712!2d-118.40348268478344!3d34.05818098060992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}