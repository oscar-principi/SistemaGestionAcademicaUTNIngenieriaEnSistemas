using SeguimientoAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Interfaces
{
    public interface IEstadoMateriaRepository
    {
        Task<EstadoMateria?> GetEstadoAsync(int usuarioId, int materiaId);
        Task<List<EstadoMateria>> GetEstadosByUsuarioAsync(int usuarioId);
        Task AddOrUpdateAsync(EstadoMateria estado);
        Task DeleteAsync(int usuarioId, int materiaId);
        Task SaveChangesAsync();
    }
}
