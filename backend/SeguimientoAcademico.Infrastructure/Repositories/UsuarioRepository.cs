using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Infrastructure.Persistence;

namespace SeguimientoAcademico.Infrastructure.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly SeguimientoAcademicoDbContext _context;
        private readonly IMapper _mapper;

        public UsuarioRepository(SeguimientoAcademicoDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Usuario?> GetByEmailAsync(string email)
        {
            var entity = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            return entity == null ? null : _mapper.Map<Usuario>(entity);
        }

        public async Task AddAsync(Usuario usuario)
        {
            var entity = _mapper.Map<SeguimientoAcademico.Infrastructure.Persistence.Entities.Usuario>(usuario);
            await _context.Usuarios.AddAsync(entity);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}