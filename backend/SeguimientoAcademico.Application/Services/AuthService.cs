using SeguimientoAcademico.Application.DTOs;
using SeguimientoAcademico.Application.Interfaces;
using SeguimientoAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IJwtProvider _jwtProvider; // servicio para generar JWT

        public AuthService(IUsuarioRepository usuarioRepository, IJwtProvider jwtProvider)
        {
            _usuarioRepository = usuarioRepository;
            _jwtProvider = jwtProvider;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var existente = await _usuarioRepository.GetByEmailAsync(dto.Email);
            if (existente != null)
                throw new Exception("El email ya está registrado");

            var usuario = new Usuario(dto.Nombre, dto.Email, PasswordHasher.Hash(dto.Password));

            await _usuarioRepository.AddAsync(usuario);
            await _usuarioRepository.SaveChangesAsync();

            var token = _jwtProvider.GenerateToken(usuario);

            return new AuthResponseDto
            {
                UsuarioId = usuario.Id,
                Email = usuario.Email,
                Token = token
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var usuario = await _usuarioRepository.GetByEmailAsync(dto.Email);
            if (usuario == null)
                throw new Exception("Credenciales inválidas");

            if (!PasswordHasher.Verify(dto.Password, usuario.PasswordHash))
                throw new Exception("Credenciales inválidas");

            var token = _jwtProvider.GenerateToken(usuario);

            return new AuthResponseDto
            {
                UsuarioId = usuario.Id,
                Email = usuario.Email,
                Token = token
            };
        }
    }
}
