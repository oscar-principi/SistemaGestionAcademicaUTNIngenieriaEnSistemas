import { useState, useEffect } from 'react';
import api from '../api';
import { 
  TrendingUp, 
  CheckCircle2, 
  Award, 
  BarChart, 
  Calendar,
  Zap
} from 'lucide-react';

interface ProgresoDto {
  materiasAprobadas: number;
  materiasTotales: number;
  porcentaje: number;
  promedio: number;
}

export default function Progreso() {
  const [progreso, setProgreso] = useState<ProgresoDto | null>(null);
  const [aprobadas, setAprobadas] = useState<Array<{ materiaId: number; nombre: string; nota?: number; fecha: string }>>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProgreso = async () => {
    try {
      const resp = await api.get<ProgresoDto>('/api/progreso');
      setProgreso(resp.data);
    } catch (err: any) {
      setError('No se pudo obtener el progreso académico');
    }
  };

  const fetchAprobadas = async () => {
    try {
      const resp = await api.get<any[]>('/api/progreso/aprobadas');
      setAprobadas(resp.data.map(a => ({ 
        ...a, 
        fecha: new Date(a.fecha).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }) 
      })));
    } catch (err: any) {}
  };

  useEffect(() => {
    fetchProgreso();
    fetchAprobadas();
  }, []);

  return (
    <div className="pt-10 md:pt-12 space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <h2 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
          <TrendingUp className="text-violet-500" /> Dashboard Académico
        </h2>
        <p className="text-slate-400 font-medium">Análisis detallado de tu rendimiento en Ingeniería.</p>
      </header>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 flex items-center gap-3">
          <Zap size={20} /> {error}
        </div>
      )}

      {/* Stats Grid */}
      {progreso ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            label="Promedio" 
            value={progreso.promedio.toFixed(2)} 
            icon={<Award className="text-cyan-400" />} 
            sub="General acumulado"
          />
          <StatCard 
            label="Aprobadas" 
            value={`${progreso.materiasAprobadas}`} 
            icon={<CheckCircle2 className="text-emerald-400" />} 
            sub={`de ${progreso.materiasTotales} totales`}
          />
          
          {/* Porcentaje Card (Doble ancho) */}
          <div className="col-span-1 md:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Carrera Completada</p>
                  <h3 className="text-4xl font-black text-white">{progreso.porcentaje.toFixed(1)}%</h3>
                </div>
                <BarChart className="text-violet-500 opacity-50 group-hover:scale-110 transition-transform" size={40} />
              </div>
              
              {/* Barra de progreso High-Tech */}
              <div className="w-full h-4 bg-slate-950 rounded-full border border-slate-800 p-1 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-600 rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  style={{ width: `${progreso.porcentaje}%` }}
                />
              </div>
            </div>
            {/* Resplandor de fondo */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-violet-600/10 blur-[50px] rounded-full"></div>
          </div>
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center text-slate-500 animate-pulse font-mono uppercase tracking-widest">
          Iniciando escaneo de datos...
        </div>
      )}

      {/* History Table-Card */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xl font-bold text-white flex items-center gap-3">
            <Calendar className="text-cyan-500" size={20} /> 
            Historial de Materias Aprobadas
          </h3>
          <span className="text-xs font-mono text-slate-500 uppercase">{aprobadas.length} Registros encontrados</span>
        </div>
        
        <div className="p-4">
          {aprobadas.length ? (
            <div className="space-y-3">
              {aprobadas.map(a => (
                <div key={a.materiaId} className="flex items-center justify-between p-5 rounded-3xl bg-slate-950/40 border border-slate-800/50 hover:border-cyan-500/30 hover:bg-slate-900/50 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200 group-hover:text-white transition-colors">{a.nombre}</h4>
                      <p className="text-xs text-slate-500 font-mono italic">{a.fecha}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">Nota Final</span>
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500">
                      {a.nota ?? '--'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="inline-block p-6 rounded-full bg-slate-900 border border-slate-800 mb-4 opacity-50">
                <Zap size={40} className="text-slate-600" />
              </div>
              <p className="text-slate-500 font-medium">No se detectan materias aprobadas en el sistema.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, sub }: { label: string, value: string, icon: any, sub: string }) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] hover:border-slate-700 transition-all group relative overflow-hidden">
      <div className="relative z-10">
        <div className="mb-4 p-3 bg-slate-950 w-fit rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
        <h3 className="text-3xl font-black text-white mb-1">{value}</h3>
        <p className="text-slate-600 text-[10px] font-medium uppercase tracking-tight">{sub}</p>
      </div>
      {/* Glow sutil */}
      <div className="absolute -left-4 -top-4 w-20 h-20 bg-white/5 blur-3xl rounded-full"></div>
    </div>
  );
}