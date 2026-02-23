namespace SeguimientoAcademico.Domain.Entities;

public class PlanEstudio
{
    public int Id { get; private set; }
    public int AnioPlan { get; private set; }
    public int CarreraId { get; private set; }

    public Carrera Carrera { get; private set; }

    private PlanEstudio() { }

    public PlanEstudio(int anioPlan, int carreraId)
    {
        AnioPlan = anioPlan;
        CarreraId = carreraId;
    }
}