import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { User, Mail, Lock, UserPlus, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/api/auth/register', { nombre, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Efectos de Iluminación de fondo */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-violet-600/10 blur-[130px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-cyan-600/10 blur-[130px] rounded-full"></div>

      <div className="w-full max-w-md relative animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Botón Volver sutil */}
        <Link to="/login" className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 mb-8 transition-colors group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Volver al Login</span>
        </Link>

        {/* Header de Registro */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <UserPlus size={24} className="text-white" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter italic">NUEVO <span className="text-violet-400">REGISTRO</span></h1>
          </div>
          <p className="text-slate-500 text-sm ml-1">Crea tu perfil académico para empezar el seguimiento.</p>
        </div>

        {/* Card Formulario */}
        <div className="bg-slate-900/40 border border-slate-800 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl relative">
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-in shake-1">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campo Nombre */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-[0.2em]">Nombre Completo</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-400 transition-colors" size={20} />
                <input
                  className="w-full bg-slate-950/50 border border-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  type="text"
                  placeholder="Ej: Juan Pérez"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campo Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-[0.2em]">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-400 transition-colors" size={20} />
                <input
                  className="w-full bg-slate-950/50 border border-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  type="email"
                  placeholder="email@utn.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Campo Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-[0.2em]">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-violet-400 transition-colors" size={20} />
                <input
                  className="w-full bg-slate-950/50 border border-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 outline-none transition-all"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-violet-600/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Crear Cuenta Académica"
              )}
            </button>
          </form>
        </div>

        {/* Decoración Footer */}
        <div className="mt-8 flex justify-center items-center gap-4">
        {/* Footer */}
        <p className="mt-8 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">
          UTN Sistemas - Seguimiento Académico 
        </p>
        </div>
      </div>
    </div>
  );
}