'use client'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-5 border-t border-gray-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <Building2 className="text-amber-500 text-2xl" size={28} />
            <span className="font-serif-alt text-2xl font-bold text-white">EstateHub</span>
          </Link>
          <p className="text-sm">Redefining real estate with transparency, innovation, and excellence.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-amber-400">About Us</Link></li>
            <li><Link href="/properties" className="hover:text-amber-400">Properties</Link></li>
            <li><Link href="/agents" className="hover:text-amber-400">Agents</Link></li>
            <li><Link href="/contact" className="hover:text-amber-400">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Property Types</h4>
          <ul className="space-y-2 text-sm">
            <li>Luxury Villas</li>
            <li>City Apartments</li>
            <li>Commercial Space</li>
            <li>Land & Plots</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Newsletter</h4>
          <p className="text-sm mb-3">Get new listing alerts & market updates.</p>
          <div className="flex">
            <input type="email" placeholder="Your email" className="bg-gray-800 rounded-l-xl px-4 py-2 w-full text-sm outline-none focus:ring-1 focus:ring-amber-500" />
            <button className="bg-amber-600 px-4 rounded-r-xl hover:bg-amber-700 transition">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
        © 2025 EstateHub — Premium Real Estate. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer