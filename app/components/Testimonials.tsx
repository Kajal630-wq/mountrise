'use client'
import { Quote } from 'lucide-react'

interface Testimonial {
  text: string
  name: string
  image: string
}

const testimonials: Testimonial[] = [
  {
    text: 'EstateHub made buying our first home stress-free. Incredible support and transparent process.',
    name: 'Emily R.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    text: 'Professional agents, stunning listings. Sold my condo within a week at above asking price!',
    name: 'David K.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    text: 'From virtual tours to closing – flawless experience. Highly recommend for luxury property seekers.',
    name: 'Priya S.',
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white px-5">
      <div className="container mx-auto text-center">
        <span className="text-amber-600 font-semibold text-sm uppercase">Client Love</span>
        <h2 className="font-serif-alt text-4xl font-bold mb-10">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-2xl">
              <Quote className="text-amber-400 text-2xl mb-3" size={28} />
              <p className="text-gray-600">{testimonial.text}</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <img className="w-10 h-10 rounded-full" src={testimonial.image} alt="" />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <div className="text-amber-400 text-xs flex gap-0.5">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials