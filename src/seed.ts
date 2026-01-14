// src/seed.ts
import "dotenv/config";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  console.log("Seed iniciado");

  // 1 Crear usuario de prueba
  const passwordHash = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      email: "usuario@ojomovil.test",
      passwordHash,
    },
  });
  console.log("User creado:", user.email);

  // 2️ Crear FestivalEdition
  const festivalCurrent = await prisma.festivalEdition.create({
    data: {
      year: 2026,
      title: "OJO MOVIL 2026",
      description: "La edición del festival para 2026",
      isCurrent: true,
    },
  });
  console.log("FestivalEdition actual creada:", festivalCurrent.title);

  const festivalPast = await prisma.festivalEdition.create({
    data: {
      year: 2025,
      title: "OJO MOVIL 2025",
      description: "Edición pasada del festival",
      isCurrent: false,
    },
  });
  console.log("FestivalEdition pasada creada:", festivalPast.title);

  const festivalPast2 = await prisma.festivalEdition.create({
    data: {
      year: 2024,
      title: "OJO MOVIL 2024",
      description: "Edición pasada del festival",
      isCurrent: false,
    },
  });
  console.log("FestivalEdition pasada creada:", festivalPast2.title);

  // 3️ Crear ShortFilms
  const shortFilmsData = [
    {
      title: "Corto Experimental 1",
      slug: "corto-experimental-1",
      description: "Primer corto de prueba",
      embedUrl: "https://vimeo.com/123456789",
      duration: 120,
      year: 2026,
      published: true,
      festivalEditionId: festivalCurrent.id,
    },
    {
      title: "Corto Narrativo 2",
      slug: "corto-narrativo-2",
      description: "Segundo corto de prueba",
      embedUrl: "https://vimeo.com/987654321",
      duration: 150,
      year: 2026,
      published: true,
      festivalEditionId: festivalCurrent.id,
    },
    {
      title: "Corto Documental 3",
      slug: "corto-documental-3",
      description: "Tercer corto de prueba",
      embedUrl: "https://vimeo.com/192837465",
      duration: 200,
      year: 2025,
      published: true,
      festivalEditionId: festivalPast.id,
    },
  ];

  for (const film of shortFilmsData) {
    const sf = await prisma.shortFilm.create({ data: film });
    console.log("ShortFilm creada:", sf.title);
  }

  // 4️ Crear BlogPosts
  const blogPostsData = [
    {
      title: "Bienvenida al Festival OJO MOVIL 2026",
      slug: "bienvenida-ojomovil-2026",
      content: "Contenido de bienvenida al festival...",
      category: "Noticias",
      published: true,
      publishedAt: new Date(),
    },
    {
      title: "Convocatoria de Cortometrajes 2026",
      slug: "convocatoria-cortos-2026",
      content: "Detalles de la convocatoria 2026...",
      category: "Convocatorias",
      published: true,
      publishedAt: new Date(),
    },
  ];

  for (const post of blogPostsData) {
    const bp = await prisma.blogPost.create({ data: post });
    console.log("BlogPost creado:", bp.title);
  }

  console.log("Seed completado");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
