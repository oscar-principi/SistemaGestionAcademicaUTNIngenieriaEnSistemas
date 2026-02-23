using SeguimientoAcademico.Application.DTOs;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Services
{
    public class MateriaService : IMateriaService
    {
        private readonly IMateriaRepository _materiaRepository;
        private readonly IEstadoMateriaRepository _estadoRepository;
        private readonly ICorrelatividadRepository _correlatividadRepository;

        public MateriaService(
            IMateriaRepository materiaRepository,
            IEstadoMateriaRepository estadoRepository,
            ICorrelatividadRepository correlatividadRepository)
        {
            _materiaRepository = materiaRepository;
            _estadoRepository = estadoRepository;
            _correlatividadRepository = correlatividadRepository;
        }

        public async Task<List<MateriaDto>> GetMateriasAsync()
        {
            var materias = await _materiaRepository.GetMateriasAsync();

            return materias.Select(m => new MateriaDto
            {
                Id = m.Id,
                Codigo = m.Codigo,
                Nombre = m.Nombre,
                Anio = m.Anio,
                Cuatrimestre = m.Cuatrimestre
            }).ToList();
        }

        public async Task<List<MateriaConEstadoDto>> GetMateriasHabilitadasAsync(int usuarioId, string tipo = "cursar")
        {
            var materias = await _materiaRepository.GetMateriasAsync();
            var estados = await _estadoRepository.GetEstadosByUsuarioAsync(usuarioId);

            var resultado = new List<MateriaConEstadoDto>();

            foreach (var materia in materias)
            {
                var habCursar = await EstaHabilitadaAsync(materia.Id, estados);
                var habRendir = await EstaHabilitadaParaRendirAsync(materia.Id, estados);

                bool incluir = tipo == "cursar" && habCursar
                              || tipo == "rendir" && habRendir
                              || tipo == "ambos" && (habCursar || habRendir);

                if (incluir)
                {
                    resultado.Add(new MateriaConEstadoDto
                    {
                        Id = materia.Id,
                        Codigo = materia.Codigo,
                        Nombre = materia.Nombre,
                        Anio = materia.Anio,
                        Cuatrimestre = materia.Cuatrimestre,
                        HabilitadaParaCursar = habCursar,
                        HabilitadaParaRendir = habRendir
                    });
                }
            }

            return resultado;
        }

        public async Task ActualizarEstadoAsync(EstadoMateriaDto dto, int usuarioId)
        {
            var estado = await _estadoRepository.GetEstadoAsync(usuarioId, dto.MateriaId);

            if (estado == null)
            {
                estado = new EstadoMateria(usuarioId, dto.MateriaId);
            }

            if (dto.Estado == "Regular")
                estado.MarcarRegular();
            else if (dto.Estado == "Aprobada")
                estado.MarcarAprobada(dto.NotaFinal ?? 0);

            await _estadoRepository.AddOrUpdateAsync(estado);
            await _estadoRepository.SaveChangesAsync();
        }

        private async Task<bool> EstaHabilitadaAsync(int materiaId, List<EstadoMateria> estados)
        {
            // sólo correlativas que se aplican para cursar
            var correlativas = (await _correlatividadRepository.GetCorrelativasAsync(materiaId))
                                 .Where(c => c.Tipo == "ParaCursar")
                                 .ToList();

            foreach (var cor in correlativas)
            {
                var estadoReq = estados.FirstOrDefault(e => e.MateriaId == cor.MateriaRequeridaId);

                // si no tiene ningún registro, no está habilitada
                if (estadoReq == null)
                    return false;

                if (cor.Condicion == "Aprobada")
                {
                    if (estadoReq.Estado != EstadoMateriaEnum.Aprobada)
                        return false;
                }
                else if (cor.Condicion == "Regular")
                {
                    // para cursar alcanza con regular o aprobada
                    if (estadoReq.Estado != EstadoMateriaEnum.Regular &&
                        estadoReq.Estado != EstadoMateriaEnum.Aprobada)
                        return false;
                }
                else
                {
                    // condición desconocida, considerarla no cumplida
                    return false;
                }
            }

            return true;
        }

        private async Task<bool> EstaHabilitadaParaRendirAsync(int materiaId, List<EstadoMateria> estados)
        {
            var correlativas = (await _correlatividadRepository.GetCorrelativasAsync(materiaId))
                                 .Where(c => c.Tipo == "ParaFinal")
                                 .ToList();

            foreach (var cor in correlativas)
            {
                var estadoReq = estados.FirstOrDefault(e => e.MateriaId == cor.MateriaRequeridaId);
                if (estadoReq == null)
                    return false;

                if (cor.Condicion == "Aprobada")
                {
                    if (estadoReq.Estado != EstadoMateriaEnum.Aprobada)
                        return false;
                }
                else if (cor.Condicion == "Regular")
                {
                    if (estadoReq.Estado != EstadoMateriaEnum.Regular &&
                        estadoReq.Estado != EstadoMateriaEnum.Aprobada)
                        return false;
                }
                else
                {
                    return false;
                }
            }

            return true;
        }


        public async Task<EstadoMateriaDto?> GetEstadoAsync(int usuarioId, int materiaId)
        {
            var estado = await _estadoRepository.GetEstadoAsync(usuarioId, materiaId);
            if (estado == null) return null;

            return new EstadoMateriaDto
            {
                MateriaId = estado.MateriaId,
                Estado = estado.Estado.ToString(),
                NotaFinal = estado.NotaFinal,
                FechaCambio = estado.FechaCambio
            };
        }

        public async Task EliminarEstadoAsync(int usuarioId, int materiaId)
        {
            await _estadoRepository.DeleteAsync(usuarioId, materiaId);
            await _estadoRepository.SaveChangesAsync();
        }
    }
}