using SeguimientoAcademico.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.Interfaces
{
    public interface IJwtProvider
    {
        string GenerateToken(Usuario usuario);
    }
}
