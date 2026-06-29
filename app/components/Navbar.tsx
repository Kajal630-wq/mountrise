'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Menu, X, LogIn } from 'lucide-react'


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '/properties' },
    { name: 'Agents', href: '/agents' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-5 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
        <img src="../logo/mountrise.png" height='50px'/>
          {/* <Building2 className="text-3xl text-amber-600" size={32} /> */}
          <span className="font-serif-alt text-2xl font-bold tracking-tight text-gray-800">
            Mount<span className="text-amber-600">Rise</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`hover:text-amber-600 transition ${
                pathname === link.href ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex px-5 py-2 border border-amber-600 text-amber-600 rounded-full hover:bg-amber-600 hover:text-white transition font-medium text-sm items-center gap-2">
            <LogIn size={16} /> Sign In
          </button>
          <button className="px-5 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition shadow-md font-medium text-sm">
            List Property
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-5 flex flex-col gap-4 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`hover:text-amber-600 py-2 ${
                pathname === link.href ? 'text-amber-600 font-semibold' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="my-1" />
          <button className="w-full py-2 border border-amber-600 text-amber-600 rounded-full">
            Sign In
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar