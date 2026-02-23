using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SeguimientoAcademico.Infrastructure.Persistence.Entities;

[Index("Codigo", "PlanId", Name = "IX_Materia_Codigo_Plan", IsUnique = true)]
public partial class Materia
{
    [Key]
    public int Id { get; set; }

    public int Codigo { get; set; }

    [StringLength(200)]
    public string Nombre { get; set; } = null!;

    public int Anio { get; set; }

    [StringLength(20)]
    public string Cuatrimestre { get; set; } = null!;

    public int PlanId { get; set; }

    [InverseProperty("MateriaDestino")]
    public virtual ICollection<Correlatividade> CorrelatividadeMateriaDestinos { get; set; } = new List<Correlatividade>();

    [InverseProperty("MateriaRequerida")]
    public virtual ICollection<Correlatividade> CorrelatividadeMateriaRequerida { get; set; } = new List<Correlatividade>();

    [InverseProperty("Materia")]
    public virtual ICollection<EstadosMaterium> EstadosMateria { get; set; } = new List<EstadosMaterium>();

    [ForeignKey("PlanId")]
    [InverseProperty("Materia")]
    public virtual PlanesEstudio Plan { get; set; } = null!;
}
