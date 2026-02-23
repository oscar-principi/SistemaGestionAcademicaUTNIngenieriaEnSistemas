import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';
import { AuthContext } from '../AuthContext';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">

      {/* ================= MOBILE HEADER ================= */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 flex items-center px-4 z-40">
        
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-slate-800 transition"
        >
          <Menu size={24} />
        </button>

        <div className="flex items-center gap-2 ml-4">
          <div className="w-8 h-8 bg-cyan-500 rounded-md flex items-center justify-center">
            <span className="text-black font-black text-sm">U</span>
          </div>
          <span className="font-semibold text-white">
            UTN <span className="text-cyan-400">Sistemas</span>
          </span>
        </div>
      </header>

      {/* ================= BACKDROP ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed z-50
          w-64 h-screen
          bg-slate-900/90 backdrop-blur-xl
          border-r border-slate-800
          p-6 flex flex-col
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Cerrar en mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4"
        >
          <X size={22} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2 mt-8 lg:mt-0">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-black font-black text-xl">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            UTN <span className="text-cyan-400">Sistemas</span>
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-2">
          <MenuLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" close={() => setIsOpen(false)} />
          <MenuLink to="/materias" icon={<BookOpen size={20} />} label="Materias" close={() => setIsOpen(false)} />
          <MenuLink to="/progreso" icon={<BarChart3 size={20} />} label="Mi Progreso" close={() => setIsOpen(false)} />
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 mt-auto group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 w-full pt-16 lg:pt-0 lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

interface MenuLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  close: () => void;
}

function MenuLink({ to, icon, label, close }: MenuLinkProps) {
  return (
    <Link
      to={to}
      onClick={close}
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-slate-800 hover:text-cyan-400 group"
    >
      <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}