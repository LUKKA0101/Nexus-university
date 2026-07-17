import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/lib/prisma";

async function main() {
  console.log("🌱 Rodando seed...");

  const password = await bcrypt.hash("123456", 10);

  const course = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "Análise e Desenvolvimento de Sistemas" },
  });

  const discipline = await prisma.discipline.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1, name: "Backend com Node.js" },
  });

  const classroom = await prisma.classroom.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Turma 2026.1",
      semester: 1,
      year: 2026,
      courseId: course.id,
    },
  });

  const courseModule = await prisma.courseModule.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Módulo 1 - Fundamentos",
      disciplineId: discipline.id,
    },
  });

  const lesson = await prisma.lesson.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      title: "Introdução ao Express",
      videoUrl: "https://example.com/video1",
      moduleId: courseModule.id,
    },
  });

  await prisma.user.upsert({
    where: { email: "diretor@nexus.edu" },
    update: {},
    create: {
      name: "Diretor Exemplo",
      email: "diretor@nexus.edu",
      birthDate: new Date("1980-01-01"),
      password,
      role: "DIRECTOR",
      director: { create: {} },
    },
  });

  const teacherUser = await prisma.user.upsert({
    where: { email: "professor@nexus.edu" },
    update: {},
    create: {
      name: "Professor Exemplo",
      email: "professor@nexus.edu",
      birthDate: new Date("1985-05-10"),
      password,
      role: "TEACHER",
      teacher: { create: {} },
    },
  });
  const teacher = await prisma.teacher.findUniqueOrThrow({
    where: { userId: teacherUser.id },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: "aluno@nexus.edu" },
    update: {},
    create: {
      name: "Aluno Exemplo",
      email: "aluno@nexus.edu",
      birthDate: new Date("2002-03-15"),
      password,
      role: "STUDENT",
      student: {
        create: {
          registration: "2026001",
          classroomId: classroom.id,
        },
      },
    },
  });
  const student = await prisma.student.findUniqueOrThrow({
    where: { userId: studentUser.id },
  });

  const classDiscipline = await prisma.classDiscipline.upsert({
    where: {
      classroomId_disciplineId: {
        classroomId: classroom.id,
        disciplineId: discipline.id,
      },
    },
    update: {},
    create: {
      classroomId: classroom.id,
      disciplineId: discipline.id,
      teacherId: teacher.id,
    },
  });

  await prisma.progress.upsert({
    where: {
      studentId_lessonId: {
        studentId: student.id,
        lessonId: lesson.id,
      },
    },
    update: {},
    create: {
      studentId: student.id,
      lessonId: lesson.id,
      classDisciplineId: classDiscipline.id,
      completed: false,
    },
  });

  console.log("✅ Seed concluído");
}

main()
  .catch((e) => {
    console.error("❌ Erro ao rodar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
