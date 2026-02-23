namespace SeguimientoAcademico.Domain.Entities;

public class Usuario
{
    public int Id { get; private set; }
    public string Nombre { get; private set; }
    public string Email { get; private set; }
    public string PasswordHash { get; private set; }
    public DateTime FechaRegistro { get; private set; }

    public Usuario() { } // Para EF o mapeo

    public Usuario(string nombre, string email, string passwordHash)
    {
        Nombre = nombre;
        Email = email;
        PasswordHash = passwordHash;
        FechaRegistro = DateTime.UtcNow;
    }
}