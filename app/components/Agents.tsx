'use client'
// import { Instagram, Linkedin, Mail } from 'lucide-react'

interface Agent {
  name: string
  role: string
  image: string
}

const agents: Agent[] = [
  {
    name: 'Sophia Martinez',
    role: 'Luxury Specialist',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'James Carter',
    role: 'Investment Advisor',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Olivia Chen',
    role: 'First Home Expert',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Michael Okonkwo',
    role: 'Commercial Realty',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
]

const Agents: React.FC = () => {
  return (
    <section id="agents" className="py-20 bg-gray-50 px-5 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="text-amber-600 font-semibold text-sm uppercase">Meet the experts</span>
          <h2 className="font-serif-alt text-4xl font-bold">Our Top Real Estate Agents</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Dedicated, local specialists ready to guide you every step of the way.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow text-center">
              <img className="w-full h-64 object-cover" src={agent.image} alt={agent.name} />
              <div className="p-5">
                <h3 className="text-xl font-bold">{agent.name}</h3>
                <p className="text-amber-600 text-sm">{agent.role}</p>
                {/* <div className="flex justify-center gap-3 mt-3 text-gray-500">
                  <Instagram size={18} className="hover:text-amber-500 cursor-pointer" />
                  <Linkedin size={18} className="hover:text-amber-500 cursor-pointer" />
                  <Mail size={18} className="hover:text-amber-500 cursor-pointer" />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Agents