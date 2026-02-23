using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeguimientoAcademico.Domain.Entities
{
    public class Correlatividad
    {
        public int Id { get; private set; }
        public int MateriaDestinoId { get; private set; }
        public int MateriaRequeridaId { get; private set; }
        public string Tipo { get; private set; } = string.Empty; // ParaCursar / ParaFinal
        public string Condicion { get; private set; } = string.Empty; // Regular / Aprobada

        private Correlatividad() { }

        public Correlatividad(int materiaDestinoId, int materiaRequeridaId, string tipo, string condicion)
        {
            MateriaDestinoId = materiaDestinoId;
            MateriaRequeridaId = materiaRequeridaId;
            Tipo = tipo;
            Condicion = condicion;
        }
    }
}
