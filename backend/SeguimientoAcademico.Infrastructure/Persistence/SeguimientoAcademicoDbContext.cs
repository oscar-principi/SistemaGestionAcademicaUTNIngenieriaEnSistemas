using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SeguimientoAcademico.Infrastructure.Persistence.Entities;

namespace SeguimientoAcademico.Infrastructure.Persistence;

public partial class SeguimientoAcademicoDbContext : DbContext
{
    public SeguimientoAcademicoDbContext(DbContextOptions<SeguimientoAcademicoDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Carrera> Carreras { get; set; }

    public virtual DbSet<Correlatividade> Correlatividades { get; set; }

    public virtual DbSet<EstadosMaterium> EstadosMateria { get; set; }

    public virtual DbSet<Materia> Materias { get; set; }

    public virtual DbSet<PlanesEstudio> PlanesEstudios { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrera>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Carreras__3214EC0703FBB166");
        });

        modelBuilder.Entity<Correlatividade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Correlat__3214EC0777B48198");

            entity.HasOne(d => d.MateriaDestino).WithMany(p => p.CorrelatividadeMateriaDestinos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Correlativa_Destino");

            entity.HasOne(d => d.MateriaRequerida).WithMany(p => p.CorrelatividadeMateriaRequerida)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Correlativa_Requerida");
        });

        modelBuilder.Entity<EstadosMaterium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__EstadosM__3214EC0772850CF2");

            entity.Property(e => e.FechaCambio).HasDefaultValueSql("(sysdatetime())");

            entity.HasOne(d => d.Materia).WithMany(p => p.EstadosMateria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Estado_Materia");

            entity.HasOne(d => d.Usuario).WithMany(p => p.EstadosMateria)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Estado_Usuario");
        });

        modelBuilder.Entity<Materia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Materias__3214EC07227D2131");

            entity.HasOne(d => d.Plan).WithMany(p => p.Materia)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Materia_Plan");
        });

        modelBuilder.Entity<PlanesEstudio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PlanesEs__3214EC076D737ED1");

            entity.HasOne(d => d.Carrera).WithMany(p => p.PlanesEstudios)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Plan_Carrera");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuarios__3214EC07F071BEFE");

            entity.Property(e => e.FechaRegistro).HasDefaultValueSql("(sysdatetime())");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
