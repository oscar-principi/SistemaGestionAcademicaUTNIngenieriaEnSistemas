using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.DTOs
{
    public class MateriaDto
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public int Anio { get; set; }
        public string Cuatrimestre { get; set; } = string.Empty;
    }
}
