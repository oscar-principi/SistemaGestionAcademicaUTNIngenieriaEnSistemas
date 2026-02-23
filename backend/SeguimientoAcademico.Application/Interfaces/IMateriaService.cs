using SeguimientoAcademico.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Interfaces
{
    public interface IMateriaService
    {
        Task<List<MateriaDto>> GetMateriasAsync();
        Task<List<MateriaConEstadoDto>> GetMateriasHabilitadasAsync(int usuarioId, string tipo = "cursar");
        Task ActualizarEstadoAsync(EstadoMateriaDto dto, int usuarioId);
        Task<EstadoMateriaDto?> GetEstadoAsync(int usuarioId, int materiaId);
        Task EliminarEstadoAsync(int usuarioId, int materiaId);
    }
}
