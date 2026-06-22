'use client'
import Link from 'next/link'
import { Building2, Users, Award, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-5 lg:px-8 text-center">
          <h1 className="font-serif-alt text-4xl md:text-5xl font-bold">About EstateHub</h1>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">Redefining real estate with transparency, innovation, and excellence</p>
        </div>
      </section>

      <section className="py-20 px-5 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase">Our Story</span>
              <h2 className="font-serif-alt text-3xl md:text-4xl font-bold mt-2 mb-4">Luxury Real Estate Redefined</h2>
              <p className="text-gray-600 mb-4">Founded in 2015, EstateHub has grown to become one of the most trusted names in luxury real estate. Our mission is simple: to provide an unparalleled experience for buyers, sellers, and investors.</p>
              <p className="text-gray-600 mb-6">With a portfolio of over 500+ premium properties and a team of dedicated experts, we've helped hundreds of families find their perfect homes and achieve their investment goals.</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div><div className="text-2xl font-bold text-amber-600">500+</div><div className="text-gray-500">Properties Sold</div></div>
                <div><div className="text-2xl font-bold text-amber-600">98%</div><div className="text-gray-500">Client Satisfaction</div></div>
                <div><div className="text-2xl font-bold text-amber-600">120+</div><div className="text-gray-500">Happy Families</div></div>
                <div><div className="text-2xl font-bold text-amber-600">24/7</div><div className="text-gray-500">Expert Support</div></div>
              </div>
              <Link href="/contact">
                <button className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 transition">
                  Get in Touch
                </button>
              </Link>
            </div>
            <div>
              <img src="https://images.pexels.com/photos/280232/pexels-photo-280232.jpeg?auto=compress&cs=tinysrgb&w=800" alt="About us" className="rounded-2xl shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 px-5 lg:px-8">
        <div className="container mx-auto text-center">
          <h2 className="font-serif-alt text-3xl md:text-4xl font-bold mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div><Building2 className="text-amber-600 text-4xl mx-auto mb-4" /><h3 className="font-bold mb-2">Integrity</h3><p className="text-gray-500 text-sm">Honest and transparent dealings</p></div>
            <div><Users className="text-amber-600 text-4xl mx-auto mb-4" /><h3 className="font-bold mb-2">Client First</h3><p className="text-gray-500 text-sm">Your needs always come first</p></div>
            <div><Award className="text-amber-600 text-4xl mx-auto mb-4" /><h3 className="font-bold mb-2">Excellence</h3><p className="text-gray-500 text-sm">Uncompromising quality service</p></div>
            <div><Clock className="text-amber-600 text-4xl mx-auto mb-4" /><h3 className="font-bold mb-2">Innovation</h3><p className="text-gray-500 text-sm">Modern approach to real estate</p></div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}