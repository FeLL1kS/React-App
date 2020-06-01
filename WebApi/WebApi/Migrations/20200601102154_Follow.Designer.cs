﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [DbContext(typeof(SNDBContext))]
    [Migration("20200601102154_Follow")]
    partial class Follow
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("WebAPI.Models.Contacts", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Facebook")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Github")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Instagram")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Twitter")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Vk")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Website")
                        .HasColumnType("varchar(200)");

                    b.Property<string>("Youtube")
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Contacts");
                });

            modelBuilder.Entity("WebAPI.Models.Followers", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CurrentUser")
                        .HasColumnType("int");

                    b.Property<int>("RequestedUser")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Followers");
                });

            modelBuilder.Entity("WebAPI.Models.Location", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("City")
                        .HasColumnType("varchar(250)");

                    b.Property<string>("Country")
                        .HasColumnType("varchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("WebAPI.Models.Photos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Extension")
                        .HasColumnType("varchar(10)");

                    b.Property<string>("FileName")
                        .HasColumnType("varchar(250)");

                    b.Property<string>("FilePath")
                        .HasColumnType("varchar(250)");

                    b.HasKey("Id");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("WebAPI.Models.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ContactsId")
                        .HasColumnType("int");

                    b.Property<bool>("LookingForAJob")
                        .HasColumnType("bit");

                    b.Property<string>("LookingForAJobDescription")
                        .HasColumnType("varchar(300)");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ContactsId");

                    b.HasIndex("UserId");

                    b.ToTable("Profiles");
                });

            modelBuilder.Entity("WebAPI.Models.Users", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("varchar(100)");

                    b.Property<bool>("Followed")
                        .HasColumnType("bit");

                    b.Property<int?>("LocationId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(100)");

                    b.Property<string>("Password")
                        .HasColumnType("varchar(50)");

                    b.Property<int?>("PhotoId")
                        .HasColumnType("int");

                    b.Property<string>("Status")
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("LocationId");

                    b.HasIndex("PhotoId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("WebAPI.Models.Profile", b =>
                {
                    b.HasOne("WebAPI.Models.Contacts", "Contacts")
                        .WithMany()
                        .HasForeignKey("ContactsId");

                    b.HasOne("WebAPI.Models.Users", "User")
                        .WithMany()
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("WebAPI.Models.Users", b =>
                {
                    b.HasOne("WebAPI.Models.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationId");

                    b.HasOne("WebAPI.Models.Photos", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId");
                });
#pragma warning restore 612, 618
        }
    }
}
