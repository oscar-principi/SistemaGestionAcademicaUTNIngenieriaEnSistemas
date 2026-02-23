using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

[Index("UsuarioId", "MateriaId", Name = "UQ_Estado", IsUnique = true)]
public partial class EstadosMaterium
{
    [Key]
    public int Id { get; set; }

    public int UsuarioId { get; set; }

    public int MateriaId { get; set; }

    [StringLength(20)]
    public string Estado { get; set; } = null!;

    [Column(TypeName = "decimal(4, 2)")]
    public decimal? NotaFinal { get; set; }

    public DateTime FechaCambio { get; set; }

    [ForeignKey("MateriaId")]
    [InverseProperty("EstadosMateria")]
    public virtual Materia Materia { get; set; } = null!;

    [ForeignKey("UsuarioId")]
    [InverseProperty("EstadosMateria")]
    public virtual Usuario Usuario { get; set; } = null!;
}
