using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Application.DTOs
{
    public class EstadoMateriaDto
    {
        public int MateriaId { get; set; }
        public string Estado { get; set; } = string.Empty;
        public decimal? NotaFinal { get; set; }
        public DateTime FechaCambio { get; set; }
    }
}
