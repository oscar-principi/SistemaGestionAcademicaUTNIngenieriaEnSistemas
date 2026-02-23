import { useNavigate } from 'react-router-dom';
import { Rocket, BookOpen, BarChart3, ChevronRight, GraduationCap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="mt-6 md:mt-10 max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-top-4 duration-1000">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-[3rem] p-8 md:p-16 shadow-2xl">
        {/* Decoración de fondo */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-violet-500/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-4">
            <GraduationCap size={40} className="text-black" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Ingeniería en <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Sistemas</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto">
              Seguimiento académico inteligente • Universidad Tecnológica Nacional
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => navigate('/materias')}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 group"
            >
              Comenzar ahora
              <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HomeCard 
          onClick={() => navigate('/progreso')}
          icon={<BarChart3 size={32} className="text-violet-400" />}
          title="Estado Académico"
          description="Visualiza tus métricas de rendimiento, promedio general y porcentaje de avance en la carrera de forma detallada."
          gradient="hover:border-violet-500/50"
        />
        <HomeCard 
          onClick={() => navigate('/materias')}
          icon={<BookOpen size={32} className="text-cyan-400" />}
          title="Gestión de Materias"
          description="Registra tus cursadas, marca finales aprobados y consulta qué materias estás habilitado para rendir según correlativas."
          gradient="hover:border-cyan-500/50"
        />
      </section>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">
          UTN Sistemas - Seguimiento Académico 
        </p>
    </div>
  );
}

function HomeCard({ icon, title, description, onClick, gradient }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string, 
  onClick: () => void,
  gradient: string 
}) {
  return (
    <button 
      onClick={onClick}
      className={`text-left p-8 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] transition-all duration-300 group ${gradient} hover:bg-slate-900 hover:-translate-y-2`}
    >
      <div className="mb-6 p-4 bg-slate-950 w-fit rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 flex items-center justify-between">
        {title}
        <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-slate-500" />
      </h3>
      <p className="text-slate-400 leading-relaxed">
        {description}
      </p>
    </button>
  );
}