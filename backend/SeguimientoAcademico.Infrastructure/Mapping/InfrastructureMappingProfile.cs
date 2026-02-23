using AutoMapper;
using SeguimientoAcademico.Domain.Entities;
using SeguimientoAcademico.Infrastructure.Persistence.Entities;

namespace SeguimientoAcademico.Infrastructure.Mapping
{
    public class InfrastructureMappingProfile : Profile
    {
        public InfrastructureMappingProfile()
        {
            CreateMap<SeguimientoAcademico.Infrastructure.Persistence.Entities.Usuario,
                     SeguimientoAcademico.Domain.Entities.Usuario>()
                .ReverseMap();

            CreateMap<SeguimientoAcademico.Infrastructure.Persistence.Entities.Materia,
                 SeguimientoAcademico.Domain.Entities.Materia>()
            .ReverseMap();

            CreateMap<SeguimientoAcademico.Infrastructure.Persistence.Entities.Correlatividade,
                 SeguimientoAcademico.Domain.Entities.Correlatividad>()
            .ReverseMap();

            CreateMap<SeguimientoAcademico.Infrastructure.Persistence.Entities.EstadosMaterium,
                 SeguimientoAcademico.Domain.Entities.EstadoMateria>()
            .ReverseMap();
        }
    }
}