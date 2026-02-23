using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.DTOs
{
    public class CorrelatividadDto
    {
        public int MateriaDestinoId { get; set; }
        public int MateriaRequeridaId { get; set; }
        public string Tipo { get; set; } = string.Empty; // ParaCursar / ParaFinal
        public string Condicion { get; set; } = string.Empty; // Regular / Aprobada
    }
}
