using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeguimientoAcademico.Application.Interfaces;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Api.Controllers
{
    [ApiController]
    [Route("api/progreso")]
    [Authorize]
    public class ProgresoController : ControllerBase
    {
        private readonly IProgresoService _progresoService;
        private readonly IEstadoMateriaRepository _estadoRepository;
        private readonly IMateriaRepository _materiaRepository;

        public ProgresoController(IProgresoService progresoService,
                                  IEstadoMateriaRepository estadoRepository,
                                  IMateriaRepository materiaRepository)
        {
            _progresoService = progresoService;
            _estadoRepository = estadoRepository;
            _materiaRepository = materiaRepository;
        }

        [HttpGet]
        public async Task<IActionResult> ObtenerProgreso()
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var progreso = await _progresoService.ObtenerProgresoAsync(usuarioId);

            return Ok(progreso);
        }

        [HttpGet("aprobadas")]
        public async Task<IActionResult> ObtenerAprobadas()
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var estados = await _estadoRepository.GetEstadosByUsuarioAsync(usuarioId);
            var materias = await _materiaRepository.GetMateriasAsync();

            var aprobadas = estados
                .Where(e => e.Estado.ToString() == "Aprobada")
                .Select(e => new
                {
                    materiaId = e.MateriaId,
                    nombre = materias.FirstOrDefault(m => m.Id == e.MateriaId)?.Nombre ?? "Desconocida",
                    nota = e.NotaFinal,
                    fecha = e.FechaCambio
                })
                .OrderByDescending(x => x.fecha)
                .ToList();

            return Ok(aprobadas);
        }
    }
}