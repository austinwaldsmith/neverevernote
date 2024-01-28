"use server";

import { revalidatePath } from "next/cache";
import NoteModel, { Note } from "@/lib/db/models/noteModel";

export async function fetchNotes(id: string): Promise<Note> {
  const DBNote = await NoteModel.findOne({ id });

  if (!!DBNote) {
    return DBNote;
  }

  const newDBNote = await NoteModel.create({
    name: "global",
    id: "global",
    type: "notebook",
    children: [],
  });
  return newDBNote;
}
