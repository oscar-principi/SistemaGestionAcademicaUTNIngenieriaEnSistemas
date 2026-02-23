using SeguimientoAcademico.Application.DTOs;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Interfaces
{
    public interface IProgresoService
    {
        Task<ProgresoDto> ObtenerProgresoAsync(int usuarioId);
    }
}   