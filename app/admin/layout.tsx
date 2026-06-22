'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Home,
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Users,
  ChevronDown,
  ChevronRight,
  Bell,
  Search,
  Sun,
  Globe,
  Clock,
  Calendar,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['properties']);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    const user = localStorage.getItem('admin_user');
    if (user) {
      setAdminUser(JSON.parse(user));
    }

    // Update time
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 60000);

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [router]);

  const handleLogout = async () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const toggleMenu = (menu: string) => {
    setExpandedMenus(prev =>
      prev.includes(menu)
        ? prev.filter(m => m !== menu)
        : [...prev, menu]
    );
  };

  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return pathname === path;
    }
    return pathname?.startsWith(path);
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin/dashboard',
    },
    {
      title: 'Properties',
      icon: Home,
      path: '/admin/properties',
      subItems: [
        { title: 'All Properties', path: '/admin/properties' },
        { title: 'Add New', path: '/admin/properties/add' },
      ],
    },
    {
      title: 'Inquiries',
      icon: MessageSquare,
      path: '/admin/inquiries',
      badge: '12',
    },
    {
      title: 'Agents',
      icon: Users,
      path: '/admin/agents',
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Overlay (Mobile) */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ========== SIDEBAR ========== */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-50
          h-screen w-72 bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          flex flex-col shadow-lg
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-2 rounded-lg">
              <Building2 className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Admin</h1>
              <p className="text-xs text-gray-500">Real Estate Panel</p>
            </div>
          </Link>
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
              {adminUser?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{adminUser?.name || 'Admin'}</p>
              <p className="text-xs text-gray-500 truncate">{adminUser?.email || 'admin@estatehub.com'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.path);

            if (item.subItems) {
              const isExpanded = expandedMenus.includes(item.title.toLowerCase());
              return (
                <div key={item.title} className="mb-1">
                  <button
                    onClick={() => toggleMenu(item.title.toLowerCase())}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg
                      transition-all duration-200
                      ${isItemActive ? 'bg-amber-50 text-amber-600' : 'text-gray-600 hover:bg-gray-50'}
                    `}
                  >
                    <Icon size={20} />
                    <span className="flex-1 text-left font-medium">{item.title}</span>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                  {isExpanded && (
                    <div className="ml-9 mt-1 space-y-1">
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.path}
                          href={sub.path}
                          className={`
                            block px-4 py-2 text-sm rounded-lg transition
                            ${pathname === sub.path
                              ? 'bg-amber-50 text-amber-600 font-medium'
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }
                          `}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.title}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-lg
                  transition-all duration-200 mb-1
                  ${isItemActive
                    ? 'bg-amber-50 text-amber-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span className="flex-1">{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
              >
                <Menu size={24} />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-gray-500">Admin</span>
                <span className="text-gray-300">/</span>
                <span className="font-medium text-gray-800 capitalize">
                  {pathname?.split('/').pop() || 'Dashboard'}
                </span>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Weather */}
              <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                <Sun size={18} className="text-amber-500" />
                <span className="text-sm font-medium">33°C</span>
                <span className="text-xs text-gray-500">Clear</span>
              </div>

              {/* Language */}
              <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
                <Globe size={16} />
                <span>ENG</span>
              </div>

              {/* Time */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Clock size={16} />
                <span>{currentTime}</span>
              </div>

              {/* Date */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{currentDate}</span>
              </div>

              {/* Search */}
              <div className="hidden lg:flex items-center bg-gray-50 rounded-lg px-3 py-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-sm px-2 w-40"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User avatar (mobile) */}
              <div className="md:hidden">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-sm">
                  {adminUser?.name?.charAt(0) || 'A'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}