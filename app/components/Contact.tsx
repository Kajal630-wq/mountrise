'use client'
import { Phone, Mail, Send } from 'lucide-react'
import { FormEvent } from 'react'

const Contact: React.FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted')
  }

  return (
    <section id="contact" className="py-20 px-5 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-amber-400 font-semibold text-sm uppercase">Get in touch</span>
          <h2 className="font-serif-alt text-4xl font-bold mt-2">Let's Find Your Perfect Place</h2>
          <p className="text-gray-300 mt-4 mb-6">
            Whether you're buying, selling, or investing — our team is ready to assist 24/7.
          </p>
          <div className="flex gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Phone className="text-amber-400 text-xl" size={20} />
              <span>+1 (888) 567-8901</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-amber-400 text-xl" size={20} />
              <span>hello@estatehub.com</span>
            </div>
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-gray-700">
          <h3 className="text-2xl font-semibold mb-4">Request a Callback</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-amber-500"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-amber-500"
            />
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-amber-500"
            />
            <textarea
              rows={2}
              placeholder="Message"
              className="w-full p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:border-amber-500"
            ></textarea>
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2">
              <Send size={18} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact