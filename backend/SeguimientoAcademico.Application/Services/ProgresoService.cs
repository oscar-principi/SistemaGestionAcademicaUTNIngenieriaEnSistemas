using SeguimientoAcademico.Application.DTOs;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Enums;
using System.Linq;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Services
{
    public class ProgresoService : IProgresoService
    {
        private readonly IEstadoMateriaRepository _estadoRepository;
        private readonly IMateriaRepository _materiaRepository;

        public ProgresoService(
            IEstadoMateriaRepository estadoRepository,
            IMateriaRepository materiaRepository)
        {
            _estadoRepository = estadoRepository;
            _materiaRepository = materiaRepository;
        }

        public async Task<ProgresoDto> ObtenerProgresoAsync(int usuarioId)
        {
            var estados = await _estadoRepository.GetEstadosByUsuarioAsync(usuarioId);
            var materias = await _materiaRepository.GetMateriasAsync();

            var aprobadas = estados.Where(e => e.Estado == EstadoMateriaEnum.Aprobada).ToList();

            var promedio = aprobadas.Any()
                ? aprobadas.Average(e => e.NotaFinal ?? 0)
                : 0;

            return new ProgresoDto
            {
                MateriasAprobadas = aprobadas.Count,
                MateriasTotales = materias.Count,
                Porcentaje = materias.Count == 0
                    ? 0
                    : (decimal)aprobadas.Count / materias.Count * 100,
                Promedio = promedio
            };
        }
    }
}