namespace SeguimientoAcademico.Domain.Entities;

public class Carrera
{
    public int Id { get; private set; }
    public string Nombre { get; private set; }

    private Carrera() { }
}