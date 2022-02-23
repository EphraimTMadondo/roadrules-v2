import { prisma } from "./db";

export async function getNotes () {

  const notes = await prisma.note.findMany();

  return notes;

}