using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Infrastructure.Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Infrastructure.Repositories
{
    public class CorrelatividadRepository : ICorrelatividadRepository
    {
        private readonly SeguimientoAcademicoDbContext _context;
        private readonly IMapper _mapper;

        public CorrelatividadRepository(
            SeguimientoAcademicoDbContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Correlatividad>> GetCorrelativasAsync(int materiaId)
        {
            var entidades = await _context.Correlatividades
                .Where(c => c.MateriaDestinoId == materiaId)
                .ToListAsync();

            return _mapper.Map<List<Correlatividad>>(entidades);
        }
    }
}