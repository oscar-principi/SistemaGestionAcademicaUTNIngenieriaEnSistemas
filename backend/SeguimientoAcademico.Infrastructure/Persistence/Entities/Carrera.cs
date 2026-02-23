using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

public partial class Carrera
{
    [Key]
    public int Id { get; set; }

    [StringLength(150)]
    public string Nombre { get; set; } = null!;

    [InverseProperty("Carrera")]
    public virtual ICollection<PlanesEstudio> PlanesEstudios { get; set; } = new List<PlanesEstudio>();
}
