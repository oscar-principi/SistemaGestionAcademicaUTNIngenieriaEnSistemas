using SeguimientoAcademico.Application.DTOs;
using SeguimientoAcademico.Domain.Entities;
using AutoMapper;

namespace SeguimientoAcademico.Application.Mappings
{

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // ============================================================
            // AUTENTICACIÓN
            // ============================================================

            CreateMap<Usuario, AuthResponseDto>()
                .ForMember(dest => dest.UsuarioId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.Token, opt => opt.Ignore());

            // ============================================================
            // MATERIAS
            // ============================================================

            CreateMap<Materia, MateriaDto>();

            // EstadoMateria -> DTO
            CreateMap<EstadoMateria, EstadoMateriaDto>();

            // DTO -> EstadoMateria (para alta/actualización)
            CreateMap<EstadoMateriaDto, EstadoMateria>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.UsuarioId, opt => opt.Ignore())
                .ForMember(dest => dest.MateriaId, opt => opt.MapFrom(src => src.MateriaId))
                .ForMember(dest => dest.FechaCambio, opt => opt.Ignore());

            // ============================================================
            // CORRELATIVIDADES
            // ============================================================

            CreateMap<Correlatividad, CorrelatividadDto>();
            CreateMap<CorrelatividadDto, Correlatividad>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            // ============================================================
            // PROGRESO
            // ============================================================

            // ProgresoDto generalmente se arma manualmente desde servicio,
            // pero si tenés entidad o modelo equivalente, se puede mapear.
        }
    }
}
