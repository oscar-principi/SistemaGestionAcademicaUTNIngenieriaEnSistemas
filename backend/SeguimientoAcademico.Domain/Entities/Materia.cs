namespace SeguimientoAcademico.Domain.Entities;

public class Materia
{
    public int Id { get; private set; }
    public int Codigo { get; private set; }
    public string Nombre { get; private set; }
    public int Anio { get; private set; }
    public string Cuatrimestre { get; private set; }
    public int PlanId { get; private set; }

    private Materia() { }

    public Materia(int codigo, string nombre, int anio, string cuatrimestre, int planId)
    {
        Codigo = codigo;
        Nombre = nombre;
        Anio = anio;
        Cuatrimestre = cuatrimestre;
        PlanId = planId;
    }
}