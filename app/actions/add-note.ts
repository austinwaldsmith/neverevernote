"use server";

import { revalidatePath } from "next/cache";
import NoteModel from "@/lib/db/models/noteModel";

export async function addNoteToDB(id: string) {
  const newNote = await NoteModel.create({
    id,
    content: "Enter Content Here...",
  });
  revalidatePath("/");
}
