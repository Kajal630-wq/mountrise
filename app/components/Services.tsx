'use client'
import { Handshake, LineChart, Gavel, LucideIcon } from 'lucide-react'

interface Service {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Handshake,
    title: 'Personalized Consultation',
    description: 'Expert advisors understand your needs and find the perfect match.',
  },
  {
    icon: LineChart,
    title: 'Market Analytics',
    description: 'Data-driven insights to make informed investments & secure ROI.',
  },
  {
    icon: Gavel,
    title: 'Legal & Mortgage Help',
    description: 'End-to-end legal documentation + 0% hassle home loans assistance.',
  },
]

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 px-5 lg:px-8 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase">What we offer</span>
          <h2 className="font-serif-alt text-4xl font-bold mt-2">Premium Real Estate Services</h2>
          <p className="text-gray-500 mt-3">
            From tailored search to legal assistance — we simplify your property journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="p-7 text-center rounded-2xl bg-gray-50 hover:shadow-md transition group"
            >
              <div className="bg-amber-100 w-16 h-16 flex items-center justify-center rounded-full mx-auto mb-4 group-hover:bg-amber-200 transition">
                <service.icon className="text-amber-600 text-2xl" size={28} />
              </div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-500 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services