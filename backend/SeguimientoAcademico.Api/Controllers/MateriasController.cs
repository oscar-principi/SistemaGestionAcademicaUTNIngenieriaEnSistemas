using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SeguimientoAcademico.Application.DTOs;
using SeguimientoAcademico.Application.Interfaces;
using System.Security.Claims;

namespace SeguimientoAcademico.Api.Controllers
{
    [ApiController]
    [Route("api/materias")]
    [Authorize]
    public class MateriasController : ControllerBase
    {
        private readonly IMateriaService _materiaService;

        public MateriasController(IMateriaService materiaService)
        {
            _materiaService = materiaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetMaterias()
        {
            var materias = await _materiaService.GetMateriasAsync();
            return Ok(materias);
        }

        [HttpGet("habilitadas")]
        public async Task<IActionResult> GetHabilitadas([FromQuery] string tipo = "cursar")
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var materias = await _materiaService.GetMateriasHabilitadasAsync(usuarioId, tipo);
            return Ok(materias);
        }

        [HttpPost("estado")]
        public async Task<IActionResult> ActualizarEstado(EstadoMateriaDto dto)
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            // Si se marca como Aprobada, debe venir la nota
            if (dto.Estado == "Aprobada" && dto.NotaFinal == null)
            {
                return BadRequest(new { message = "NotaFinal requerida al marcar Aprobada" });
            }

            if (dto.NotaFinal != null && (dto.NotaFinal < 4 || dto.NotaFinal > 10))
            {
                return BadRequest(new { message = "NotaFinal debe estar entre 4 y 10" });
            }

            await _materiaService.ActualizarEstadoAsync(dto, usuarioId);

            return Ok();
        }

        [HttpDelete("estado/{materiaId}")]
        public async Task<IActionResult> EliminarEstado(int materiaId)
        {
            var usuarioId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var estado = await _materiaService.GetEstadoAsync(usuarioId, materiaId);
            if (estado == null)
            {
                return NotFound();
            }

            await _materiaService.EliminarEstadoAsync(usuarioId, materiaId);

            return Ok();
        }
    }
}
