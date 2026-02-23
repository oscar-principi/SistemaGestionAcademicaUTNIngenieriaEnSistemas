using SeguimientoAcademico.Domain.Enums;

namespace SeguimientoAcademico.Domain.Entities;

public class EstadoMateria
{
    public int Id { get; private set; }
    public int UsuarioId { get; private set; }
    public int MateriaId { get; private set; }
    public EstadoMateriaEnum Estado { get; private set; }
    public decimal? NotaFinal { get; private set; }
    public DateTime FechaCambio { get; private set; }

    public EstadoMateria() { }

    public EstadoMateria(int usuarioId, int materiaId)
    {
        UsuarioId = usuarioId;
        MateriaId = materiaId;
        Estado = EstadoMateriaEnum.NoCursada;
        FechaCambio = DateTime.UtcNow;
    }

    public void MarcarRegular()
    {
        Estado = EstadoMateriaEnum.Regular;
        NotaFinal = null;
        FechaCambio = DateTime.UtcNow;
    }

    public void MarcarAprobada(decimal nota)
    {
        if (nota < 4 || nota > 10)
            throw new InvalidOperationException("Nota inválida");

        Estado = EstadoMateriaEnum.Aprobada;
        NotaFinal = nota;
        FechaCambio = DateTime.UtcNow;
    }
}