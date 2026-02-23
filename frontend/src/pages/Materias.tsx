import { useState, useEffect } from 'react';
import api from '../api';
import { BookOpen, Filter, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Materia {
  id: number;
  codigo: number;
  nombre: string;
  anio: number;
  cuatrimestre: string;
  habilitadaParaCursar?: boolean;
  habilitadaParaRendir?: boolean;
}

export default function Materias() {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [onlyHabilitadas, setOnlyHabilitadas] = useState(false);
  const [tipo, setTipo] = useState<'cursar' | 'rendir' | 'ambos'>('cursar');
  const [showNotaModal, setShowNotaModal] = useState(false);
  const [selectedMateriaForNota, setSelectedMateriaForNota] = useState<{ id: number; nombre: string } | null>(null);
  const [pendingNota, setPendingNota] = useState<string>('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; nombre: string } | null>(null);
  const [aprobadasMap, setAprobadasMap] = useState<Record<number, { nota?: number; fecha: string }>>({});

  const fetchMaterias = async () => {
    try {
      let path = onlyHabilitadas ? `/api/materias/habilitadas?tipo=${tipo}` : '/api/materias';
      const resp = await api.get<Materia[]>(path);
      setMaterias(resp.data);
    } catch (err: any) {
      setError('No se pudieron cargar las materias');
    }
  };

  const fetchAprobadas = async () => {
    try {
      const resp = await api.get<any[]>('/api/progreso/aprobadas');
      const map: Record<number, { nota?: number; fecha: string }> = {};
      resp.data.forEach((a: any) => {
        map[a.materiaId] = { nota: a.nota, fecha: new Date(a.fecha).toLocaleDateString() };
      });
      setAprobadasMap(map);
    } catch (err: any) {
      setError('No se pudieron cargar las materias aprobadas');
    }
  };

  useEffect(() => {
    fetchMaterias();
    fetchAprobadas();
  }, [onlyHabilitadas, tipo]);

  const handleChange = async (materiaId: number, estado: string, nombre: string) => {
    if (estado === 'Aprobada') {
      setSelectedMateriaForNota({ id: materiaId, nombre });
      setPendingNota('4'); // 👈 arranca en 4
      setShowNotaModal(true);
      return;
    }
    try {
      await api.post('/api/materias/estado', { materiaId, estado });
      setError(null);
      fetchMaterias();
      fetchAprobadas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar estado');
    }
  };

  const confirmNota = async () => {
    if (!selectedMateriaForNota) return;
    const nota = parseFloat(pendingNota.replace(',', '.'));
    if (isNaN(nota) || nota < 4 || nota > 10) {
      setError('Nota inválida. Debe estar entre 4 y 10');
      return;
    }
    try {
      await api.post('/api/materias/estado', { materiaId: selectedMateriaForNota.id, estado: 'Aprobada', notaFinal: nota });
      setShowNotaModal(false);
      setSelectedMateriaForNota(null);
      setError(null);
      fetchMaterias();
      fetchAprobadas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al actualizar');
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/api/materias/estado/${deleteTarget.id}`);
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
      setError(null);
      fetchMaterias();
      fetchAprobadas();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al eliminar');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header & Error Message */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <BookOpen className="text-cyan-400" /> Materias
          </h2>
          <p className="text-slate-400">Gestiona tu avance académico</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <label className="flex items-center gap-2 px-3 py-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={onlyHabilitadas} 
              onChange={(e) => setOnlyHabilitadas(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-cyan-500" 
            />
            <span className="text-sm font-medium text-slate-300 group-hover:text-cyan-400 transition-colors">Habilitadas</span>
          </label>
          <div className="h-6 w-px bg-slate-800"></div>
          <div className="flex items-center gap-2 px-3">
            <Filter size={14} className="text-slate-500" />
            <select 
              value={tipo} 
              onChange={(e) => setTipo(e.target.value as any)}
              className="bg-transparent text-sm font-medium focus:outline-none text-cyan-400 cursor-pointer"
            >
              <option value="cursar">Cursar</option>
              <option value="rendir">Rendir</option>
              <option value="ambos">Ambos</option>
            </select>
          </div>
        </div>
      </header>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl text-red-400 text-sm animate-in shake-1">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materias.map((m) => (
          <div key={m.id} className="group bg-slate-900 border border-slate-800 rounded-[2rem] p-6 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono font-bold text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-lg">#{m.codigo}</span>
              <button 
                onClick={() => { setDeleteTarget({ id: m.id, nombre: m.nombre }); setShowDeleteConfirm(true); }}
                className="text-slate-600 hover:text-red-400 transition-colors p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1">{m.nombre}</h3>
            <p className="text-xs text-slate-500 font-medium mb-6 uppercase tracking-wider">{m.anio}º Año • {m.cuatrimestre}</p>

            <div className="mt-auto">
              {aprobadasMap[m.id] ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex justify-between items-center">
                  <div className="flex items-center gap-2 text-emerald-400 font-black text-2xl">
                    <CheckCircle2 size={20} />
                    {aprobadasMap[m.id].nota?.toFixed(1)}
                  </div>
                  <span className="text-[10px] text-emerald-500/60 font-bold uppercase">{aprobadasMap[m.id].fecha}</span>
                </div>
              ) : (
                <select
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 text-sm rounded-xl p-3 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all"
                  defaultValue="NoCursada"
                  onChange={(e) => handleChange(m.id, e.target.value, m.nombre)}
                >
                  <option value="NoCursada">No cursada</option>
                  <option value="Regular">Regular</option>
                  <option value="Aprobada">Aprobada</option>
                </select>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Trash2 className="text-red-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-2">¿Eliminar estado?</h3>
            <p className="text-slate-400 text-center text-sm mb-8">Vas a resetear el progreso de <span className="text-white font-semibold">{deleteTarget?.nombre}</span>.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 p-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-800 transition-all">Cancelar</button>
              <button onClick={handleDelete} className="flex-1 p-4 rounded-2xl font-bold bg-red-600 text-white hover:bg-red-500 transition-all shadow-lg shadow-red-600/20">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Nota  */}
      {showNotaModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 text-center">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] max-w-sm w-full shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Cargar Nota</h3>
              <input 
                type="number"
                step="0.1"
                min="4"
                max="10"
                value={pendingNota}
                onChange={(e) => {
                  let value = parseFloat(e.target.value);
                  if (value < 4) value = 4;
                  if (value > 10) value = 10;
                  setPendingNota(value.toString());
                }}
                className="w-full bg-slate-950 border-2 border-slate-800 rounded-2xl p-6 text-center text-4xl font-black text-cyan-400 focus:border-cyan-500 outline-none transition-all mb-8"
                placeholder="4.0"
              />
            <div className="flex gap-3">
              <button onClick={() => setShowNotaModal(false)} className="flex-1 p-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-800">Cerrar</button>
              <button onClick={confirmNota} className="flex-1 p-4 rounded-2xl font-bold bg-cyan-600 text-white hover:bg-cyan-500 shadow-lg shadow-cyan-600/20">Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}