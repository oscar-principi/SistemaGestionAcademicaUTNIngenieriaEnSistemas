import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../AuthContext';
import { Lock, Mail, LogIn, AlertCircle, GraduationCap } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const resp = await api.post('/api/auth/login', { email, password });
      login(resp.data.token);
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciales inválidas');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Luces de fondo decorativas */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-violet-500/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md relative animate-in fade-in zoom-in duration-500">
        {/* Logo superior */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)] mb-4">
            <GraduationCap size={32} className="text-black" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter">
            UTN <span className="text-cyan-400">ACCESS</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">Seguimiento Académico</p>
        </div>

        {/* Panel de Login */}
        <div className="bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-xl font-bold text-slate-200 mb-6 text-center">Identificación de Usuario</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-in shake-1">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Email Institucional</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  className="w-full bg-slate-950 border border-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1 tracking-widest">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={20} />
                <input
                  className="w-full bg-slate-950 border border-slate-800 text-white p-4 pl-12 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 outline-none transition-all placeholder:text-slate-700"
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
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={20} />
                  Ingresar al Sistema
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-slate-500 text-sm">
              ¿Eres nuevo aspirante?{' '}
              <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
                Crear cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-600 text-[10px] font-mono uppercase tracking-[0.4em]">
          Secure Terminal v2.0 // UTN-FRC
        </p>
      </div>
    </div>
  );
}