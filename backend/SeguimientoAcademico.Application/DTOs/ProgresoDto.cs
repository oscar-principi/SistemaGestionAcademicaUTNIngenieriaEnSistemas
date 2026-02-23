using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.DTOs
{
    public class ProgresoDto
    {
        public int MateriasAprobadas { get; set; }
        public int MateriasTotales { get; set; }
        public decimal Porcentaje { get; set; }
        public decimal Promedio { get; set; }
    }
}
