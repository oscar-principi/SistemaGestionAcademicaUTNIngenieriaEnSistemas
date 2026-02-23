using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Infrastructure.Persistence;
using SeguimientoAcademico.Infrastructure.Persistence.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Infrastructure.Repositories
{
    public class EstadoMateriaRepository : IEstadoMateriaRepository
    {
        private readonly SeguimientoAcademicoDbContext _context;
        private readonly IMapper _mapper;

        public EstadoMateriaRepository(SeguimientoAcademicoDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<EstadoMateria?> GetEstadoAsync(int usuarioId, int materiaId)
        {
            var entity = await _context.EstadosMateria
                .FirstOrDefaultAsync(e => e.UsuarioId == usuarioId && e.MateriaId == materiaId);

            return entity == null ? null : _mapper.Map<EstadoMateria>(entity);
        }

        public async Task<List<EstadoMateria>> GetEstadosByUsuarioAsync(int usuarioId)
        {
            var entities = await _context.EstadosMateria
                .Where(e => e.UsuarioId == usuarioId)
                .ToListAsync();

            return _mapper.Map<List<EstadoMateria>>(entities);
        }

        public async Task AddOrUpdateAsync(EstadoMateria estado)
        {
            var entity = await _context.EstadosMateria
                .FirstOrDefaultAsync(e => e.UsuarioId == estado.UsuarioId && e.MateriaId == estado.MateriaId);

            if (entity == null)
            {
                entity = _mapper.Map<EstadosMaterium>(estado);
                await _context.EstadosMateria.AddAsync(entity);
            }
            else
            {
                _mapper.Map(estado, entity); 
            }
        }

        public async Task DeleteAsync(int usuarioId, int materiaId)
        {
            var entity = await _context.EstadosMateria
                .FirstOrDefaultAsync(e => e.UsuarioId == usuarioId && e.MateriaId == materiaId);

            if (entity != null)
            {
                _context.EstadosMateria.Remove(entity);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
