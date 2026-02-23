using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

[Index("MateriaDestinoId", "MateriaRequeridaId", "Tipo", Name = "UQ_Correlatividad", IsUnique = true)]
public partial class Correlatividade
{
    [Key]
    public int Id { get; set; }

    public int MateriaDestinoId { get; set; }

    public int MateriaRequeridaId { get; set; }

    [StringLength(20)]
    public string Tipo { get; set; } = null!;

    [StringLength(20)]
    public string Condicion { get; set; } = null!;

    [ForeignKey("MateriaDestinoId")]
    [InverseProperty("CorrelatividadeMateriaDestinos")]
    public virtual Materia MateriaDestino { get; set; } = null!;

    [ForeignKey("MateriaRequeridaId")]
    [InverseProperty("CorrelatividadeMateriaRequerida")]
    public virtual Materia MateriaRequerida { get; set; } = null!;
}
