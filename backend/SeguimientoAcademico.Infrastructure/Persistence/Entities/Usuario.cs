using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

[Index("Email", Name = "UQ__Usuarios__A9D10534B1CC00FD", IsUnique = true)]
public partial class Usuario
{
    [Key]
    public int Id { get; set; }

    [StringLength(150)]
    public string Nombre { get; set; } = null!;

    [StringLength(150)]
    public string Email { get; set; } = null!;

    [StringLength(500)]
    public string PasswordHash { get; set; } = null!;

    public DateTime FechaRegistro { get; set; }

    [InverseProperty("Usuario")]
    public virtual ICollection<EstadosMaterium> EstadosMateria { get; set; } = new List<EstadosMaterium>();
}
