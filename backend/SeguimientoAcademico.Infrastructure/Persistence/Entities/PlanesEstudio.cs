using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

[Table("PlanesEstudio")]
public partial class PlanesEstudio
{
    [Key]
    public int Id { get; set; }

    public int AnioPlan { get; set; }

    public int CarreraId { get; set; }

    [ForeignKey("CarreraId")]
    [InverseProperty("PlanesEstudios")]
    public virtual Carrera Carrera { get; set; } = null!;

    [InverseProperty("Plan")]
    public virtual ICollection<Materia> Materia { get; set; } = new List<Materia>();
}
