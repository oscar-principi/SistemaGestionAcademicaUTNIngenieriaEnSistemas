namespace SeguimientoAcademico.Application.DTOs
{
    public class MateriaConEstadoDto : MateriaDto
    {
        public bool HabilitadaParaCursar { get; set; }
        public bool HabilitadaParaRendir { get; set; }
    }
}