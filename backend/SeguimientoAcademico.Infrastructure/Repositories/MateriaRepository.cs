using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Infrastructure.Persistence;

namespace SeguimientoAcademico.Infrastructure.Repositories
{
    public class MateriaRepository : IMateriaRepository
    {
        private readonly SeguimientoAcademicoDbContext _context;
        private readonly IMapper _mapper;

        public MateriaRepository(SeguimientoAcademicoDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Materia>> GetMateriasAsync()
        {
            var entities = await _context.Materias.ToListAsync();
            return _mapper.Map<List<Materia>>(entities);
        }

        public async Task<Materia?> GetByIdAsync(int id)
        {
            var entity = await _context.Materias.FindAsync(id);
            return entity == null ? null : _mapper.Map<Materia>(entity);
        }
    }
}