import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, BarChart3, LogOut, LayoutDashboard } from 'lucide-react'; 
import { AuthContext } from '../AuthContext';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); 

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 border-r border-slate-800 backdrop-blur-xl sticky top-0 h-screen p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <span className="text-black font-black text-xl">U</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            UTN <span className="text-cyan-400">Sistemas</span>
          </span>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-2">
          <MenuLink to="/" icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <MenuLink to="/materias" icon={<BookOpen size={20}/>} label="Materias" />
          <MenuLink to="/progreso" icon={<BarChart3 size={20}/>} label="Mi Progreso" />
        </nav>

        {/* Botón Cerrar Sesión */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all duration-300 mt-auto group"
        >
          <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
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
}

function MenuLink({ to, icon, label }: MenuLinkProps) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-slate-800 hover:text-cyan-400 group"
    >
      <span className="text-slate-400 group-hover:text-cyan-400 transition-colors">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}